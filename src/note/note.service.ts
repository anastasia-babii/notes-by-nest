import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  createNote(userId, createNoteDto: CreateNoteDto) {
    createNoteDto.userId = userId;
    return this.noteRepository.save(createNoteDto);
  }

  async findNoteById(id, userTokenId) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }
    if (userTokenId !== note.userId) {
      throw new ForbiddenException('You do not have access rights');
    }
    return note;
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    const notes: Note[] = await this.noteRepository.find({
      where: { userId: userId },
    });
    if (!notes) {
      throw new NotFoundException('No notes found');
    }

    return notes;
  }

  async updateNoteById(id: string, editNoteDto: EditNoteDto) {
    const note = await this.noteRepository.preload({
      id,
      ...editNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.noteRepository.save(note);
  }

  // async deleteNoteById(id: string) {
  //   const user = await this.findNoteById(id);
  //   return this.noteRepository.remove(user);
  // }
}
