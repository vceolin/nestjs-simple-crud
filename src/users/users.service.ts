import { Injectable } from '@nestjs/common/decorators/core'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      first_name: 'João',
      last_name: 'Silva',
      email: 'joao@example.com',
      password: 'senha123'
    },
    {
      id: '2',
      first_name: 'Maria',
      last_name: 'Santos',
      email: 'maria@example.com',
      password: 'senha456'
    },
    {
      id: '3',
      first_name: 'Pedro',
      last_name: 'Souza',
      email: 'pedro@example.com',
      password: 'senha789'
    }
  ]

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }
}
