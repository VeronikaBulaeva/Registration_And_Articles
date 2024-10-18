import { FC } from 'react';
import { FormBox, FormSection } from '@/components/styles.tsx';
import ArticleForm from '@/components/ArticleForm/ArticleForm.tsx';
import { useGetArticleQuery } from '@/app/api.ts';
import { useParams } from 'react-router-dom';

const AddArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetArticleQuery(id!, { refetchOnMountOrArgChange: true, skip: !id });

  return (
    <FormSection>
      <FormBox>
        <ArticleForm data={data} />
      </FormBox>
    </FormSection>
  );
};

export default AddArticlePage;
