import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
  async compareHashes({ password, hashedPassword }): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
