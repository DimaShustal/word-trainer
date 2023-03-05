import React from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Stack from '../../atoms/Stack';
import { Card } from './AllLanguagesPage.style';
import { ALL_WORDS_PATH } from '../../../constants/path';

const LANGUAGES = [
  {
    code: 'PL',
    name: 'Polski',
  },
  {
    code: 'EN',
    name: 'English',
  },
];

const AllLanguagesPage = () => {
  const navigate = useNavigate();

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { code } = e.currentTarget.dataset;

    // TODO save
    console.log(1111, code);

    navigate(ALL_WORDS_PATH);
  };

  return (
    <Stack gap={20}>
      {LANGUAGES.map(({ code, name }) => (
        <Card key={code} role={'button'} onClick={clickHandler} data-code={code}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {name}
          </Typography.Title>
        </Card>
      ))}
    </Stack>
  );
};

export default AllLanguagesPage;
