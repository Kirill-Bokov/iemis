import { IsString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsString()
  job_title: string;

  @IsString()
  phone: string;
}

