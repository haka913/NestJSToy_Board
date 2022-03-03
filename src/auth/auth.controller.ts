import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    // localhost:3000/auth/signup
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.authService.singUp(authcredentialsDto);
    }

    @Post('/signin')
    singIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.singIn(authcredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log('user', user);
    }
    // test(@Req() req){
    //     console.log('req', req);
    // }
}
