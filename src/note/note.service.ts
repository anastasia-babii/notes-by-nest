import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findNoteById(id: string) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return note;
  }

  createNote(createNoteDto: CreateNoteDto) {
    return this.noteRepository.save(createNoteDto);
    console.log();
  }

  async updateNote(id: string, editNoteDto: EditNoteDto) {
    const note = await this.noteRepository.preload({
      id,
      ...editNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.noteRepository.save(note);
  }

  async deleteNoteById(id: string) {
    const user = await this.findNoteById(id);
    return this.noteRepository.remove(user);
  }
}
