import { FormControl, FormHelperText, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { InputType } from '@/components/Inputs/types.ts';
import { FC } from 'react';

const TextInput: FC<InputType> = ({ ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <TextField
            {...field}
            type={props.type}
            required
            placeholder={props.placeholder}
            label={props.label}
            error={Boolean(error)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {error ? (
            <FormHelperText
              sx={{
                color: 'error.main',
              }}
            >
              {error.message}
            </FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

export default TextInput;
