import { Meta, Story } from '@storybook/react';
import { Medal } from 'components/ds/icons';
import { Badge } from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
} as Meta<typeof Badge>;

const Template: Story<typeof Badge> = (args: any) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Badge' };

export const WithIcon = Template.bind({});
WithIcon.args = { children: '#123/43', icon: Medal };

export const WithIconString = Template.bind({});
WithIconString.args = { children: '#123/43', icon: 'Donut' };
