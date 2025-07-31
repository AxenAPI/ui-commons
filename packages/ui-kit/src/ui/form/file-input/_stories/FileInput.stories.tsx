import type { Meta } from '@storybook/react';

import { FileInput } from '../FileInput';
import { NFileInput } from '../models';
import {
  Avatar,
  Default,
  DefaultFiles,
  Directory,
  DragAndDrop,
  DragAndDropCustom,
  MaxCount,
  UploadManually,
  UploadOnly,
} from './components';

const meta = {
  title: 'Axenix UI/Form/FileInput/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export default meta;

export {
  Default,
  Avatar,
  DefaultFiles,
  DragAndDrop,
  DragAndDropCustom,
  UploadManually,
  Directory,
  UploadOnly,
  MaxCount,
};

export const DragAndDropDisabled = (args: NFileInput.TDraggerProps) => <DragAndDrop {...args} isDisabled={true} />;
