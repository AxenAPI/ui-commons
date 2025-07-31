import { StepsProps } from 'antd';

/**
 * Неймспейс с типизацией NSteppers
 */

export namespace NSteppers {
  export type TProps = {
    items?: StepsProps['items'];
    current?: StepsProps['current'];
    status?: StepsProps['status'];
    progressDot?: StepsProps['progressDot'];
    percent?: StepsProps['percent'];
    direction?: StepsProps['direction'];
  };
}
