import { Ability, createMongoAbility, ForbiddenError } from "@casl/ability";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/config/database";
import { CHECK_ABILITY, CHECK_ACTION, RequiredRule } from "./abilities.decorator";

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma:PrismaService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role=this.reflector.getAllAndOverride<string[]>(CHECK_ACTION, [context.getClass(),context.getHandler()]);
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler())||[];
    const rule=[
        {
          name:'user',
          action: 'create',
          subject: 'all',
          inverted:true
        },
        {
          action:'read',
          subject:'User'
        },
        {
          name:'user',
          action:'update',
          subject:'Post'
        },
        {
          action:'delete',
          subject:'User'
        },
        {
          action: 'delete',
          subject: 'all',
          inverted: true
        }
  ]
  const user= await this.prisma.role.findUnique({
    where:{
      id:2
    }
  })

const isAuthenticate = role.includes(user.role as string)
if(isAuthenticate){
  try{
    const ability= new Ability(rule)
    rules.forEach((rule)=>{
    ForbiddenError.from(ability).throwUnlessCan(rule.action,rule.subject)});
    return true;
  }catch(error){
    if(error instanceof ForbiddenError){
          throw new ForbiddenException(error.message)
        }
  }
}else{
  throw new ForbiddenException(
    'You are not allowed to perform this action'
  );
}
        return true;
    }
}
