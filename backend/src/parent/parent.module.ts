import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentEntity } from './entities/parent.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentEntity, User])],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService, TypeOrmModule],
})
export class ParentModule {}
