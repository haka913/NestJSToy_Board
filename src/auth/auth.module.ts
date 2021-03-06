import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ||jwtConfig.secret,
      signOptions:{
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  // JwtStrategy 를 이 auth 모듈에서 사용할 수 있도록 등록
  providers: [AuthService, jwtStrategy],
  // JwtStrategy, PassportModule을 다른 모듈에서 사용할 수 있게 등록
  exports: [jwtStrategy, PassportModule]
})
export class AuthModule {}
