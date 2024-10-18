import { Box, styled } from '@mui/material';
import ButtonLink from '@/commons/Button.tsx';

export const FormBox = styled(Box)`
  box-shadow: ${({ theme }) => theme.palette.shadow.shadow};
  border-radius: 4px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.background.default};

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`;

export const GridContainer = styled('div')`
  display: grid;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
`;

export const FormSection = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  width: 600px;
  margin-inline: auto;
  margin-top: 40px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`;

export const AddCommentButton = styled(ButtonLink)`
  max-height: 60px;
  box-shadow: none;
  border: ${({ theme }) => theme.palette.secondary.light} solid 1px;
`;
