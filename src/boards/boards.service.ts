import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){}

    async getBoardById(id: number):Promise <Board>{
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    async deleteBoard(id:number): Promise<void>{
        const result = await this.boardRepository.delete(id);
        if(result.affected==0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log('result', result);
    }

    async updateBoardStatus(id:number, status: BoardStatus) :Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards():Promise<Board[]>{
        return this.boardRepository.find();
    }
    // // private사용 이유
    // // 다른 컴포넌트에서 접근못하도록 차단하기 위해
    // private boards: Board[]=[];

    // // 메소드: [type]
    // // return 값을 나타냄
    // getAllBoards(): Board[]{
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const title = createBoardDto.title;
    //     const description = createBoardDto.description;
    //     const board: Board ={
    //         id: uuid(),
    //         title,
    //         description: description,
    //         status: BoardStatus.PUBLIC
    //     };

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id:string):Board{
    //     const found = this.boards.find((board) => board.id===id);
    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }
    
    // deleteBoard(id:string):void{
    //     const found = this.getBoardById(id);
    //     // filter - 같지 않은 것만 남기고 같은 것만 남김
        
    //     this.boards = this.boards.filter((board)=> board.id!==found.id);
    // }

    // updateBoardStatus(id:string, status:BoardStatus):Board{
    //     const board = this.getBoardById(id);
    //     board.status=status;
    //     return board;
    // }

}
