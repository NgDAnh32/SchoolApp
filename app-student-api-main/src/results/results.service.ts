import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/schemas/result.schema';
import { Model } from 'mongoose';
import { Exam } from 'src/schemas/exam.schema';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result.name) private resultModal: Model<Result>,
    @InjectModel(Exam.name) private examModal: Model<Exam>,
  ) {}
  async create(createResultDto: CreateResultDto) {
    try {
      const exam = await this.examModal.findOne({ _id: createResultDto.exam });
      const content = JSON.parse(exam.content);
      const listCorrectAnswer = content?.map((e) => e.correct);

      const numCorrect = this.countCorrectAnswers(
        listCorrectAnswer,
        createResultDto.answer,
      );

      const resultCreated = await this.resultModal.create({
        answer: createResultDto.answer,
        numberCorrect: numCorrect,
        totalQuestion: listCorrectAnswer?.length,
        student: createResultDto.student,
        exam: createResultDto.exam,
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Chấm điểm thành công',
        data: resultCreated,
      };
    } catch (error) {
      throw error;
    }
  }

  countCorrectAnswers(correctAnswers: string[], userAnswers: string[]) {
    let correctCount = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
      if (
        correctAnswers[i] &&
        userAnswers[i] &&
        correctAnswers[i] === userAnswers[i]
      ) {
        correctCount++;
      }
    }

    return correctCount;
  }

  async findAll(req: any) {
    let query = {};

    query = {
      ...(req?.query?.student && { student: req.query.student }),
      ...(req?.query?.exam && { exam: req.query.exam }),
    };

    try {
      return await this.resultModal
        .find(query)
        .sort({ createdAt: -1 })
        .populate('student')
        .populate('exam');
    } catch (error) {
      throw error;
    }
  }

  async satisfy(id: string) {
    try {
      const data = await this.resultModal
        .find({ exam: id })
        .populate('student')
        .populate('exam')
        .sort({ numberCorrect: -1 });

      return {
        candidates: data?.length,
        max: data?.[0],
        min: data?.[data?.length - 1],
        rank: data,
      };
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      const data = await this.resultModal
        .findById(id)
        .populate('student')
        .populate('exam');
      return data;
    } catch (error) {}
  }
}
