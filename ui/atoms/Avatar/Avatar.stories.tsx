import { Meta, Story } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>;

const Template: Story<typeof Avatar> = (args: any) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = { id: '123' };

export const CustomSize = Template.bind({});
CustomSize.args = {
  id: '123',
  size: 64,
};
