import React from 'react';

export type ItemType = {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 前置插槽
   */
  prefix?: React.ReactNode;
  /**
   * @description 排版类型: horizontal | vertical
   * @default "vertical"
   */
  styleType?: 'horizontal' | 'vertical';
  /**
   * 标题的解释内容
   */
  titleTip?: React.ReactNode;
  /**
   * 内容
   */
  content?: React.ReactNode;
  /**
   * 内容的备注
   */
  remark?: React.ReactNode;
  /**
   * 配置项的其他信息，如操作、补充信息等
   */
  extra?: React.ReactNode;
  /**
   * 自定义标题的宽度
   */
  customTitleWidth?: number | string;
  /**
   * 是否最后一行
   */
  isLastLine?: boolean;
   /**
   * 对齐方式
   */
  aligin?: 'left' | 'right';
  /**
   * 隐藏分割线
   */
  noBorder?: boolean;
};
export interface ConfigInfoProps {
  /**
   * 排版类型: 横向｜纵向, 默认为横向
   */
  styleType?: 'horizontal' | 'vertical';
  /**
   * 配置项数据数组
   */
  dataSource: ItemType[];
  /**
   * 多列展示的列数
   */
  col?: 1 | 2 | 3 | 4;
  /**
   * 自定义标题的宽度，字符串要带"px"，如100或100px
   */
  customTitleWidth?: number | string;
  /** @ignore */
  className?: string;
  /** 内容区对齐方式 */
  aligin?: 'left' | 'right'; 
  /**
   * 隐藏分割线
   */
  noBorder?: boolean;
}

export interface ActionIconProps {
  /**
   * 图标
   */
  icon?: React.ReactNode;

  /**
   * 点击时的回调
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * 弹出层内容
   */
  popup?: React.ReactNode;
  /**
   * 是否禁用，如果为true，则不响应onClick
   */
  disabled?: boolean;
}

export interface ContentProps {
  /**
   * 样式类型
   */
  styleType?: 'primary' | 'secondary';
  /** @ignore */
  children?: React.ReactNode;
}

// Popover
export interface PopupAlign {
  points?: string[];
  overflow?: Record<string,any>;
  offset?: number[];
  targetOffset?:number[]
}

export type PopoverPlacement =
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom';

    export interface GetPopupContainer {
      (): HTMLElement;
  }

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
  alignPoint?: boolean;
  placement?: PopoverPlacement;
  align?: PopupAlign;
  stretch?: 'with' | 'minWidth' | 'height' | 'minHeight';
  popup?: React.ReactNode;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  zIndex?: number;
  getPopupContainer?: GetPopupContainer;
  forwardPopupContainer?: boolean | GetPopupContainer;
  prefixCls?: string;
  animation?: 'fade' | 'zoom' | 'bounce' | 'slide-up';
}

export interface HovertipProps extends PopoverProps {
  /**
   * 弹出层内容
   */
  popup?: React.ReactNode;
  /**
   * 内容部分样式
   */
  contentStyle?: object;
  /**
   * 提示部分样式
   */
  tipStyle?: object;
  children?: React.ReactNode;
}
export interface IcontipProps extends PopoverProps {
  /**
   * 图标，传入string时为图标类型，也可直接传入图标组件
   */
  icon?: React.ReactNode;
}


export interface ListProps {
  /**
   * 布局类型
   */
  styleType?:'list' | 'custom',
  /** @ignore */
  className?: string;
  /**
   * 间距 [左右，上下]
   */
  spacing?: [number,number],
  /**
   * 列表数据
   */
  dataSource: (Omit<ConfigInfoProps,'col' | 'noBorder'> | React.ReactNode)[] ;
  /**
   * 多列展示的列数, styleType是list时自动按dataSource.length计算
   */
  col?: number;
}