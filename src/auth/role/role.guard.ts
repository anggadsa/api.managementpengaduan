import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<string[]>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.validateRoles(roles, user.role);
  }

  validateRoles(roles: string[], userRoles: string[]) {
    console.log(userRoles);
    return roles.some((role) => userRoles.includes(role));
  }
}
