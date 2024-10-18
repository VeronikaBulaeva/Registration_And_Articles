import { ChangeEvent, FC, useRef, useState } from 'react';
import { GridContainer } from '@/components/styles.tsx';
import { Box, Button, FormControl, IconButton, styled, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ButtonLink from '@/commons/Button.tsx';
import ClearIcon from '@mui/icons-material/Clear';
import { ArticleType } from '@/components/Article/Article.tsx';
import { useAddArticleMutation, useUpdateArticleMutation } from '@/app/api.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { ARTICLES_LIST_ROUTE } from '@/constants/routes.ts';

interface ArticleFormType {
  data?: ArticleType;
}

const ArticleForm: FC<ArticleFormType> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();

  const title = useRef(data?.title ?? '');
  const content = useRef(data?.content ?? '');
  const [image, setImage] = useState<string | undefined>(data?.image);
  const [addArticle] = useAddArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setImage(e.target?.result as string);
        event.target.value = '';
      };
    }
  };

  const addOrUpdateArticle = async () => {
    const fd = new FormData();
    fd.append('title', title.current);
    fd.append('content', content.current);
    if (image) {
      const res = await fetch(image as string);
      const blob = await res.blob();
      const file = new File([blob], 'filename.jpeg');
      fd.append('image', file);
    }
    if (id) {
      try {
        await updateArticle({ data: fd, id: +id }).unwrap();
        navigate(`/article/${id}`);
      } catch (e) {
        setError('Не удалось обновить статью');
      }
    } else {
      try {
        await addArticle(fd);
        navigate(ARTICLES_LIST_ROUTE);
      } catch (e) {
        setError('Не удалось создать статью');
      }
    }
  };

  return (
    <FormControl fullWidth>
      {error && <Typography color="error.main">Не удалось применить изменения</Typography>}
      <GridContainer>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Заголовок"
          multiline
          defaultValue={data?.title}
          onChange={(event) => {
            title.current = event.target.value;
          }}
        />
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Текст статьи"
          multiline
          rows={10}
          defaultValue={data?.content}
          onChange={(event) => {
            content.current = event.target.value;
          }}
        />
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {image ? 'Заменить фото' : 'Добавить фото'}
          <VisuallyHiddenInput type="file" accept="image/*" onChange={onChange} multiple />
        </Button>
        {image && (
          <AddImageBox>
            <ArticleImage src={image} alt="картинка" />
            <IconButton onClick={() => setImage(undefined)}>
              <ClearIcon sx={{ fontSize: 16, textAlign: 'end' }} />
            </IconButton>
          </AddImageBox>
        )}
        <ButtonLink fullWidth component="button" type="submit" onClick={addOrUpdateArticle}>
          Сохранить
        </ButtonLink>
      </GridContainer>
    </FormControl>
  );
};

export default ArticleForm;

const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddImageBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column-reverse;
  align-items: flex-end;
`;

const ArticleImage = styled('img')`
  width: 100%;
`;
