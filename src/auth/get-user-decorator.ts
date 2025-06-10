import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entity/user-entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  },
);
