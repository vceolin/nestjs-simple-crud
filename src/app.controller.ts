import { Controller } from '@nestjs/common/decorators/core'
import { AppService } from './app.service'
import { Get } from '@nestjs/common/decorators/http'
import { SkipAuth } from './auth/decorators/skip-auth.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SkipAuth()
  getHello(): string {
    return this.appService.getHello()
  }
}
