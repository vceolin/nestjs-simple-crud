import { createParamDecorator } from '@nestjs/common/decorators/http'
import { JwtUserEntity } from '../entities/jwt-user.entity'

export const AuthUser = createParamDecorator((data, req): JwtUserEntity => {
  return req.args[0].user
})
