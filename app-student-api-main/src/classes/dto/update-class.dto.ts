import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateClassDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  students: string[];

  @IsOptional()
  @IsString()
  teacher: string;
}
