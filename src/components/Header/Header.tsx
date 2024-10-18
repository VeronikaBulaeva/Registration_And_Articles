import ButtonLink from '@/commons/Button';
import { styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ARTICLES_LIST_ROUTE, CHANGE_PASSWORD_ROUTE, REGISTRATION_PAGE_ROUTE } from '@/constants/routes.ts';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '@/app/profile/selectors.ts';
import { setUser } from '@/app/profile';

const Header = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setUser(null));
    document.cookie = 'access_token=;max-age=-1';
    document.cookie = 'refresh_token=;max-age=-1';
  };

  return (
    <HeaderSection sx={{ '&&': { padding: 3 } }}>
      {user && (
        <>
          <HeaderLink component={Link} to={ARTICLES_LIST_ROUTE}>
            <Typography variant="h2" color="text.primary">
              Главная
            </Typography>
          </HeaderLink>

          <HeaderLink component={Link} to={CHANGE_PASSWORD_ROUTE}>
            <Typography variant="h2" color="text.primary">
              Изменить пароль
            </Typography>
          </HeaderLink>
        </>
      )}
      <HeaderLink component={Link} to={REGISTRATION_PAGE_ROUTE} onClick={handleLogout}>
        {!user ? (
          <PersonIcon sx={{ fontSize: 30, color: 'secondary.dark' }} />
        ) : (
          <Typography variant="h2" color="text.primary">
            Выйти
          </Typography>
        )}
      </HeaderLink>
    </HeaderSection>
  );
};

const HeaderSection = styled('section')`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

const HeaderLink = styled(ButtonLink)`
  padding: 10px;
  gap: 6px;
  height: 44px;
  align-items: center;
`;

export default Header;
