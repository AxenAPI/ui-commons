import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { Form as AntdForm } from 'antd';
import { nanoid } from 'nanoid';

import { useTheme } from '@/providers/theme-provider';
import { Tooltip } from '@/ui/tooltip';

import { NFormItem } from './models';

import styles from './styles.module.css';

export const FormItem: FC<NFormItem.TProps> = ({ isRequired, requiredMarkPosition = 'right', ...props }) => {
  const { theme } = useTheme();
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  // используем uuid для доступа к отдельному formItem:
  // согласно html4 id должен начинаться с буквы:
  const uuid = useMemo(() => `i${nanoid()}`, []);

  useEffect(() => {
    if (labelRef.current) {
      /**TO_DO Возможно проблемы с расчетом длины строки*/
      setIsOverflowed(labelRef.current?.offsetWidth < labelRef.current.scrollWidth);
    }
  }, [props.label]);

  const handleClick = () => {
    // решение предполагает, что первый child <FormItem />
    // является объектом, который может реагировать на триггер focus
    const controlElement = document.querySelector(`#${uuid} .ant-input`);

    if (controlElement instanceof HTMLInputElement || controlElement instanceof HTMLTextAreaElement) {
      controlElement.focus();
    }
  };

  const isRequiredRight = requiredMarkPosition === 'right';

  return (
    // eslint-disable-next-line
    <div onClick={handleClick} id={uuid}>
      <AntdForm.Item
        {...props}
        required={isRequiredRight ? false : isRequired}
        label={
          !!props.label && (
            <span className={styles.labelContent}>
              <Tooltip title={isOverflowed ? props.label : null} placement="topLeft">
                <span
                  ref={labelRef}
                  title={typeof props.label === 'string' ? props.label : ''}
                  className={styles.label}
                >
                  {props.label}
                </span>
              </Tooltip>
              {isRequiredRight && isRequired && (
                <span
                  style={{
                    color: theme.components?.Form?.labelRequiredMarkColor,
                    flexShrink: 0,
                    marginLeft: theme.token?.marginXXS,
                  }}
                >
                  *
                </span>
              )}
            </span>
          )
        }
      />
    </div>
  );
};
