import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiKeyGuard } from '../common/guards/api-key/api-key.guard';
import { NoteService } from './note.service';
import { EditNoteDto } from './dto/edit-note.dto';

@Controller('note')
@UseGuards(ApiKeyGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    const userId: string = req.user.userId;

    return this.noteService.createNote(userId, createNoteDto);
  }

  @Get(':id')
  findNote(@Param('id') id: string) {
    return this.noteService.findNoteById(id);
  }

  @Get('all/:id')
  allNote(@Param('id') id: string) {
    return this.noteService.getAllNotes(id);
  }

  @Patch(':id')
  updateNote(@Param('id') id: string, @Body() editNoteDto: EditNoteDto) {
    return this.noteService.updateNote(id, editNoteDto);
  }

  @Delete(':id')
  deleteNoteById(@Param('id') id: string) {
    return this.noteService.deleteNoteById(id);
  }
}
