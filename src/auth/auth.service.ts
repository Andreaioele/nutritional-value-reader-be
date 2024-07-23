import {ConflictException, Injectable, Logger, UnauthorizedException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {CreateUserResponseDto} from "./dto/create-user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (existingUser) {
        throw new ConflictException(`User with email ${createUserDto.email} already exists.`);
      }
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      Logger.log('User created', createdUser.email)
      return await this.login(createdUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      Logger.error('Error registering user', error);
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user && await user.comparePassword(pass)) {
        const { password, ...result } = user.toObject();
        return result;
      }
      throw new UnauthorizedException('Invalid email or password');
    } catch (error) {
      Logger.error('Error validating user', error);
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      Logger.error('Error logging in', error);
      throw new InternalServerErrorException('Error logging in');
    }
  }

  async findOrCreate(user: any): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({ email: user.email }).exec();
      if (existingUser) {
        return existingUser;
      }
      const newUser = new this.userModel({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isGoogleAccount: user.isGoogleAccount,
        password: null, // Lascia la password vuota per gli utenti di Google
      });
      return newUser.save();
    } catch (error) {
      Logger.error('Error finding or creating user', error);
      throw new InternalServerErrorException('Error finding or creating user');
    }
  }
}