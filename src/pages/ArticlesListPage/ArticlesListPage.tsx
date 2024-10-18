import { FC } from 'react';
import Article from '@/components/Article/Article.tsx';
import { Box, styled, Typography } from '@mui/material';
import { useGetArticlesQuery } from '@/app/api.ts';
import Loader from '@/components/Loader/Loader.tsx';
import { Link } from 'react-router-dom';
import ButtonLink from '@/commons/Button.tsx';

const ArticlesListPage: FC = () => {
  const { data } = useGetArticlesQuery(null, { refetchOnMountOrArgChange: true });

  if (!data) {
    return <Loader />;
  }

  return (
    <Box display="grid" sx={{ '&&': { pt: 2 } }}>
      <ButtonLink component={Link} to={'/addArticle/'}>
        <Typography variant="h2" color="text.primary">
          Создать статью
        </Typography>
      </ButtonLink>
      <GridSection>{data?.map((article) => <Article {...article} key={article.id} />)}</GridSection>
    </Box>
  );
};

export default ArticlesListPage;

const GridSection = styled('section')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 24px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;
