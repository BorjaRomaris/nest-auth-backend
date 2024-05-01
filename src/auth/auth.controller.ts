import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto,CreateUserDto,RegisterUserDto, UpdateAuthDto} from './dto';
import { LoginResponse } from './dto/login-response';
import { AuthGuard } from './guards/auth/auth.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
 login(@Body() loginDto:LoginDto) {
      return this.authService.login(loginDto)
    }
  
    @Post('/register')
 register(@Body() registerDto:RegisterUserDto) {
      return this.authService.register(registerDto)
    }
  
  @UseGuards(AuthGuard )
  @Get()
  findAll(@Request() req: Request) {
    console.log(req);
    const user= req['user']
    return user;
  }

  @UseGuards(AuthGuard)
@Get('check-token')
checkToken(@Request()req:Request){
  const user= req['user'] as User;
  return{
    user: user,
    token:this.authService.getJwtToken({id:user._id})
  }
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
