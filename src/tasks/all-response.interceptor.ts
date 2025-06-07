import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = 500;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();

        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json({
            success: false,
            error: {
                message,
                statusCode: status,
            },
            timestamp: new Date().toISOString(),
        });
    }
}
