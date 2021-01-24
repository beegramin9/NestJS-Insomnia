import { Controller, Get, Post, Delete, Patch, Param, Body, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity'
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

/* @Controller
Express의 Get router 역할 + Flask의 router 바로 밑줄에 함수를 작성하는 형식 
해당 url로 들어오면 함수를 실행



nest g co 로 controller 폴더와 파일을 만들 수 있음
controller의 이름이 바로 라우터(=엔트리 포인트)가 됨, 즉 webpage/movies, /movies 부터 시작함
*/
@Controller('movies')
export class MoviesController {
    /* TypeScript의 클래스
    접그 제한자 중 하나인 readonly, const와 같이 선언하고 나서 수정 불가
    */
    constructor(private readonly moviesService: MoviesService) {

    }
    @Get()
    /* Express 위에서 돌아가기 때문에 response랑 request 객체를 사용할 수 있긴 하다. 
    NestJS 밑의 Express에 access하는 방법이긴 한데
    권장되진 않는다. 하지 맙시다.*/
    getAll(@Req() req, @Res() res): Movie[] {
        return this.moviesService.getAll();
    }
    /* Express처럼 search가 get 바로 아래 있으면, get의 Param으로 인식한다
    그래서 search를 맨 위로 올려줘야 함 */


    @Get("/:id")
    /* id를 어떻게 가져올 수 있지?
    NestJS에서는 @Param로 가져온다
    TypeScript가 전역으로 설치되어있으면 자동추가되는데 이상하게 안됨
    (맨위에서 import해야 함)
    Param 이름은 같아야 하지만 변수명은 바뀌어도 된다. */
    getOne(@Param('id') movieId: number) : Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        /* dto를 정해주면 movieData 자동완성이 된다. */

        console.log(movieData)
        /* API를 받아온다고 하자(Insomnia에서 JSON으로 API 만듦)
        Body로 받아와야 함
        express에서는 stringtify 이런거 했어야 했는데 여기선 안해도 됨 */
        return this.moviesService.create(movieData)
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number ) {
        return this.moviesService.deleteOne(movieId)
    }
    /* Update를 할 땐
    Post: 리소스 전체를 업데이트 함
    Patch: 리소스 일부분(필요한 곳)만 업데이트 함 */
    @Patch('/:id')
    patch(@Param('id') movieId: number,  @Body() updateData: UpdateMovieDto) {
      return this.moviesService.update(movieId, updateData)
    }

}
