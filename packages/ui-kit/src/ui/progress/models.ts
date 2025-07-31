/**
 * Неймспейс с типизацией NProgress
 */

export namespace NProgress {
  export type TType = 'line' | 'circle' | 'dashboard';
  export type TStatus = 'normal' | 'exception' | 'active' | 'success';
  export type TSize = 'default' | 'small';
  export type TStrokeLinecap = 'butt' | 'square' | 'round';
  export type TGapPosition = 'top' | 'bottom' | 'left' | 'right';

  export type TStringGradients = Record<string, string>;
  type TFromToGradients = {
    from: string;
    to: string;
  };
  export type TGradient = {
    direction?: string;
  } & (TStringGradients | TFromToGradients);

  export type TPercentPositionType = {
    align?: 'start' | 'center' | 'end';
    type?: 'inner' | 'outer';
  };
  export type TAriaProps = Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'>;

  export type TSegmentTooltips = {
    success: string;
    failure: string;
    rest: string;
  };

  export type TProps = {
    children?: React.ReactNode;
    className?: string;
    /**
     * Тип прогресса
     */
    type?: TType;
    /**
     * Процент провальных кейсов
     */
    failurePercent?: number;
    /**
     * Цвет бара провальных кейсов
     */
    failureStrokeColor?: string | string[] | TGradient;
    /**
     * Процент успешных кейсов
     */
    successPercent?: number;
    /**
     * Цвет бара успешных кейсов
     */
    successStrokeColor?: string;
    status?: TStatus;
    /**
     * Отображение прогресса и значка состояния
     */
    isShowInfo?: boolean;
    /**
     * Ширина прогресса
     */
    strokeWidth?: number;
    /**
     * Стиль строки прогресса
     */
    strokeLinecap?: TStrokeLinecap;
    /**
     * Цвет незаполненной части
     */
    trailColor?: string;
    gapDegree?: number;
    gapPosition?: TGapPosition;
    percentPosition?: TPercentPositionType;
    /**
     * Размер прогресса
     */
    size?:
      | number
      | [number | string, number]
      | TSize
      | {
          width?: number;
          height?: number;
        };
    /**
     * Конфигурация количества шагов и расстояния между ними
     */
    steps?:
      | number
      | {
          count: number;
          gap: number;
        };
    /**
     * Префикс для CSS классов
     */
    prefixCls?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    format?: (percent?: number, successPercent?: number) => React.ReactNode;
    /**
     * Создаёт tooltip информацию для каждого отдельного сегмента:
     */
    segmentTooltips?: TSegmentTooltips;
    /**
     * Заменяет проценты на отображение: готово ед./всего ед.
     */
    withCounting?: boolean;
    /**
     * кол-во единиц успешного завершения
     * не работает без withCounting
     */
    successCount?: number;
    /**
     * кол-во единиц неуспешного завершения
     * не работает без withCounting
     */
    failureCount?: number;
    /**
     * общее кол-во единиц
     * не работает без withCounting
     */
    totalCount?: number;
    /**
     * Обработчик клика на сегменте success при type === 'line'
     */
    onSegmentSuccessClick?: () => void;
    /**
     * Обработчик клика на сегменте failure при type === 'line'
     */
    onSegmentFailureClick?: () => void;
    /**
     * Обработчик клика на сегменте rest при type === 'line'
     */
    onSegmentRestClick?: () => void;

    /**
     * Функция для округления значения
     */
    rounding?: (step: number) => number;
  };
}
