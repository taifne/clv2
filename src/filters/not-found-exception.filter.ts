import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpStatus, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private logger = new Logger('NotFoundExceptionFilter');

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    const status = exception.getStatus();
    const message = exception.getResponse() as string | { message: string };

    this.logger.error(`[${request.method}] ${request.url}`, exception.stack, 'NotFoundExceptionFilter');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'string' ? message : message.message,
    });
  }
}
