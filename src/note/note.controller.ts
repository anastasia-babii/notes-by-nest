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
import { NoteService } from './note.service';
import { EditNoteDto } from './dto/edit-note.dto';
import { AuthGuard } from '../common/guards/auth/auth.guard';

@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(req.user.userId, createNoteDto);
  }

  @Get(':id')
  findNote(@Request() req, @Param('id') noteId: string) {
    return this.noteService.findNoteById(noteId, req.user.userId);
  }

  @Get('all/:id')
  allNote(@Param('id') id: string) {
    return this.noteService.getAllNotes(id);
  }

  @Patch(':id')
  updateNote(@Param('id') id: string, @Body() editNoteDto: EditNoteDto) {
    return this.noteService.updateNoteById(id, editNoteDto);
  }

  @Delete(':id')
  deleteNoteById(@Request() req, @Param('id') id: string) {
    return this.noteService.deleteNoteById(req.user.userId, id);
  }
}
