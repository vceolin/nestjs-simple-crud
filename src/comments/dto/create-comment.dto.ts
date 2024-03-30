import { IsOptional, IsString, Length } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @Length(1, 500)
  text: string
  @IsString()
  post_id: string
  @IsString()
  @IsOptional()
  in_reply_to?: string
}
