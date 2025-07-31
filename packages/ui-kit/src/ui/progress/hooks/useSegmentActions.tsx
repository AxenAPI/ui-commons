import { useEffect } from 'react';

import { NProgress } from '../models';

export type TUseSegmentsActions = {
  progressId: string;
  progressType?: NProgress.TType;
  onSegmentSuccessClick?: () => void;
  onSegmentFailureClick?: () => void;
  onSegmentRestClick?: () => void;
};

export const useSegmentActions = ({
  progressId,
  progressType,
  onSegmentSuccessClick,
  onSegmentFailureClick,
  onSegmentRestClick,
}: TUseSegmentsActions) => {
  useEffect(() => {
    if (onSegmentSuccessClick && progressType === 'line') {
      const successEl = document.querySelector(`#${progressId} .ant-progress-success-bg`);
      // вынужденная мера: элементы вложены друг в друга,
      // поэтому нам нужно прервать распространение события клика на родительские nodes:
      const handleSegementSuccessClick = (e: ElementEventMap['fullscreenchange']) => {
        e.stopPropagation();
        onSegmentSuccessClick();
      };
      successEl?.addEventListener('click', handleSegementSuccessClick);
      return () => {
        successEl?.removeEventListener('click', handleSegementSuccessClick);
      };
    }
  }, [progressId, progressType, onSegmentSuccessClick]);

  useEffect(() => {
    if (onSegmentFailureClick && progressType === 'line') {
      const failureEl = document.querySelector(`#${progressId} .ant-progress-bg-outer`);
      // вынужденная мера: элементы вложены друг в друга,
      // поэтому нам нужно прервать распространение события клика на родительские nodes:
      const handleSegementFailureClick = (e: ElementEventMap['fullscreenchange']) => {
        e.stopPropagation();
        onSegmentFailureClick();
      };
      failureEl?.addEventListener('click', handleSegementFailureClick);
      return () => {
        failureEl?.removeEventListener('click', handleSegementFailureClick);
      };
    }
  }, [progressId, progressType, onSegmentFailureClick]);

  useEffect(() => {
    if (onSegmentRestClick) {
      const restEl = document.querySelector(`#${progressId} .ant-progress-inner`);
      restEl?.addEventListener('click', onSegmentRestClick);
      return () => {
        restEl?.removeEventListener('click', onSegmentRestClick);
      };
    }
  }, [progressId, progressType, onSegmentRestClick]);
};
