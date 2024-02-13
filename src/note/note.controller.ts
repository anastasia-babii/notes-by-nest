import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }

  @Get(':id')
  findNote(@Param('id') id: number) {
    return this.noteService.findNoteById('' + id);
  }

  @Patch(':id')
  updateNote(@Param('id') id: string, @Body() editNoteDto: EditNoteDto) {
    return this.noteService.updateNote(id, editNoteDto);
  }

  @Delete(':id')
  deleteNoteById(@Param('id') id: string) {
    return this.noteService.deleteNoteById(id);
    console.log();
  }
}
