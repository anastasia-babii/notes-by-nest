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
import { ApiKeyGuard } from '../common/guards/api-key/api-key.guard';
import { FindUserByIdParamsDto } from './dto/find-user-by-id.dto';
import { TransformInterceptor } from '../common/interceptors/exclude-password.interceptor';

@Controller('user')
@UseGuards(ApiKeyGuard)
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
    return await this.userService.updategetPersonalDataById(
      userId,
      updateUserDto,
    );
  }

  @Delete('/')
  deleteUser(@Request() req) {
    const userId = req.user.userId;
    return this.userService.deleteUserById(userId);
  }
}
