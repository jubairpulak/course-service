import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqplib from 'amqplib';
import type { Channel, Connection } from 'amqplib';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

@Injectable()
export class RabbitPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitPublisher.name);

  private conn?: Connection;
  private ch?: Channel;

  private readonly url: string;
  private readonly exchange: string;

  private isReady = false;
  private isClosing = false;
//
  constructor(private readonly cfg: ConfigService) {
    this.url = this.cfg.getOrThrow<string>('RABBITMQ_URL');
    this.exchange = this.cfg.getOrThrow<string>('RABBITMQ_EXCHANGE');
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry() {
    const maxRetries = Number(process.env.RABBITMQ_CONNECT_RETRIES ?? 30);
    const baseDelayMs = Number(process.env.RABBITMQ_CONNECT_DELAY_MS ?? 1000);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      if (this.isClosing) return;

      try {
        this.logger.log(`Connecting to RabbitMQ (attempt ${attempt}/${maxRetries})...`);

        this.conn = await amqplib.connect(this.url);
        this.conn.on('close', () => {
          this.isReady = false;
          if (!this.isClosing) this.logger.warn('RabbitMQ connection closed');
        });
        this.conn.on('error', (e) => {
          this.isReady = false;
          this.logger.warn(`RabbitMQ connection error: ${(e as Error).message}`);
        });

        this.ch = await this.conn.createChannel();
        await this.ch.assertExchange(this.exchange, 'topic', { durable: true });

        this.isReady = true;
        this.logger.log(`RabbitMQ connected. exchange="${this.exchange}"`);
        return;
      } catch (e) {
        const msg = (e as Error).message;
        this.isReady = false;
        this.logger.warn(`RabbitMQ connect failed: ${msg}`);

        // exponential-ish backoff (cap 10s)
        const wait = Math.min(baseDelayMs * attempt, 10_000);
        await sleep(wait);
      }
    }

    // at this point: don’t crash app in dev; in prod you may want to crash
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RabbitMQ not reachable after retries');
    }
    this.logger.error('RabbitMQ not reachable after retries (dev mode). Continuing without MQ.');
  }

  async publish(routingKey: string, payload: unknown) {
    if (!this.isReady || !this.ch) {

      this.logger.warn(`Publish skipped, RabbitMQ not ready rk="${routingKey}"`);
      return;
    }

    const body = Buffer.from(JSON.stringify(payload));
    const ok = this.ch.publish(this.exchange, routingKey, body, {
      persistent: true,
      contentType: 'application/json',
    });

    if (!ok) this.logger.warn(`RabbitMQ backpressure rk="${routingKey}"`);
  }

  async onModuleDestroy() {
    this.isClosing = true;
    await this.ch?.close().catch(() => undefined);
    await this.conn?.close().catch(() => undefined);
  }
}
