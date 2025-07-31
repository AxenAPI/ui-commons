import { NTag } from './models';

export const TAG_STATUS_COLORS: NTag.TTagStatusColors<NTag.TTagStatus> = {
  success: {
    border: 'statusSuccessBorder',
    bg: 'statusSuccessBg',
    color: 'statusSuccessText',
  },
  warning: {
    bg: 'statusWarningBg',
    border: 'statusWarningBorder',
    color: 'statusWarningText',
  },
  processing: {
    bg: 'statusProcessingBg',
    border: 'statusProcessingBorder',
    color: 'statusProcessingText',
  },
  error: {
    bg: 'statusErrorBg',
    border: 'statusErrorBorder',
    color: 'statusErrorText',
  },
  default: {
    bg: 'statusDefaultBg',
    border: 'statusDefaultBorder',
    color: 'statusDefaultText',
  },
};

export const TAG_COLORS: NTag.TTagStatusColors<NTag.TTagPresetColor> = {
  magenta: {
    bg: 'colorfulMagentaBg',
    border: 'colorfulMagentaBorder',
    color: 'colorfulMagentaText',
  },
  red: {
    bg: 'colorfulRedBg',
    border: 'colorfulRedBorder',
    color: 'colorfulRedText',
  },
  volcano: {
    bg: 'colorfulVolcanoBg',
    border: 'colorfulVolcanoBorder',
    color: 'colorfulVolcanoText',
  },
  orange: {
    bg: 'colorfulOrangeBg',
    border: 'colorfulOrangeBorder',
    color: 'colorfulOrangeText',
  },
  gold: {
    bg: 'colorfulGoldBg',
    border: 'colorfulGoldBorder',
    color: 'colorfulGoldText',
  },
  lime: {
    bg: 'colorfulLimeBg',
    border: 'colorfulLimeBorder',
    color: 'colorfulLimeText',
  },
  green: {
    bg: 'colorfulGreenBg',
    border: 'colorfulGreenBorder',
    color: 'colorfulGreenText',
  },
  cyan: {
    bg: 'colorfulCyanBg',
    border: 'colorfulCyanBorder',
    color: 'colorfulCyanText',
  },
  blue: {
    bg: 'colorfulBlueBg',
    border: 'colorfulBlueBorder',
    color: 'colorfulBlueText',
  },
  geekblue: {
    bg: 'colorfulGeekblueBg',
    border: 'colorfulGeekblueBorder',
    color: 'colorfulGeekblueText',
  },
  purple: {
    bg: 'colorfulPurpleBg',
    border: 'colorfulPurpleBorder',
    color: 'colorfulPurpleText',
  },
};
