import React from 'react';
import ImportModal from './ImportModal';

export default {
  title: 'Modal/ImportModal',
  component: ImportModal,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <ImportModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => console.log('Modal closed'),
};

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  onClose: () => console.log('Modal closed'),
};
