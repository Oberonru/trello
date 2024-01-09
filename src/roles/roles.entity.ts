import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
