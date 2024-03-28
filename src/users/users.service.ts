import { Injectable } from '@nestjs/common/decorators/core'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { nanoid } from 'nanoid'

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      first_name: 'João',
      last_name: 'Silva',
      email: 'joao@example.com',
      password: 'senha123',
      created_at: new Date(),
      updated_at: new Date(),
      followers: ['2', '3'],
      following: ['2', '3']
    },
    {
      id: '2',
      first_name: 'Maria',
      last_name: 'Santos',
      email: 'maria@example.com',
      password: 'senha456',
      created_at: new Date(),
      updated_at: new Date(),
      followers: ['1'],
      following: ['1', '3']
    },
    {
      id: '3',
      first_name: 'Pedro',
      last_name: 'Souza',
      email: 'pedro@example.com',
      password: 'senha789',
      created_at: new Date(),
      updated_at: new Date(),
      followers: ['1', '2'],
      following: ['1']
    }
  ]

  async findOne(id: string): Promise<Omit<User, 'password'> | undefined> {
    const { password, ...rest } = this.users.find((user) => user.id === id)
    return rest
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  create(user: CreateUserDto, user_id: string) {
    const id = nanoid(7)
    const now = new Date()
    const newUser = {
      id,
      created_at: now,
      updated_at: now,
      following: [],
      followers: [],
      ...user
    }
    this.users.push(newUser)
    return this.findOne(id)
  }

  findAll() {
    return this.users.map((user) => {
      const { password, ...rest } = user
      return rest
    })
  }

  update(user: CreateUserDto, user_id: string) {
    this.users.map((existingUser) => {
      if (existingUser.id !== user_id) return existingUser
      const now = new Date()
      return { existingUser, updated_at: now, ...user }
    })
    return this.findOne(user_id)
  }
}
