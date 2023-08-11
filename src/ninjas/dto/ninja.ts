import { MinLength } from 'class-validator';

export class NinjaDto {
  id: string;

  @MinLength(3)
  name: string;

  weapon?: string;
}
