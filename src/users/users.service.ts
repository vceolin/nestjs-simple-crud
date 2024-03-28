import { Injectable } from '@nestjs/common/decorators/core'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { nanoid } from 'nanoid'
import { UpdatePostDto } from '@/posts/dto/update-post.dto'

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

  async findOne(id: string): Promise<Omit<User, 'password'> | undefined> {
    const { password, ...rest } = this.users.find((user) => user.id === id)
    return rest
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  create(user: CreateUserDto, user_id: string) {
    const id = nanoid(7)
    const newUser = {
      id,
      ...user
    }
    this.users.push()
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
      return { existingUser, ...user }
    })
    return this.findOne(user_id)
  }
}
