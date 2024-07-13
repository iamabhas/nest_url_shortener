import { IsNotEmpty } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty()
  redirectUrl: string;
}
