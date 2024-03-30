import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNumber, Max, Min } from 'class-validator'

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({ default: 0, description: 'Page to return.' })
  page_number: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiProperty({ default: 20, description: 'Number of itens per page.' })
  page_size: number
}
