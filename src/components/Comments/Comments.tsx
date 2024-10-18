import { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Box, IconButton, styled, TextField, Typography } from '@mui/material';
import ButtonLink from '@/commons/Button';
import { AuthorType } from '@/components/Article/Article.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { userSelector } from '@/app/profile/selectors.ts';
import { useDeleteCommentMutation, useSendCommentMutation } from '@/app/api.ts';
import { formatedDate } from '@/components/lib';
import { AddCommentButton } from '@/components/styles.tsx';

export type CommentType = {
  author: AuthorType;
  content: string;
  updated: string;
  article: number;
  id: number;
  parent: number | null;
  created?: string;
  children?: CommentType[];
};

type CommentsType = { onUpdate: () => void } & CommentType;

const Comments = ({ content, author, updated, children, article, id, onUpdate }: CommentsType) => {
  const [isShown, setIsShown] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const user = useSelector(userSelector);
  const [sendComment] = useSendCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [comment, setComment] = useState('');

  const changeVisibility = () => {
    setIsShown(!isShown);
  };

  const addAnswer = () => {
    setIsAnswer(!isAnswer);
  };

  return (
    <CommentBox>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1.5}>
            <PersonOutlinedIcon sx={{ fontSize: 40 }} />
            <Box display="grid" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary">
                {author.username}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {formatedDate(updated)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <AnswerButton component="button" onClick={addAnswer}>
            <Typography variant="subtitle2" color="text.secondary">
              {isAnswer ? 'Отменить' : 'Ответить'}
            </Typography>
          </AnswerButton>
          {user?.id === author.id && (
            <IconButton
              onClick={async () => {
                await deleteComment({ article_id: article, comment_id: id }).then(onUpdate);
              }}
            >
              <DeleteIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Box>
      </Box>

      <Typography variant="h3" dangerouslySetInnerHTML={{ __html: content }} />

      {isAnswer ? (
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            name="comment"
            type="text"
            placeholder="Добавить комментарий"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <AddCommentButton
            component={'button'}
            onClick={async () => {
              await sendComment({ id: article, body: { content: comment, parent: id } }).then(onUpdate);
              setIsAnswer(false);
            }}
          >
            <Typography variant="subtitle1">Отправить</Typography>
          </AddCommentButton>
        </Box>
      ) : null}

      {!!children?.length && (
        <CommentButton component="button" onClick={changeVisibility}>
          <Typography variant="subtitle2" color="text.secondary">
            {isShown ? 'Скрыть ответы' : 'Показать ответы'}
          </Typography>
        </CommentButton>
      )}
      {isShown && children?.map((comment) => <Comments onUpdate={onUpdate} {...comment} key={comment.id} />)}
    </CommentBox>
  );
};

export default Comments;

const CommentBox = styled(Box)`
  display: grid;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: ${({ theme }) => theme.palette.shadow.shadow};
  text-decoration: none;
`;

const CommentButton = styled(ButtonLink)`
  color: ${({ theme }) => theme.palette.text.secondary};
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 16px 20px;
`;

const AnswerButton = styled(ButtonLink)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  padding: 8px 10px;
  border: none;
  box-shadow: none;
`;
