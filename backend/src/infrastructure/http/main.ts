import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApplicationExceptionFilter } from "./filters/ApplicationExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApplicationExceptionFilter());

  app.enableCors({
    origin: true,
  });


  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, "0.0.0.0");

  console.log(`HTTP server running on port ${PORT}`);

  // console.log(`HTTP server running on http://localhost:${PORT}`);
}

bootstrap();