import { Steps as AntdSteps } from 'antd';

import { NSteppers } from './models.ts';

export function Steps(props: NSteppers.TProps) {
  return <AntdSteps {...props} />;
}
