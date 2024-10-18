import { Route, Routes, useLocation } from 'react-router';
import {
  ADD_ARTICLE_ROUTE,
  ARTICLE_PAGE_ROUTE,
  ARTICLES_LIST_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  ERROR_PAGE,
  REGISTRATION_PAGE_ROUTE,
} from '@/constants/routes';
import ArticlePage from '@/pages/ArticlePage/ArticlePage.tsx';
import ArticlesListPage from '@/pages/ArticlesListPage/ArticlesListPage.tsx';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage.tsx';
import { useSelector } from 'react-redux';
import { userSelector } from '@/app/profile/selectors.ts';
import { Navigate } from 'react-router-dom';
import ChangePassword from '@/pages/ChangePassword/ChangePassword.tsx';
import AddArticlePage from '@/pages/AddArticlePage/AddArticlePage.tsx';
import ErrorPage from '@/pages/ErrorPage/ErrorPage.tsx';
import { ErrorBoundary } from 'react-error-boundary';

const AppRouterProvider = () => {
  const location = useLocation();
  const user = useSelector(userSelector);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Routes location={location}>
        <Route path={ERROR_PAGE} element={<ErrorPage />} />
        <Route
          path={REGISTRATION_PAGE_ROUTE}
          element={
            !user ? <RegistrationPage /> : <Navigate to={ARTICLES_LIST_ROUTE} replace state={{ from: location }} />
          }
        />
        <Route
          path={ARTICLES_LIST_ROUTE}
          element={user ? <ArticlesListPage /> : <Navigate replace to={REGISTRATION_PAGE_ROUTE} />}
        />
        <Route path={ARTICLE_PAGE_ROUTE} element={<ArticlePage />} />
        <Route path={CHANGE_PASSWORD_ROUTE} element={<ChangePassword />} />
        <Route
          path={ADD_ARTICLE_ROUTE}
          element={user ? <AddArticlePage /> : <Navigate replace to={REGISTRATION_PAGE_ROUTE} />}
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouterProvider;
