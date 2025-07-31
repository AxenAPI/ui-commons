import React from 'react';

import { IconX } from '@tabler/icons-react';

import { Tag as AntdTag } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers';
import { Text } from '@/ui/typography';

import { TAG_COLORS, TAG_STATUS_COLORS } from './consts';
import { NTag } from './models';

import tagStyles from './tag.module.scss';

export function Tag(props: NTag.TProps) {
  const { theme } = useTheme();
  const {
    fontSizeIcon: suffixIconSize,
    fontSize: closedIconSize,
    statusDefaultBorder,
    defaultBg,
    colorPrimary,
    colorTextLightSolid,
  } = theme?.components?.Tag || {};

  //задаем размер для иконок, которые стоят перед текстом
  const clonedIcon = props.icon
    ? React.cloneElement(props.icon as React.ReactElement, {
        style: {
          marginRight: 8,
          width: suffixIconSize,
          height: suffixIconSize,
        },
      })
    : undefined;

  //задаем размер для крестика
  const clonedCloseIcon = props.closeIcon
    ? React.cloneElement(props.closeIcon as React.ReactElement, {
        style: {
          width: closedIconSize,
          height: closedIconSize,
        },
      })
    : undefined;

  let styles;
  let tagClasses;

  switch (true) {
    case props.isCheckable || props.isCheckableBorder:
      styles = {
        backgroundColor: props.isChecked ? colorPrimary : props.isCheckableBorder ? defaultBg : 'transparent',
        color: props.isChecked && colorTextLightSolid,
        borderColor: props.isCheckableBorder && !props.isChecked ? statusDefaultBorder : 'transparent',
        cursor: 'pointer',
      } as React.CSSProperties;
      tagClasses = cn(
        props.isChecked ? tagStyles.antCheckableCheckedTag : tagStyles.antCheckableTag,
        props.isCheckableBorder ? props.isCheckableBorder : ''
      );
      break;
    case Boolean(props.status) || Boolean(props.color):
      {
        let colorMap = undefined;

        if (props.status) colorMap = TAG_STATUS_COLORS[props.status];
        else if (props.color) colorMap = TAG_COLORS[props.color];

        styles = colorMap
          ? ({
              borderColor: (props.isBordered && theme?.components?.Tag?.[colorMap.border]) || undefined,
              color: theme?.components?.Tag?.[colorMap.color] || undefined,
              backgroundColor: theme?.components?.Tag?.[colorMap.bg] || undefined,
            } as React.CSSProperties)
          : undefined;
      }
      break;
    default:
      break;
  }

  const renderEllipsisContent = () => {
    const content = props.text ?? props.children;

    if (props.showTooltip) return <Text isEllipsis={{ tooltip: content }}>{content}</Text>;

    return <Text isEllipsis>{content}</Text>;
  };

  return (
    <AntdTag
      {...props}
      closable={props.isClosable}
      onClick={props.onCheck}
      bordered={props.isBordered}
      className={cn(tagClasses, props?.className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderStyle: props.isDashed ? 'dashed' : undefined,
        ...props.style,
        ...styles,
      }}
      icon={clonedIcon}
      closeIcon={
        <span className={tagStyles.iconWrapper}>
          {clonedCloseIcon ?? (props.isClosable && <IconX width={closedIconSize} height={closedIconSize} />)}
        </span>
      }
    >
      {renderEllipsisContent()}
    </AntdTag>
  );
}
