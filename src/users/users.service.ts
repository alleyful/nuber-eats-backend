import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) {}

  async createAccount({email, password, role}: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      const exists = await this.users.findOne({ email });
      if(exists) {
        return [false, "There is a user with email already"];
      }
      await this.users.save(this.users.create({email, password, role}));
      return [true];
    } catch(e) {
      return [false, "Could't create account"];
    }
    //check new user
    //create user & hash the password
  }
}