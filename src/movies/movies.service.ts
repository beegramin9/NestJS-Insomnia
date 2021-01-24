import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
/* service는 비즈니스 로직 */

@Injectable()
export class MoviesService {
    /* 내가 만든 임시 데이터베이스 */
    private movies : Movie[] = [];

    getAll(): Movie[] {
        return this.movies
    }
    /* Movie Class의 id는 number인데 여긴 string */
    getOne(id:number): Movie {
        /* Python의 filter같이. 
        +id 는 parseInt(id)임. string을 number로 바꾸는 것 */

        const movie = this.movies.find(movie => movie.id === id )
        /* 잘못된(존재하지 않는) Id가 들어왔을 때
        NestJs 내장 오류 클래스 */
        if (!movie) {
            throw new NotFoundException(`Movie with unverified ID ${id}`)
        }
        return movie;
    }
    /* 5:36 */
    deleteOne(id: number):boolean {
        /* 삭제할 id 말고 다시 돌려놓아야 함 */
        /* 실제로 존재하는 movie를 지우는 건지 확인,
        없는 애를 건드리면 this.getOne(id)에서 오류 발생 */
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        /* 있는지없는지 */
        const movie = this.getOne(id);
        this.deleteOne(id);
        /* 다 지우고 지운 애 빼고 넣는것. 진짜 DB가 아니라 어쩔 수 없다.
        "year":2021에서 "year":2025 이렇게 넣으면 알아서 교체되기때문에 이게 가능
        두개를 합칠 수 있는 거 맞는데, 합치려면 {} 씌워줘야 됨 */

        /* updateDate를 validate해야 한다. 이상한 정보가 들어오면 어쩔래?
         */
        this.movies.push({...movie, ...updateData})
    }
}
