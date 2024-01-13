import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  student: string;

  @IsString()
  @IsNotEmpty()
  exam: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  answer: string[];
}
