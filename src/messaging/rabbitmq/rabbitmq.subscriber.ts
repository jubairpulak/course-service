import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqplib from 'amqplib';
import type { Channel, Connection, ConsumeMessage } from 'amqplib';
import { EmployeesService } from '../../employees/employees.service';

@Injectable()
export class RabbitSubscriber implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitSubscriber.name);

  private conn?: Connection;
  private ch?: Channel;

  private url!: string;
  private exchange!: string;
  private queueName!: string;

  constructor(
    private readonly cfg: ConfigService,
    private readonly employeesService: EmployeesService,
  ) {}

  async onModuleInit() {
    // ✅ read config once
    this.url = this.cfg.get<string>('RABBITMQ_URL') ?? '';
    this.exchange = this.cfg.get<string>('RABBITMQ_EXCHANGE') ?? '';
    this.queueName = this.cfg.get<string>('RABBITMQ_QUEUE') ?? 'employee-service.events';
this.logger.log(`Connecting RMQ url="${this.url}"`);

this.logger.log(`Subscribed ✅ queue="${this.queueName}" exchange="${this.exchange}"...`);

    const routingKeys = ['user.created']; // add more later if needed

    if (!this.url) throw new Error('RABBITMQ_URL is missing');
    if (!this.exchange) throw new Error('RABBITMQ_EXCHANGE is missing');

    this.logger.log(`Connecting RMQ url="${this.url}"`);
    this.conn = await amqplib.connect(this.url);

    this.conn.on('error', (err) => this.logger.error(`RMQ connection error: ${err.message}`));
    this.conn.on('close', () => this.logger.warn('RMQ connection closed'));

    this.ch = await this.conn.createChannel();
    this.ch.on('error', (err) => this.logger.error(`RMQ channel error: ${err.message}`));
    this.ch.on('close', () => this.logger.warn('RMQ channel closed'));

    const prefetch = Number(this.cfg.get<string>('RABBITMQ_PREFETCH') ?? '20');
    await this.ch.prefetch(prefetch);

    // ✅ ensure exchange exists (must match auth publisher exchange name)
    await this.ch.assertExchange(this.exchange, 'topic', { durable: true });

    // ✅ ensure queue exists
    await this.ch.assertQueue(this.queueName, { durable: true });

    // ✅ bind routing keys
    for (const rk of routingKeys) {
      await this.ch.bindQueue(this.queueName, this.exchange, rk);
      this.logger.log(`Bound queue="${this.queueName}" ex="${this.exchange}" rk="${rk}" ✅`);
    }

    // ✅ start consuming
    await this.ch.consume(this.queueName, (msg) => this.onMessage(msg), { noAck: false });

    this.logger.log(
      `Subscribed ✅ queue="${this.queueName}" exchange="${this.exchange}" prefetch=${prefetch}. Waiting for messages...`,
    );
  }

  private async onMessage(msg: ConsumeMessage | null) {
    if (!msg || !this.ch) return;

    const rawText = msg.content.toString('utf-8');
    this.logger.log(`✅ Message received rk="${msg.fields.routingKey}" content=${rawText}`);

    try {
      const raw = JSON.parse(rawText);

      // support both {data:{...}} and {...}
      const data = raw?.data ?? raw;

      if (!data?.userId || !data?.email) {
        this.logger.warn(`Invalid payload. drop. content=${rawText}`);
        this.ch.nack(msg, false, false);
        return;
      }

      // ✅ create employee (event-driven)
      await this.employeesService.create({
        authUserId: data.userId,
        email: data.email,
        phone: data.phone ?? null,
        fullName: data.fullName ?? data.email,
      });

      this.ch.ack(msg);
    } catch (e) {
      const message = (e as Error)?.message ?? 'unknown error';
      this.logger.error(`❌ Processing failed: ${message} content=${rawText}`);

      // permanent errors shouldn't requeue forever
      const permanent =
        message.includes('Unique constraint') ||
        message.includes('already exists') ||
        message.includes('Invalid') ||
        message.includes('missing');

      this.ch.nack(msg, false, !permanent);
    }
  }

  async onModuleDestroy() {
    await this.ch?.close().catch(() => undefined);
    await this.conn?.close().catch(() => undefined);
  }
}
