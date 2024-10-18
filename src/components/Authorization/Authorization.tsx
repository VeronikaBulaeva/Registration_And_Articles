import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Inputs/TextInput/TextInput.tsx';
import { FormControl, Typography } from '@mui/material';
import ButtonLink from '@/commons/Button.tsx';
import { FormBox, GridContainer } from '@/components/styles.tsx';
import { useLoginMutation } from '@/app/api.ts';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ARTICLES_LIST_ROUTE } from '@/constants/routes.ts';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/profile';

const defaultValues = {
  username: '',
  password: '',
};

const Authorization: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data: typeof defaultValues) => {
    const result = await login(data);
    if (result.data) {
      const accessData = jwtDecode<{
        token_type: 'access' | 'refresh';
        exp: number;
        jti: string;
        user_id: number;
      }>(result.data.access);
      const refreshData = jwtDecode<{
        token_type: 'access' | 'refresh';
        exp: number;
        jti: string;
        user_id: number;
      }>(result.data.refresh);
      const accessExpiration = new Date(accessData.exp * 1000).toUTCString();
      const refreshExpiration = new Date(refreshData.exp * 1000).toUTCString();
      document.cookie = `access_token=${result.data.access}; expires=${accessExpiration}`;
      document.cookie = `refresh_token=${result.data.refresh}; expires=${refreshExpiration}`;
      dispatch(setUser({ id: accessData.user_id }));
      navigate(ARTICLES_LIST_ROUTE);
    }
  };

  return (
    <FormProvider {...methods}>
      <form name="authorizationForm" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <FormBox>
          <FormControl fullWidth>
            <GridContainer>
              <TextInput name="username" label="Имя пользователя" type="text" placeholder="Введите имя пользователя" />
              <TextInput name="password" label="Пароль" type="password" placeholder="Введите пароль" />
              {error && <Typography color="error.main">Неверное имя пользователя или пароль</Typography>}
              <ButtonLink component="button" type="submit">
                Войти
              </ButtonLink>
            </GridContainer>
          </FormControl>
        </FormBox>
      </form>
    </FormProvider>
  );
};
export default Authorization;
