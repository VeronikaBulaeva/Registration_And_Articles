import { styled, Typography } from '@mui/material';
import ButtonLink from '@/commons/Button.tsx';
import { Link } from 'react-router-dom';
import { ARTICLES_LIST_ROUTE } from '@/constants/routes.ts';
import { useErrorBoundary } from 'react-error-boundary';

const ErrorPage = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <MainSection>
      <Typography variant="h1" color="text.primary" textAlign="center" py={5}>
        Страница не найдена
      </Typography>
      <ButtonLink
        component={Link}
        to={ARTICLES_LIST_ROUTE}
        color="primary"
        onClick={resetBoundary}
        sx={{ maxWidth: 'max-content', p: 2, justifySelf: 'center' }}
      >
        <Typography variant="h1" color="text.primary">
          Вернуться на главную
        </Typography>
      </ButtonLink>
    </MainSection>
  );
};

export default ErrorPage;

const MainSection = styled('section')`
  display: grid;
  margin: 10px 32px;
`;
