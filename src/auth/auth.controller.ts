import {Controller, Request, Post, UseGuards, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePantryDto, CreatePantryErrorDto, CreatePantryResponseDto} from "../pantry/dto/create-pantry.dto";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";
import {CreateUserErrorDto, CreateUserValidationErrorDto} from "./dto/create-user-error.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto })
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
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
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