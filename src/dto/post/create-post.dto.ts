export class CreatePostDto {
    id:number;
    name:string;
    details?:string;
    user_id:number;
    created_at:Date;
    updated_at:Date;
    deleted_at?:Date;
}
