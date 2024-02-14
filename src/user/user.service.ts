import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';
import { CommonService } from '../common/common.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly сommonService: CommonService,
  ) {}

  async getPersonalDataById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async updatePersonalDataById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    let user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDto);
  }

  async deleteUserById(id: string) {
    const user = await this.getPersonalDataById(id);
    return this.userRepository.remove(user);
  }

  async checkUserExistenceByEmailOrPhone(email: string, phone: string) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });
    return !!existingUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findUserByEmailWithPassword(email: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }
}
