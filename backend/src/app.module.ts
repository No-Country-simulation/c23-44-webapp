import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { SchoolModule } from './school/school.module';
// import { StudentModule } from './student/student.module';
// import { PaymentModule } from './payment/payment.module';
import { ParentModule } from './parent/parent.module';
import {SchoolModule} from "./school/school.module";
import {PaymentModule} from "./payment/payment.module";
import {StudentModule} from "./student/student.module";
// import { Student } from './student/entities/student.entity';
// import { ParentEntity } from './parent/entities/parent.entity';

@Module({
  imports: [
    // TeacherModule,
    AuthModule,

    // ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE as any,
    //   host: process.env.PG_HOST,
    //   port: parseInt(process.env.PG_PORT),
    //   username: process.env.PG_USER,
    //   password: process.env.PG_PASSWORD,
    //   database: process.env.PG_DB,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),

    // CONFIGURACIÓN CON NEON
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false, // set to false in production
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    SchoolModule,
    PaymentModule,
    ParentModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
