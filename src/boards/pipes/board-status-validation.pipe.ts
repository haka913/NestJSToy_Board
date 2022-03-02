import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOptions=[
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ];
        
    

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    };

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        // indexOf() 배열에 없는 것을 넣으면 -1를 반환함
        return index!==-1;
    }
}