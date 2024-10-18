import Comments from '@/components/Comments/Comments';
import { useParams } from 'react-router-dom';
import { useGetArticleCommentsQuery, useSendCommentMutation } from '@/app/api.ts';
import { Box, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { AddCommentButton } from '@/components/styles.tsx';

const CommentList = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useGetArticleCommentsQuery(id!, { refetchOnMountOrArgChange: true });
  const [sendComment] = useSendCommentMutation();
  const ref = useRef<HTMLInputElement>(null);

  const addComment = async () => {
    await sendComment({ id: id as string, body: { content: ref.current?.value ?? '' } });
    if (ref.current) {
      ref.current.value = '';
    }
    refetch();
  };

  return (
    <>
      <Box display="flex" gap={1}>
        <TextField fullWidth name="comment" type="text" placeholder="Добавить комментарий" inputRef={ref} />
        <AddCommentButton component={'button'} onClick={addComment}>
          <Typography variant="subtitle1">Отправить</Typography>
        </AddCommentButton>
      </Box>
      {data?.map((comment) => <Comments onUpdate={refetch} {...comment} key={comment.id} />)}
    </>
  );
};
export default CommentList;
