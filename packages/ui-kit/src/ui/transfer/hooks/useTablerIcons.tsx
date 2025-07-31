import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const useTablerIcons = (wrapperRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (wrapperRef.current) {
      // замена иконок перемещения между блоками Transfer:
      const spanRightIcon = wrapperRef.current.querySelector('.ant-transfer-operation span.anticon-right');
      if (spanRightIcon) {
        spanRightIcon.innerHTML = '';
        if (spanRightIcon.parentElement) {
          spanRightIcon.parentElement.style.marginLeft = '1px';
        }
        ReactDOM.createRoot(spanRightIcon as HTMLElement).render(<IconChevronRight width={16} height={16} />);
      }
      const spanLeftIcon = wrapperRef.current.querySelector('.ant-transfer-operation span.anticon-left');
      if (spanLeftIcon) {
        spanLeftIcon.innerHTML = '';
        if (spanLeftIcon.parentElement) {
          spanLeftIcon.parentElement.style.marginRight = '1px';
        }
        ReactDOM.createRoot(spanLeftIcon as HTMLElement).render(<IconChevronLeft width={16} height={16} />);
      }
    }
  }, [wrapperRef]);
};
