import { SetMetadata } from '@nestjs/common/decorators/core'

export const SKIP_AUTH_KEY = 'skipAuth'
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true)
