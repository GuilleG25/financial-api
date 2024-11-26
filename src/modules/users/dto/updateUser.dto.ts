import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(png|jpeg|jpg|gif);base64,/, {
    message: 'El avatar debe ser una imagen en formato Base64',
  })
  avatar?: string;
}
