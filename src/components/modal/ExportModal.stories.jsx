import React from 'react';
import ExportModal from './ExportModal';

export default {
  title: 'Modal/ExportModal',
  component: ExportModal,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <ExportModal {...args} />;

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
