import { IsNotEmpty, IsString } from 'class-validator';

export class TestStatusDto {
  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  exam: string;
}
