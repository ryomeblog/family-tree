import React from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

// Basic Tooltip
export const Basic = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

// Positions
export const TopPosition = {
  args: {
    content: 'Top tooltip',
    position: 'top',
    children: <Button>Top</Button>,
  },
};

export const RightPosition = {
  args: {
    content: 'Right tooltip',
    position: 'right',
    children: <Button>Right</Button>,
  },
};

export const BottomPosition = {
  args: {
    content: 'Bottom tooltip',
    position: 'bottom',
    children: <Button>Bottom</Button>,
  },
};

export const LeftPosition = {
  args: {
    content: 'Left tooltip',
    position: 'left',
    children: <Button>Left</Button>,
  },
};

// Trigger Types
export const HoverTrigger = {
  args: {
    content: 'Hover tooltip',
    trigger: 'hover',
    children: <Button>Hover to show</Button>,
  },
};

export const ClickTrigger = {
  args: {
    content: 'Click tooltip',
    trigger: 'click',
    children: <Button>Click to show</Button>,
  },
};

// Custom Content
export const CustomContent = {
  args: {
    content: (
      <div className="text-center">
        <h3 className="font-bold mb-1">Custom Tooltip</h3>
        <p className="text-sm">This is a custom tooltip with multiple lines.</p>
      </div>
    ),
    children: <Button>Custom Content</Button>,
  },
};

// All Positions Demo
export const AllPositions = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 items-center justify-center">
      <div />
      <div className="text-center">
        <Tooltip content="Top tooltip" position="top">
          <Button>Top</Button>
        </Tooltip>
      </div>
      <div />
      <div className="text-center">
        <Tooltip content="Left tooltip" position="left">
          <Button>Left</Button>
        </Tooltip>
      </div>
      <div className="text-center">
        <Tooltip content="Center tooltip">
          <Button>Center</Button>
        </Tooltip>
      </div>
      <div className="text-center">
        <Tooltip content="Right tooltip" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <div />
      <div className="text-center">
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
      <div />
    </div>
  ),
};
