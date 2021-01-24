/* Entity에서는 실제로 데이터베이스의 모델을 만들어야 함 
여기서는 Movie 클래스를 가지고 데이터베이스를 만든다. */
export class Movie {
    id: number;
    title: string;
    year: number;
    genres: string[];
}