export interface ISaveRequest<T> {
  data: T;
}

export interface ISaveResponse<T> {
  successful: boolean;
  message: string;
  data: T;
}

export interface IGetRequest<T> {
  size: number;
  example?: T;
}

export interface IGetResponse<T> {
  successful: boolean;
  message: string;
  data: T[];
}
