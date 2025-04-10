import React from 'react';
import Header from './Header';

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: query => console.log('Search query:', query),
};
