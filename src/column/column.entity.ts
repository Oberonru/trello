import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
