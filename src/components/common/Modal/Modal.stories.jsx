import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const ModalTemplate = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// Basic Modal
export const Basic = {
  render: ModalTemplate,
  args: {
    title: 'Basic Modal',
    children: <p>This is a basic modal example.</p>,
  },
};

// Size Variations
export const Small = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    size: 'small',
    children: <p>This is a small modal.</p>,
  },
};

export const Medium = {
  render: ModalTemplate,
  args: {
    title: 'Medium Modal',
    size: 'medium',
    children: <p>This is a medium modal (default size).</p>,
  },
};

export const Large = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    size: 'large',
    children: <p>This is a large modal.</p>,
  },
};

// Long Content
export const LongContent = {
  render: ModalTemplate,
  args: {
    title: 'Long Content Modal',
    children: (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    ),
  },
};

// Form Modal
export const FormModal = {
  render: ModalTemplate,
  args: {
    title: 'Form Modal',
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Submit
          </Button>
        </div>
      </form>
    ),
  },
};
