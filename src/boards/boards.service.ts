import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
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

    createBoard(createBoardDto: CreateBoardDto){
        const title = createBoardDto.title;
        const description = createBoardDto.description;
        const board: Board ={
            id: uuid(),
            title,
            description: description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id:string):Board{
        const found = this.boards.find((board) => board.id===id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    
    deleteBoard(id:string):void{
        const found = this.getBoardById(id);
        // filter - 같지 않은 것만 남기고 같은 것만 남김
        
        this.boards = this.boards.filter((board)=> board.id!==found.id);
    }

    updateBoardStatus(id:string, status:BoardStatus):Board{
        const board = this.getBoardById(id);
        board.status=status;
        return board;
    }

}
