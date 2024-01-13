import { IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  content: string;
}
