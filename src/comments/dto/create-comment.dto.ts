import { ApiHideProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @Length(1, 500)
  text: string
  @IsString()
  @IsOptional()
  in_reply_to?: string
}
