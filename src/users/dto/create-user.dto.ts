import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  first_name: string
  @IsString()
  @Length(2, 50)
  last_name: string
  @IsEmail()
  email: string
  @Length(8, 50)
  @IsStrongPassword()
  password: string
}
