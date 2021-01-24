import { IsString, IsNumber, IsOptional } from "class-validator";

/* DTO: Data Transfer Object : 데이터 전송 객체
이상한 정보가 못 들어오게 막음 */
export class CreateMovieDto {
    /* 들어오는 정보들의 type을 정해주는, react proptypes같은 놈 
    class-validator class-transformer 설치 
    이렇게 해놓고 이상한 값 들어오면 에러를 내보낸다.*/

    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsString({each: true})
    @IsOptional()
    readonly genres: string[];
}