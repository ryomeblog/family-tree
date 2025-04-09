import React from 'react';
import { Button } from './Button';

export default {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'icon'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

// Primary Button
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Secondary Button
export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Icon Button
export const Icon = {
  args: {
    variant: 'icon',
    children: '＋',
  },
};

// Small Button
export const Small = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

// Medium Button
export const Medium = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

// Large Button
export const Large = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// Disabled Button
export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Example with all variations
export const AllVariations = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Small Primary
        </Button>
        <Button variant="primary" size="medium">
          Medium Primary
        </Button>
        <Button variant="primary" size="large">
          Large Primary
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" size="small">
          Small Secondary
        </Button>
        <Button variant="secondary" size="medium">
          Medium Secondary
        </Button>
        <Button variant="secondary" size="large">
          Large Secondary
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="icon" size="small">
          ＋
        </Button>
        <Button variant="icon" size="medium">
          ＋
        </Button>
        <Button variant="icon" size="large">
          ＋
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
        <Button variant="icon" disabled>
          ＋
        </Button>
      </div>
    </div>
  ),
};
