import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

/* @name = Decorator 클래스
함수들을 추가할 수 있다. */
/* @Module = AppModule
Express의 dbModule처럼 한 기능을 가지고 있는 것
photo module, video module 등등*/


/* AppModule은 AppController와 AppProvider만을 가지고 있어야 한다.
그래서 MovieController에 있는 MoviesService를 movies.module로 옮길 것 
그래서 nest g mo 로 module을 생성(이름 movies)한다(NestJS는 여러 모듈로 구성이 되어있다).
MoviesModule이 새로 생겨 아래 import 된 걸 볼 수 있다. */
@Module({
  imports: [MoviesModule],
  controllers: [AppController]
  /* 여기 있던 MoviesController, MoviesService를 movies.module.ts로 옮기고
  app.module에서 movies.module.ts의 MoviesModule를 import한다.  */
  /* 그러면 언제 AppModule에서 직접 controller와 provider를 사용해야 할까? */


})
/* AppModule에서는 우리가 하는 모든 일(레스토랑 API, 유저 인증)들을 import 한다.
왜냐하면 중심이 되는 main.ts에서 AppModule을 사용하기 때문이다. */
export class AppModule {}