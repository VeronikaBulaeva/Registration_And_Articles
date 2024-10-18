import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormBox, GridContainer } from '@/components/styles.tsx';
import { FormControl } from '@mui/material';
import TextInput from '@/components/Inputs/TextInput/TextInput.tsx';
import ButtonLink from '@/commons/Button.tsx';
import { FormFields, formSchema } from '@/components/Schemas.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegistrationMutation } from '@/app/api.ts';
import { setUser } from '@/app/profile';
import { useDispatch } from 'react-redux';

const defaultValues = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const Registration: FC = () => {
  const methods = useForm<FormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const dispatch = useDispatch();

  const [register] = useRegistrationMutation();

  const onSubmit = async (data: typeof defaultValues) => {
    const result = await register(data);
    if (result.data) {
      dispatch(setUser({ id: result.data.user.id }));
    }
  };

  return (
    <FormProvider {...methods}>
      <form name="authorizationForm" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <FormBox>
          <FormControl fullWidth>
            <GridContainer>
              <TextInput name="username" label="Имя пользователя" type="text" placeholder="Введите имя пользователя" />
              <TextInput name="first_name" label="Имя" type="text" placeholder="Владимир" />
              <TextInput name="last_name" label="Фамилия" type="text" placeholder="Владимиров" />
              <TextInput name="email" label="Email" type="text" placeholder="vladimir2024@gmail.com" />
              <TextInput name="password" label="Пароль" type="password" placeholder="Введите пароль" />
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

export default Registration;
