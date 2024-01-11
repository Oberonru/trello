import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'vasya_pupkin@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123',
  })
  @IsString()
  @Length(3, 100)
  password: string;
}
