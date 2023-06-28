import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name is required*',
  })
  readonly name: string;

  @IsEmail(
    {},
    {
      message: 'Invalid email*',
    },
  )
  @IsNotEmpty({
    message: 'Email is required*',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Phone number is required',
  })
  readonly phone_number: string;
}
