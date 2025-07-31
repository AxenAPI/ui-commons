import { FC, useMemo } from 'react';

import { Progress as AntdProgress, Tooltip } from 'antd';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import { useSegmentActions } from './hooks/useSegmentActions';
import { useSegmentTooltips } from './hooks/useSegmentTooltips';
import { NProgress } from './models';

import styles from './styles.module.css';

/**
 * Подгон числовых значений к процентным пропсам ант-компонента
 */
const calcProgress = ({
  failureCount,
  failurePercent,
  successCount,
  successPercent,
  successStrokeColor,
  totalCount,
  withCounting,
}: {
  failureCount: number;
  failurePercent: number;
  successCount: number;
  successPercent: number;
  successStrokeColor: string | undefined;
  totalCount: number;
  withCounting: boolean;
}) => {
  // Стандартный флоу работы с процентами
  if (!withCounting)
    return {
      // Учитываем длинну success
      progressPercent: failurePercent + successPercent,
      progressSuccess: {
        percent: successPercent,
        strokeColor: successStrokeColor,
      },
    };

  // Учитываем длинну success
  const enrichedFailureCount = failureCount + successCount;

  return {
    progressPercent: Math.round((enrichedFailureCount / totalCount) * 100),
    progressSuccess: successCount
      ? {
          percent: Math.round((successCount / totalCount) * 100),
          strokeColor: successStrokeColor,
        }
      : undefined,
  };
};

export const Progress: FC<NProgress.TProps> = ({
  failureCount = 1,
  failurePercent = 0,
  failureStrokeColor,
  isShowInfo,
  onSegmentFailureClick,
  onSegmentRestClick,
  onSegmentSuccessClick,
  segmentTooltips,
  successCount = 0,
  successPercent = 0,
  successStrokeColor,
  totalCount = 1,
  withCounting = false,
  status,
  ...rest
}) => {
  // согласно html4 id должен начинаться с буквы:
  const uuid = useMemo(() => `i${nanoid()}`, []);

  // вычисление параметров сегментов
  const { progressPercent, progressSuccess } = calcProgress({
    failureCount,
    failurePercent,
    successCount,
    successPercent,
    successStrokeColor,
    totalCount,
    withCounting,
  });

  // В случае если все завершилось с ошибкой, progressPercent = 100 и antd красит прогресс в зеленый
  const failureStatus = withCounting && isShowInfo && totalCount === failureCount ? 'normal' : undefined;

  // настройка тултипов
  const { activeSegmentTooltipText } = useSegmentTooltips({
    progressId: uuid,
    progressType: rest.type,
    segmentTooltips,
  });

  // настройка кликов по тултипам
  useSegmentActions({
    progressId: uuid,
    progressType: rest.type,
    onSegmentSuccessClick,
    onSegmentFailureClick,
    onSegmentRestClick,
  });

  const progressComponent = (
    <div
      className={cn(styles.progressWrapper, {
        [styles.progressSuccessClickable]: onSegmentSuccessClick,
        [styles.progressFailureClickable]: onSegmentFailureClick,
        [styles.progressRestClickable]: onSegmentRestClick,
      })}
      id={uuid}
    >
      <AntdProgress
        {...rest}
        percent={progressPercent}
        showInfo={isShowInfo && !withCounting}
        strokeColor={failureStrokeColor}
        status={status ?? failureStatus}
        success={progressSuccess}
      />
      {withCounting && isShowInfo && (
        <span className={styles.progressCountInfo}>
          {failureCount + successCount}/{totalCount}
        </span>
      )}
    </div>
  );

  if (segmentTooltips) {
    return <Tooltip title={activeSegmentTooltipText}>{progressComponent}</Tooltip>;
  }

  return progressComponent;
};
