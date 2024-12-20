import { Role } from '@/shared/enum';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user, params, body } = context.switchToHttp().getRequest();

    const isAdmin = user.role === Role.ADMIN;

    if (isAdmin) {
      return true;
    }

    const curentUserId = params?.id || body?.id;

    if (!curentUserId) {
      throw new BadRequestException('شناسه کاربر را وارد کنید');
    }

    return user.id === curentUserId;
  }
}
