import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import ButtonLink from '@/commons/Button.tsx';
import { formatedDate } from '@/components/lib';

export interface ArticleType {
  author: AuthorType;
  title: string;
  content: string;
  created: string;
  updated: string;
  id?: number;
  slug?: string;
  image?: string;
}

export interface AuthorType {
  id: number;
  username: string;
  email: string;
}

const Article: FC<ArticleType> = ({ id, author, content, created, title, updated, image }) => {
  const articleContent = content.slice(0, 45) + '...';

  return (
    <NewsItemLink to={`/article/${id}`}>
      <Typography variant="h1" color="text.primary">
        {title}
      </Typography>
      <Typography variant="h2" color="text.primary">
        {articleContent}
      </Typography>
      {image && (
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 115, md: 167 },
            maxWidth: { xs: 175, md: 250 },
          }}
          src={image}
          alt="фото"
        />
      )}
      <Typography variant="h3" color="text.primary">
        Автор: {author.username}
      </Typography>
      <Box display="grid" gap={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Опубликовано: {formatedDate(created)}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Обновлено: {formatedDate(updated)}
        </Typography>
      </Box>
    </NewsItemLink>
  );
};
export default Article;

const NewsItemLink = styled(ButtonLink)`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 16px;
  padding: 16px 20px;

  &:hover {
    transform: scale(1.02);
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-color: ${({ theme }) => theme.palette.secondary.light};
  }
`;
