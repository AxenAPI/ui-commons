import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Space } from '@/ui/utility';

import { NProgress } from '../models';
import { Progress } from '../Progress';

export default {
  title: 'Axenix UI/Progress/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    strokeLinecap: { control: 'select', options: ['butt', 'square', 'round'] },
    trailColor: { control: 'text' },
  },
  args: {
    strokeLinecap: 'round',
    trailColor: 'rgba(0, 0, 0, 0.06)',
  },
} as Meta<typeof Progress>;

export const Default = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress {...argTypes} isShowInfo={false} failurePercent={10} />
      <Progress {...argTypes} failurePercent={30} />
      <Progress {...argTypes} status="active" failurePercent={50} />
      <Progress {...argTypes} status="exception" failurePercent={70} />
      <Progress {...argTypes} status="success" failurePercent={100} />
    </Space>
  );
};

export const Circle = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space>
      <Progress {...argTypes} isShowInfo={false} failurePercent={10} />
      <Progress {...argTypes} failurePercent={30} />
      <Progress {...argTypes} status="exception" failurePercent={70} />
      <Progress {...argTypes} status="success" failurePercent={100} />
    </Space>
  );
};

export const Dashboard = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space>
      <Progress {...argTypes} isShowInfo={false} failurePercent={10} />
      <Progress {...argTypes} failurePercent={30} />
      <Progress {...argTypes} status="exception" failurePercent={70} />
      <Progress {...argTypes} status="success" failurePercent={100} />
    </Space>
  );
};

export const Size = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress {...argTypes} failurePercent={50} />
      <Progress {...argTypes} failurePercent={50} size="small" />
      <Progress {...argTypes} failurePercent={50} size={[300, 20]} />
      <Space>
        <Progress {...argTypes} type="circle" failurePercent={50} />
        <Progress {...argTypes} type="circle" failurePercent={50} size="small" />
        <Progress {...argTypes} type="circle" failurePercent={50} size={20} />
      </Space>
      <Space>
        <Progress {...argTypes} type="dashboard" failurePercent={50} />
        <Progress {...argTypes} type="dashboard" failurePercent={50} size="small" />
        <Progress {...argTypes} type="dashboard" failurePercent={50} size={20} />
      </Space>
      <Space>
        <Progress {...argTypes} steps={3} failurePercent={50} />
        <Progress {...argTypes} steps={3} failurePercent={50} size="small" />
        <Progress {...argTypes} steps={3} failurePercent={50} size={20} />
        <Progress {...argTypes} steps={3} failurePercent={50} size={[20, 30]} />
      </Space>
    </Space>
  );
};

export const ValuePosition = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress
        {...argTypes}
        failurePercent={0}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[200, 20]}
        failureStrokeColor="#E6F4FF"
      />
      <Progress
        {...argTypes}
        failurePercent={10}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[300, 20]}
      />
      <Progress
        {...argTypes}
        failurePercent={50}
        percentPosition={{ align: 'start', type: 'inner' }}
        size={[300, 20]}
        failureStrokeColor="#6edb8f"
      />
      <Progress
        {...argTypes}
        failurePercent={60}
        percentPosition={{ align: 'end', type: 'inner' }}
        size={[300, 20]}
        failureStrokeColor="#001342"
      />
      <Progress
        {...argTypes}
        failurePercent={100}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[400, 20]}
      />
      <Progress {...argTypes} failurePercent={60} percentPosition={{ align: 'start', type: 'outer' }} />
      <Progress {...argTypes} failurePercent={100} percentPosition={{ align: 'start', type: 'outer' }} />
      <Progress {...argTypes} failurePercent={60} percentPosition={{ align: 'center', type: 'outer' }} size="small" />
      <Progress {...argTypes} failurePercent={100} percentPosition={{ align: 'center', type: 'outer' }} />
    </Space>
  );
};

