import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ApplicationError } from "../../../application/errors/ApplicationError";

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!(exception instanceof ApplicationError)) {
      console.error('🔥 Error No Controlado:', exception); 
      // Esto te dirá exactamente el archivo y la línea (ej: RegisterTimeEntry.ts:45)
    }
    
    if (exception instanceof ApplicationError) {
      return response.status(exception.getStatusCode()).json({
        message: exception.message,
        error: exception.name,
        statusCode: exception.getStatusCode(),
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json(exception.getResponse());
    }

    console.error("Unexpected error:", exception);

    return response.status(500).json({
      message: "Internal server error",
      statusCode: 500,
    });
  }
}