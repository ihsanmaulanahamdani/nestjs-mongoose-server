export class RegisterDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class LoginDto {
  readonly email: string;
  readonly password: string;
}
