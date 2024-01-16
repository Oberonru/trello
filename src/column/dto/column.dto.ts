import { IsString } from 'class-validator';

export class ColumnDto {
  @IsString()
  name: string;
}
