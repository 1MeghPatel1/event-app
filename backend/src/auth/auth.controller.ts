import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// Response utility function
export const createResponse = (
  success: boolean = true,
  status: number,
  message: string,
  data?: any,
) => {
  return {
    success,
    status,
    message,
    data,
  };
};

@ApiTags('auth') // Tag for Swagger documentation
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Sign-up route
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: SignUpDto }) // Describe the body as SignUpDto
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists.',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    const { accessToken, user } = await this.authService.signUp(signUpDto);
    return createResponse(
      true,
      HttpStatus.CREATED,
      'User created successfully',
      { accessToken, user },
    );
  }

  // Login route
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto }) // Describe the body as LoginDto
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, user } = await this.authService.login(loginDto);
    return createResponse(true, HttpStatus.OK, 'Login successful', {
      accessToken,
      user,
    });
  }
}
