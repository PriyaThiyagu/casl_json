import { SetMetadata } from "@nestjs/common";

export const CHECK_ABILITY='check_ability';

export const CHECK_ACTION='check_action';

export interface RequiredRule{
    action?: string,
    subject?: string,
    inverted?:boolean,
    conditions?:JSON[]
}
export const checkRole=(...requirements:string[])=>SetMetadata(CHECK_ACTION,requirements)

export const checkAbilites=(...requirements:RequiredRule[])=>SetMetadata(CHECK_ABILITY,requirements);
