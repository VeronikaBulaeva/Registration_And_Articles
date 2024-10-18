import { FC, useState } from 'react';
import { Box, styled, Tab, Tabs } from '@mui/material';
import TabPanel from '@/components/TabPanel/TabPanel.tsx';
import Authorization from '@/components/Authorization/Authorization.tsx';
import Registration from '@/components/Registration/Registration.tsx';
import { FormSection } from '@/components/styles.tsx';

const RegistrationPage: FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const tabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
    };
  };
  return (
    <MainSection>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => {
          setTabValue(newValue);
        }}
      >
        <Tab label="Авторизация" {...tabProps(0)} />
        <Tab label="Регистрация" {...tabProps(1)} />
      </Tabs>
      <FormSection>
        <Box sx={{ display: 'grid' }}>
          <FormBox>
            <TabPanel index={0} value={tabValue}>
              <Authorization />
            </TabPanel>
            <TabPanel index={1} value={tabValue}>
              <Registration />
            </TabPanel>
          </FormBox>
        </Box>
      </FormSection>
    </MainSection>
  );
};

export default RegistrationPage;

const MainSection = styled('section')`
  display: grid;
  justify-content: center;
  justify-items: center;
  padding-block: 30px;
`;

const FormBox = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    max-width: 100%;
  }
`;
