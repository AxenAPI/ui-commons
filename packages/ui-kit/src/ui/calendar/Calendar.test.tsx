import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import enUS from 'antd/lib/calendar/locale/en_US';
import dayjs, { Dayjs } from 'dayjs';

import { Calendar } from './Calendar';
import { NCalendar } from './models';

const renderCalendar = (props?: Partial<NCalendar.TProps<Dayjs>>) => {
  return render(<Calendar {...props} />);
};

const mockDate = '2025-10-01';
const mockValidDateRange = ['2025-10-01', '2025-10-31'];
const dateFormat = 'YYYY-MM-DD';

describe('/ui/calendar/Calendar.tsx', () => {
  test('renders with default props', () => {
    const { container } = renderCalendar();
    expect(container.querySelector('.ant-picker-calendar')).toBeInTheDocument();
  });

  test('passing cellRender fn leads custom element to be rendered in cell', () => {
    const { container } = renderCalendar({
      cellRender: date => <div className="custom-element">{date.format(dateFormat)}</div>,
    });

    const dateContentElement = container.querySelector('.ant-picker-calendar-date-content');
    const customElement = dateContentElement?.querySelector('.custom-element');

    expect(customElement).toBeInTheDocument();
    expect(customElement?.textContent).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('passing fullCellRender fn leads custom element to be rendered correctly replacing the default cell element', () => {
    const { container } = renderCalendar({
      fullCellRender: date => <div className="custom-element">{date.format(dateFormat)}</div>,
    });

    const cellElement = container.querySelector('.ant-picker-cell');
    const defaultElement = cellElement?.querySelector('.ant-picker-calendar-date');
    const customElement = cellElement?.querySelector('.custom-element');

    expect(defaultElement).not.toBeInTheDocument();
    expect(customElement).toBeInTheDocument();
    expect(customElement?.textContent).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('passing defaultValue leads this date table element to be selected by default', () => {
    const defaultDate = dayjs(mockDate);
    const { container } = renderCalendar({ defaultValue: defaultDate });

    const selectedCell = container.querySelector('.ant-picker-cell-selected');
    expect(selectedCell?.getAttribute('title')).toBe(mockDate);
  });

  test('passing disableDate fn makes proper date to be disabled', () => {
    const defaultDate = dayjs(mockDate);
    const { container } = renderCalendar({
      defaultValue: defaultDate,
      disabledDate: date => date.format(dateFormat) === mockDate,
    });

    const disabledCell = container.querySelector('.ant-picker-cell-disabled');
    expect(disabledCell?.getAttribute('title')).toBe(mockDate);
  });

  test('passing headerRender fn change default header to custom', () => {
    const { container } = renderCalendar({
      headerRender: () => <div className="custom-header" />,
    });

    const defaultHeader = container.querySelector('.ant-picker-calendar-header');
    const customHeader = container.querySelector('.custom-header');

    expect(defaultHeader).not.toBeInTheDocument();
    expect(customHeader).toBeInTheDocument();
  });

  test('locale is applying correctly', () => {
    const { container } = renderCalendar({
      locale: enUS,
    });

    const weekCells = container.querySelectorAll('.ant-picker-content th');
    const displayedDays = Array.from(weekCells).map(cell => cell.textContent?.trim());

    expect(displayedDays).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
  });

  test('passing mode changes the calendar mode correctly', () => {
    const { container } = renderCalendar({ mode: 'year' });
    const yearView = container.querySelector('.ant-picker-month-panel');
    expect(yearView).toBeInTheDocument();
  });

  test('validRange restricts the calendar to the given date range', () => {
    const defaultDate = dayjs(mockDate);
    const minDate = dayjs(mockValidDateRange[0]);
    const maxDate = dayjs(mockValidDateRange[1]);

    const { container } = renderCalendar({
      defaultValue: defaultDate,
      validRange: [minDate, maxDate],
    });

    const displayedCells = container.querySelectorAll('.ant-picker-cell');

    displayedCells.forEach(element => {
      const date = element.getAttribute('title');
      if (dayjs(date).isBefore(minDate) || dayjs(date).isAfter(maxDate)) {
        expect(element).toHaveClass('ant-picker-cell-disabled');
      } else {
        expect(element).not.toHaveClass('ant-picker-cell-disabled');
      }
    });
  });

  test('shouldShowWeek prop correctly shows or hides the week numbers', () => {
    const { container } = renderCalendar({ shouldShowWeek: true });
    const weekNumberColumn = container.querySelector('.ant-picker-date-panel-show-week');
    expect(weekNumberColumn).toBeInTheDocument();

    const { container: containerWithoutWeek } = renderCalendar({ shouldShowWeek: false });
    const weekNumberColumnWithout = containerWithoutWeek.querySelector('.ant-picker-date-panel-show-week');
    expect(weekNumberColumnWithout).not.toBeInTheDocument();
  });

  test('onChange callback is triggered on date change', () => {
    const onChangeMock = jest.fn();
    const { container } = renderCalendar({ onChange: onChangeMock });

    const dateCell = container.querySelector('.ant-picker-cell');

    dateCell && fireEvent.click(dateCell);
    expect(onChangeMock).toHaveBeenCalled();
  });

  test('onPanelChange callback is triggered when panel changes', () => {
    const onPanelChangeMock = jest.fn();
    const { container } = renderCalendar({ mode: 'year', onPanelChange: onPanelChangeMock });

    const monthButton = container.querySelector('.ant-radio-group')?.firstChild;
    monthButton && fireEvent.click(monthButton);

    expect(onPanelChangeMock).toHaveBeenCalled();
  });

  test('onSelect callback is triggered when a date is selected', () => {
    const onSelectMock = jest.fn();
    const { container } = renderCalendar({ onSelect: onSelectMock });

    const dateCell = container.querySelector('.ant-picker-cell');
    dateCell && fireEvent.click(dateCell);

    expect(onSelectMock).toHaveBeenCalled();
  });

  test('isFullscreen toggles the fullscreen mode correctly', () => {
    const { container: containerFull } = renderCalendar({ isFullscreen: true });
    const calendarElementFullscreen = containerFull.querySelector('.ant-picker-calendar');
    expect(calendarElementFullscreen).toHaveClass('ant-picker-calendar-full');
    expect(calendarElementFullscreen).not.toHaveClass('ant-picker-calendar-mini');

    const { container: containerMini } = renderCalendar({ isFullscreen: false });
    const calendarElementMinified = containerMini.querySelector('.ant-picker-calendar');
    expect(calendarElementMinified).not.toHaveClass('ant-picker-calendar-full');
    expect(calendarElementMinified).toHaveClass('ant-picker-calendar-mini');
  });

  test('unmounts without errors', () => {
    const { unmount } = renderCalendar();
    expect(() => unmount()).not.toThrow();
  });
});
