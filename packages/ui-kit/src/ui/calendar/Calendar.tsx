import { Calendar as AntCalendar } from 'antd';
import { Dayjs } from 'dayjs';

import { NCalendar } from '@/ui/calendar/models.ts';

export const Calendar = ({ isFullscreen, shouldShowWeek, ...rest }: NCalendar.TProps<Dayjs>) => {
  return <AntCalendar {...rest} showWeek={shouldShowWeek} fullscreen={isFullscreen} />;
};
