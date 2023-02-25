import { Module } from '@nestjs/common';

import { TasksController } from './controllers/tasks.controller';

import { TasksService } from './services/tasks.service';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
