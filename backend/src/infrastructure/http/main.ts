import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApplicationExceptionFilter } from "./filters/ApplicationExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApplicationExceptionFilter());

  app.enableCors({
    origin: "http://localhost:5173",
  });

  await app.listen(3000);

  console.log("HTTP server running on http://localhost:3000");
}

bootstrap();