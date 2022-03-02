import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
@Injectable()
export class BoardsService {
    // private사용 이유
    // 다른 컴포넌트에서 접근못하도록 차단하기 위해
    private boards: Board[]=[];

    // 메소드: [type]
    // return 값을 나타냄
    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(title:string, description:string){
        const board: Board ={
            id: uuid(),
            title,
            description: description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(board);
    }
    
}
