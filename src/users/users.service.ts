import { Injectable } from '@nestjs/common/decorators/core'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { nanoid } from 'nanoid'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'

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

  findOne(id: string): Omit<User, 'password'> {
    const { password, ...rest } = this.users.find((user) => user.id === id)
    return rest
  }

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  create(user: CreateUserDto) {
    const id = nanoid(7)
    const now = new Date()
    const newUser = {
      ...user,
      id,
      created_at: now,
      updated_at: now,
      following: [],
      followers: []
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

  update(user: UpdateUserDto, user_id: string): Omit<User, 'password'> {
    this.users.map((existingUser) => {
      if (existingUser.id !== user_id) return existingUser
      const now = new Date()
      return { existingUser, ...user, updated_at: now }
    })
    return this.findOne(user_id)
  }

  follow(target_id: string, user_id: string): User {
    if (user_id === target_id) throw new BadRequestException("You can't follow yourself!")
    const userIndex = this.users.findIndex((user) => user.id === user_id)
    const targetUserIndex = this.users.findIndex((user) => user.id === target_id)
    if (targetUserIndex === -1) throw new NotFoundException()

    const user = this.users[userIndex]
    const following_index = user.following.indexOf(target_id)
    if (following_index !== -1) user.following.splice(following_index, 1)
    else user.following.push(user_id)

    const target_user = this.users[targetUserIndex]
    const follower_index = target_user.followers.indexOf(user_id)
    if (follower_index !== -1) target_user.followers.splice(follower_index, 1)
    else target_user.followers.push(user_id)

    return target_user
  }
}
