import { ApiProperty } from '@nestjs/swagger'
import { Publication } from '../entities/publication.entity'

export class ReturnPublicationDto extends Publication {
  @ApiProperty({ description: 'HATEOAS: route for post comments' })
  comments: string
  @ApiProperty({ description: 'HATEOAS: route for post owner' })
  user: string
}
