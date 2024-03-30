import { Publication } from '../entities/publication.entity'

export class ReturnPublicationDto extends Publication {
  comments: string
}