export const CustomTextFormat = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space>
      <Progress {...argTypes} failurePercent={75} format={failurePercent => `${failurePercent} Days`} />
      <Progress {...argTypes} failurePercent={100} format={() => 'Done'} />
    </Space>
  );
};

export const WithSteps = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress {...argTypes} failurePercent={50} steps={3} />
      <Progress {...argTypes} failurePercent={30} steps={5} />
      <Progress {...argTypes} failurePercent={100} steps={5} size="small" failureStrokeColor={'#87d06'} />
    </Space>
  );
};

export const WithSuccessSegment = (argTypes: NProgress.TProps): ReactNode => {
  return <Progress {...argTypes} />;
};

export const StrokeLinecap = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress {...argTypes} />
      <Progress {...argTypes} type="circle" />
      <Progress {...argTypes} type="dashboard" />
    </Space>
  );
};

export const CustomLineGradient = (argTypes: NProgress.TProps): ReactNode => {
  const gradient = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <Space direction="vertical">
      <Progress {...argTypes} failurePercent={99.9} failureStrokeColor={gradient} />
      <Progress {...argTypes} type="circle" failurePercent={90} failureStrokeColor={gradient} />
      <Progress {...argTypes} type="dashboard" failurePercent={75} failureStrokeColor={gradient} />
    </Space>
  );
};

export const CircularWithStepsAndGaps = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space>
      <Progress {...argTypes} type="dashboard" steps={8} failurePercent={50} />
      <Progress {...argTypes} type="circle" failurePercent={100} steps={{ count: 5, gap: 10 }} />
    </Space>
  );
};

export const ResponsiveCircularWithTooltip = (argTypes: NProgress.TProps): ReactNode => {
  return <Progress {...argTypes} />;
};

export const WithSuccessSegmentCounting = (argTypes: NProgress.TProps): ReactNode => {
  return (
    <Space direction="vertical">
      <Progress {...argTypes} size={[100, 8]} />
      <Progress {...argTypes} type="circle" size={100} strokeWidth={8} />
      <Progress {...argTypes} type="dashboard" size={100} strokeWidth={8} />
    </Space>
  );
};

export const WithSuccessSegmentActionsAndTooltips = (argTypes: NProgress.TProps): ReactNode => {
  return <Progress {...argTypes} />;
};

Default.args = {
  type: 'line',
  size: [200, 5],
};

Circle.args = {
  type: 'circle',
};

Dashboard.args = {
  type: 'dashboard',
};

ValuePosition.args = {
  type: 'line',
};

CustomTextFormat.args = {
  type: 'circle',
};

WithSteps.args = {
  type: 'line',
};

WithSuccessSegment.args = {
  failurePercent: 60,
  successPercent: 30,
  type: 'circle',
};

StrokeLinecap.args = {
  strokeLinecap: 'butt',
  failurePercent: 75,
};

CircularWithStepsAndGaps.args = {
  strokeWidth: 20,
};

ResponsiveCircularWithTooltip.args = {
  type: 'circle',
  failurePercent: 60,
  strokeWidth: 20,
  size: 19,
  format: () => `size < strokeWidth`,
};

WithSuccessSegmentCounting.args = {
  type: 'line',
  isShowInfo: true,
  withCounting: true,
  successCount: 10,
  failureCount: 10,
  totalCount: 30,
};

WithSuccessSegmentActionsAndTooltips.args = {
  type: 'line',
  size: [200, 8],
  isShowInfo: true,
  withCounting: true,
  successCount: 10,
  failureCount: 10,
  totalCount: 30,
  segmentTooltips: {
    success: '10/20 успешно',
    failure: '10/20 неудач',
    rest: '10 осталось выполнить',
  },
  onSegmentSuccessClick: () => alert('10/20 задач успешно выполнено'),
  onSegmentFailureClick: () => alert('10/20 задач выполнено с ошибками'),
  onSegmentRestClick: () => alert('10 задач осталось выполнить'),
};
