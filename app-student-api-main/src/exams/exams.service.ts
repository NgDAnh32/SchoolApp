import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from 'src/schemas/exam.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExamsService {
  constructor(@InjectModel(Exam.name) private examModal: Model<Exam>) {}

  async create(createExamDto: CreateExamDto) {
    const examCreated = await this.examModal.create({ ...createExamDto });
    try {
      return {
        status: HttpStatus.CREATED,
        message: 'Thêm mới bài kiểm tra thành công',
        data: examCreated.toObject(),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(req: any) {
    const query = {};

    try {
      return await this.examModal.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.examModal.findById(id);
    } catch (error) {}
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    try {
      const data = await this.examModal.findByIdAndUpdate(id, updateExamDto, {
        new: true,
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Cập nhật thông tin thành công',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
