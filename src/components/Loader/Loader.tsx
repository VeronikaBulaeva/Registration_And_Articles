import { Box, styled } from '@mui/material';

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderStyle />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
`;

const LoaderStyle = styled(Box)`
    border: 10px solid ${({ theme }) => theme.palette.secondary.light};
    border-top: 10px solid ${({ theme }) => theme.palette.text.secondary};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
