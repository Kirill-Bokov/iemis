import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://185.5.248.154:4001",
      "http://185.5.248.154",
    ],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4001);
}
bootstrap();
