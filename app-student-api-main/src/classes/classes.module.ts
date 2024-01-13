import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from 'src/schemas/class.schema';
import { Result, ResultSchema } from 'src/schemas/result.schema';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
