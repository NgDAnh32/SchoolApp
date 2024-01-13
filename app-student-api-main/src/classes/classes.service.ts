import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from 'src/schemas/class.schema';
import { Model } from 'mongoose';
import { TestStatusDto } from './dto/test-status.dto';
import { Result } from 'src/schemas/result.schema';
import { Exam } from 'src/schemas/exam.schema';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModal: Model<Class>,
    @InjectModel(Exam.name) private examModal: Model<Exam>,
    @InjectModel(Result.name) private resultModal: Model<Result>,
    @InjectModel(User.name) private userModal: Model<User>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const classCreated = await this.classModal.create({ ...createClassDto });
    try {
      return {
        status: HttpStatus.CREATED,
        message: 'Thêm mới lớp học thành công',
        data: classCreated.toObject(),
      };
    } catch (error) {
      throw error;
    }
  }

  async testStatus(testStatusDto: TestStatusDto) {
    try {
      const existClass = await this.classModal.findById(testStatusDto.class);

      const existExam = await this.examModal.findById(testStatusDto.exam);

      const listStudents = existClass.students;
      const listResult = [];

      for (const s of listStudents) {
        const result = await this.resultModal.find({
          student: s,
          exam: testStatusDto.exam,
        });

        const student = await this.userModal.findById(s);

        const data = { student, status: Boolean(result), exam: existExam };
        listResult.push(data);
      }
      return listResult;
    } catch (error) {
      throw error;
    }
  }

  async findAll(req: any) {
    let query = {};

    query = {
      ...(req?.query?.teacher && { teacher: req.query.teacher }),
      ...(req?.query?.students && {
        students: { $all: [req?.query?.students] },
      }),
    };

    try {
      return await this.classModal
        .find(query)
        .sort({ createdAt: -1 })
        .populate('teacher')
        .populate('students')
        .populate('historyExams')
        .populate('currentExam');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.classModal
        .findById(id)
        .populate('teacher')
        .populate('students')
        .populate('historyExams')
        .populate('currentExam');
    } catch (error) {}
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    try {
      const data = await this.classModal.findByIdAndUpdate(id, updateClassDto, {
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

  async remove(id: string) {
    try {
      await this.classModal.findByIdAndDelete(id);

      return {
        status: HttpStatus.OK,
        message: 'Xóa lớp học thành công',
      };
    } catch (error) {
      throw error;
    }
  }
}
