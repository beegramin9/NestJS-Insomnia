import { IsString, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto"

/* 부모 클래스의 속성을 똑같이 가져오는데, 모든 요소를 있어도 되고 없어도 되는
TypeScript의 ? 와 같은 기능 */
export class UpdateMovieDto extends PartialType(CreateMovieDto) {};
