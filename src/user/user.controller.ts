import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdParamsDto } from './dto/find-user-by-id.dto';
import { TransformInterceptor } from '../common/interceptors/exclude-password.interceptor';
import { AuthGuard } from '../common/guards/auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getgetPersonalData(@Request() req) {
    const userId = req.user.userId;
    return await this.userService.getPersonalDataById(userId);
  }

  @Patch('/')
  async updategetPersonalData(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.userId;
    return await this.userService.updatePersonalDataById(userId, updateUserDto);
  }

  @Delete('/')
  deleteUser(@Request() req) {
    const userId = req.user.userId;
    return this.userService.deleteUserById(userId);
  }
}
