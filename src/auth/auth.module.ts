import { Module } from '@nestjs/common/decorators/modules'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '@/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
