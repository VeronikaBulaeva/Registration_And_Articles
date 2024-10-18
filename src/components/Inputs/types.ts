import { MouseEvent } from 'react';

export interface InputType {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export interface PasswordInputType extends InputType {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
}
