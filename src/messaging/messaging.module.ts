import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitPublisher } from './rabbitmq/rabbitmq.publisher';
import { RabbitSubscriber } from './rabbitmq/rabbitmq.subscriber';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  imports: [ConfigModule, EmployeesModule], // isGlobal:true হলে না দিলেও চলে
  providers: [RabbitPublisher, RabbitSubscriber, EmployeesService],
  exports: [RabbitPublisher],
})
export class MessagingModule {}
