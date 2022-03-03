import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

// 어디서든 주입해서 사용할 수 있도록 injectable사용
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const{ username} = payload;
        const user: User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}