import { PartialType } from '@nestjs/mapped-types'
import { CreatePostDto } from './create-comment.dto'

export class UpdatePostDto extends PartialType(CreatePostDto) {
  id: string
}
