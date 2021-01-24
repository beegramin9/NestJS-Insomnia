/* Main.ts 파일이 중심 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* pipe: 데이터 유효성 검사 validation. Express의 미들웨어같은 것 */
  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted:true,
  transform: true
  /* get 페이지에서 parameter로 받을 때, id 같은건 숫자여야 해도
  웹페이지 url은 string이기 때문에 string으로 받아서 +id로 타입을 변환해줘야 했는데
  transform: true를 하면 알아서 url id를 number로 바꿔준다.
  즉 콘트롤러의 getOne과 서비스의 getOne 둘 다 id의 type을 number로 쓸 수 있다. */
}))

  await app.listen(3000);
}
bootstrap();
