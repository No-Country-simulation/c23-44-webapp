import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, User])],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService, TypeOrmModule],
})
export class ParentModule {}
