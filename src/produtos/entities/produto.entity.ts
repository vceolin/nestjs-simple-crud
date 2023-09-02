import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  descricao: string;

  @Column({ length: 500 })
  marca: string;

  @Column('double')
}