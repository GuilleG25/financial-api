import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(png|jpeg|jpg|gif);base64,/, {
    message: 'El avatar debe ser una imagen en formato Base64',
  })
  avatar?: string;
}
