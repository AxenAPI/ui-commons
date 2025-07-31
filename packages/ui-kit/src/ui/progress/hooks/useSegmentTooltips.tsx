import { useEffect, useState } from 'react';

import { NProgress } from '../models';

export type TUseSegmentsActions = {
  progressId: string;
  progressType?: NProgress.TType;
  segmentTooltips?: NProgress.TSegmentTooltips;
};

export const useSegmentTooltips = ({ progressId, progressType, segmentTooltips }: TUseSegmentsActions) => {
  const [activeSegmentTooltipText, setActiveSegmentTooltipText] = useState<string>('');

  useEffect(() => {
    if (segmentTooltips && progressType === 'line') {
      const successEl = document.querySelector(`#${progressId} .ant-progress-success-bg`);
      const failureEl = document.querySelector(`#${progressId} .ant-progress-bg-outer`);
      const restEl = document.querySelector(`#${progressId} .ant-progress-inner`);

      const handleMouseEnterSuccess = () => setActiveSegmentTooltipText(segmentTooltips?.success);
      const handleMouseEnterFailure = () => setActiveSegmentTooltipText(segmentTooltips?.failure);
      const handleMouseEnterRest = () => setActiveSegmentTooltipText(segmentTooltips?.rest);

      successEl?.addEventListener('mouseenter', handleMouseEnterSuccess);
      failureEl?.addEventListener('mouseenter', handleMouseEnterFailure);
      restEl?.addEventListener('mouseover', handleMouseEnterRest);

      return () => {
        successEl?.removeEventListener('mouseenter', handleMouseEnterSuccess);
        failureEl?.removeEventListener('mouseenter', handleMouseEnterFailure);
        restEl?.removeEventListener('mouseover', handleMouseEnterRest);
      };
    }
  }, [progressId, progressType, segmentTooltips]);

  return { activeSegmentTooltipText };
};
