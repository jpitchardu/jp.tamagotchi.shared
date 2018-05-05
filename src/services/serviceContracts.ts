import { Min, ValidationError, ValidatorOptions } from 'class-validator';

export class SaveRequest<T> {
  public data: T;
}

export class SaveResponse<T> {
  public successful: boolean;
  public message: string;
  public data?: T;
}

export class GetRequest<T> {
  @Min(1)
  public size: number;
  public example?: T;
}

export class GetResponse<T> {
  public successful: boolean;
  public message: string;
  public data?: T[];
}

export type validateFn = (
  object: object,
  validatorOptions?: ValidatorOptions
) => Promise<ValidationError[]>;
