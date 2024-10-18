import { FC } from 'react';
import CommentList from '@/components/Comments/CommentList.tsx';
import { Box, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteArticleMutation, useGetArticleQuery } from '@/app/api.ts';
import { formatedDate } from '@/components/lib';
import ButtonLink from '@/commons/Button.tsx';
import { useSelector } from 'react-redux';
import { userSelector } from '@/app/profile/selectors.ts';
import Loader from '@/components/Loader/Loader.tsx';
import { ARTICLES_LIST_ROUTE } from '@/constants/routes.ts';

const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  const { data } = useGetArticleQuery(id!, { refetchOnMountOrArgChange: true });
  const [deleteArticle] = useDeleteArticleMutation();

  if (!data) {
    return <Loader />;
  }

  return (
    <NewsSection>
      {user?.id === data.author.id && (
        <Box display="flex" justifyContent="space-between">
          <ButtonLink to={`/addArticle/${id}`}>Редактировать статью</ButtonLink>
          <ButtonLink
            component="button"
            onClick={async () => {
              await deleteArticle({ id: id as string });
              navigate(ARTICLES_LIST_ROUTE);
            }}
          >
            Удалить статью
          </ButtonLink>
        </Box>
      )}
      <Typography variant="h1" color="text.primary">
        {data.title}
      </Typography>
      <Box display="flex" gap={1.5}>
        <Box display="grid" justifyContent="space-between">
          <Typography variant="h2" color="text.primary">
            {data.author.username}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {formatedDate(data.updated)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h3">{data.content}</Typography>
      {data.image && (
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 233, md: 334 },
            maxWidth: { xs: 350, md: 500 },
          }}
          src={data.image}
          alt="фото"
        />
      )}
      <CommentList />
    </NewsSection>
  );
};

export default ArticlePage;

const NewsSection = styled('section')`
  display: grid;
  gap: 20px;
  max-width: 50%;
  margin-inline: auto;
  margin-block: 40px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    max-width: none;
    margin-inline: 50px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-inline: 20px;
  }
`;
