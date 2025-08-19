import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}


canActivate(context: ExecutionContext): boolean {
const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
context.getHandler(),
context.getClass(),
]);
if (!requiredRoles || requiredRoles.length === 0) return true;


const { user } = context.switchToHttp().getRequest();
const userRoles: string[] = user?.roles ?? [];
const ok = requiredRoles.some((r) => userRoles.includes(r));
if (!ok) console.log('[RolesGuard] blocked: required', requiredRoles, 'got', userRoles);
return ok;
}
}