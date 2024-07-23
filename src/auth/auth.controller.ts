import {Controller, Request, Post, UseGuards, Body, Get} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";
import {CreateUserErrorDto, CreateUserValidationErrorDto} from "./dto/create-user-error.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {LoginUserResponseDto} from "./dto/login-user-response.dto";
import {LoginUserValidationErrorDto} from "./dto/login-user-error.dto";
import {UserDto} from "./dto/user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({summary: 'Register new user'})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({
    status: 201,
    description: 'User registered',
    isArray: false,
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    isArray: false,
    type: CreateUserValidationErrorDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User not registered, email duplicate',
    isArray: false,
    type: CreateUserErrorDto,
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary: 'Login user'})
  @ApiBody({type: LoginUserDto})
  @ApiResponse({
    status: 201,
    description: 'User logged',
    isArray: false,
    type: LoginUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Bad request',
    isArray: false,
    type: LoginUserValidationErrorDto,
  })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get user profile data'})
  @ApiBody({type: UserDto})
  @ApiResponse({
    status: 201,
    description: 'User data retrieved',
    isArray: false,
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Bad request',
    isArray: false,
    type: LoginUserValidationErrorDto,
  })
  @Post('profile')
  async getProfile(@Request() req) {
    return await this.authService.find(req.user.email);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    // avvia il processo di autenticazione tramite Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    // gestisci la risposta di Google e autentica l'utente
    return this.authService.login(req.user);
  }
}