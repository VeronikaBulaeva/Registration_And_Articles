import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormBox, FormSection, GridContainer } from '@/components/styles.tsx';
import { FormControl, styled, Typography } from '@mui/material';
import ButtonLink from '@/commons/Button.tsx';
import { changePasswordSchema, PasswordFields } from '@/components/Schemas.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput.tsx';
import { useChangePasswordMutation } from '@/app/api.ts';

const defaultValues = {
  old_password: '',
  password: '',
  confirmed_password: '',
};

const ChangePassword: FC = () => {
  const methods = useForm<PasswordFields>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });
  const [changePassword, { data, error }] = useChangePasswordMutation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: typeof defaultValues) => {
    await changePassword(data);
  };

  useEffect(() => {
    if (error) {
      methods.setError('old_password', { message: '' });
    }
  }, [error]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormSection>
      <FormBox>
        <FormProvider {...methods}>
          <form name="authorizationForm" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <ChangePasswordBox>
                <PasswordInput
                  name="old_password"
                  label="Старый пароль"
                  placeholder="Старый пароль"
                  onClick={handleClickShowPassword}
                  showPassword={showPassword}
                />
                {error && <Typography>Неверный пароль</Typography>}
                <PasswordInput
                  name="password"
                  label="Новый пароль"
                  placeholder="Новый пароль"
                  onClick={handleClickShowPassword}
                  showPassword={showPassword}
                />
                <PasswordInput
                  name="confirmed_password"
                  label="Повторить новый пароль"
                  placeholder="Повторить новый пароль"
                  onClick={handleClickShowPassword}
                  showPassword={showPassword}
                />
                <ChangeButton component="button" type="submit">
                  Изменить пароль
                </ChangeButton>
              </ChangePasswordBox>
            </FormControl>
          </form>
        </FormProvider>
        {data && <Typography>Ваш пароль успешно изменен</Typography>}
      </FormBox>
    </FormSection>
  );
};

export default ChangePassword;

const ChangePasswordBox = styled(GridContainer)`
  align-self: center;
  width: max-content;
`;

const ChangeButton = styled(ButtonLink)`
  width: 100%;
`;
