import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async singUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    async singIn(authcredentialsDto: AuthCredentialsDto):Promise<{accessToken: string}>{
        const {username, password} = authcredentialsDto;
        const user = await this.userRepository.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))){
            // 유저 토큰 생성(secret+ payload 가 필요)
            // payload를 이용해 중요한 정보를 넣지 않기(토큰을 이용해 정보가져가기 쉬우므로)
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
            // return 'logIn success';
        } else{
            throw new UnauthorizedException('logIn failed');
        }
    }
}
