import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('Request');
  private logFilePath = 'request.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.originalUrl;

    return next.handle().pipe(
      tap(() => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] Received ${method} request to ${url}`;
        this.logger.log(logMessage);
        this.logToFile(logMessage);
      }),
    );
  }

  private logToFile(message: string): void {
    fs.appendFileSync(this.logFilePath, `${message}\n`);
  }
}
