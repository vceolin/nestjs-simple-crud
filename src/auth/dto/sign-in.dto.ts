import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ default: 'joao@example.com' })
  @IsEmail()
  email: string
  @ApiProperty({ default: 'senha123' })
  @IsString()
  password: string
}
