import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModal: Model<Chat>) {}
  async create(createChatDto: CreateChatDto) {
    try {
      const chat = await this.chatModal.create(createChatDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Chat thành công',
        chat,
      };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns chat`;
  }

  async findByClass(id: string) {
    try {
      return await this.chatModal
        .find({ class: id })
        .populate('user')
        .populate('class')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
