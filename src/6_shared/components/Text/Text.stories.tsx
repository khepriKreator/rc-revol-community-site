/* eslint i18next/no-literal-string: "off" */
import { Meta } from '@storybook/react';
import { Text, TextProps } from './Text';

const meta: Meta<TextProps> = {
  component: Text,
  title: 'shared/components/Text',
};

export default meta;

export const Component = () => {
  return (
    <>
      <Text
        children={'That text'}
        color={'default'}
        size={'S'}
        weight={'default'}
        isLink={false}
      />
    </>
  );
};

Component.parameters = {
  msw: {
    handlers: [],
  },
};
