import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PasswordInputType } from '@/components/Inputs/types.ts';
import { FC } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput: FC<PasswordInputType> = ({ ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <InputLabel>{props.label}</InputLabel>
          <OutlinedInput
            {...field}
            fullWidth
            type={props.showPassword ? 'text' : 'password'}
            required
            placeholder={props.placeholder}
            label={props.label}
            inputProps={{
              'aria-label': 'weight',
            }}
            sx={{ width: 'webkit-fill-available' }}
            error={Boolean(error)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={props.onClick} edge="end" aria-label="toggle password visibility">
                  {props.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
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

export default PasswordInput;
