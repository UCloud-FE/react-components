import React from 'react';

export type TextSizeType =
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5'
  | 't6'
  | 't7'
  | 't8'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'text'
  | 'normal'
  | 'impact';

export type WeightSizeType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'text'
  | 'normal'
  | 'impact';

export type SizeType =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xlg'
  | 'xxlg'
  | 'xxxlg'
  | 'xxxxlg'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'normal'
  | 'impact'
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5'
  | 't6'
  | 't7'
  | 't8';

export type TransformType =
  | 'none'
  | 'lowercase'
  | 'uppercase'
  | 'capitalize'
  | 'initial';

export type LimitType =
  | 'light'
  | 'dark'
  | 'white'
  | 'primary'
  | 'remark'
  | 'success'
  | 'warning'
  | 'error';
export type ColorType =
  | 'light'
  | 'dark'
  | 'bright'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'remark';

export type ColorLimitType = {
  limit: Array<LimitType>;
  defaultColor: ColorType;
};

export type SizeLineHeightType = {
  size: TextSizeType;
  lineHeight: SizeType;
  fontWeight?: WeightSizeType;
};

export type SizeConfType =
  | {
      sizeMap: Record<SizeType, SizeLineHeightType>;
      defaultSize: SizeType;
      enableSizeProp?: boolean;
    }
  | boolean;
export interface TextProps {
  /**
   * 设置文本颜色
   */
  color?: ColorType;

  /**
   * 设置字号
   */
  size?: SizeType;
  /**
   * 设置行高
   */
  lineHeight?: SizeType;
   /**
   * 设置行高
   */
  fontWeight?: WeightSizeType;
  /**
   * 添加禁用样式
   */
  disabled?: boolean;
  /**
   * 添加删除线样式
   */
  deleted?: boolean;
  /**
   * 是否加粗
   */
  strong?: boolean;
  /**
   * 添加链接样式（建议与color配合使用，或直接使用Typograph.Link）
   */
  isLink?: boolean;
  /**
   * a 标签的 href 属性, isLink 为 true 时或者使用 Link 生效
   */
  href?: string;
  /**
   * target 属性, isLink 为 true 时或者使用 Link 生效
   */
  target?: string;
  /**
   * rel 属性, isLink 为 true 时或者使用 Link 生效
   */
  rel?: string;
  /**
   * 添加代码样式
   */
  isCode?: boolean;
  /**
   * 添加数字样式
   */
  isNum?: boolean;
  /**
   * 添加复制按钮
   */
  useCopy?: {
    /**
     * 复制的文本
     */
    text: string;
    /**
     * 开始的提示文本
     */
    moveTip?: string;
    /**
     * 点击后的提示文本
     */
    clickedTip?: string;
    /**
     * 复制按钮的图标大小
     */
    size?: number;
    /**
     * 复制按钮的图标颜色
     */
    color?: string;
  };
  /**
   * 设置大小写
   */
  transform?: TransformType;
  /**
   * 设置标签类型
   */
  component?: React.ElementType;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义盒子类名
   */
  containerClassName?: string;
  /**
   * 尾部插槽
   */
  suffix?: React.ReactNode;
   /**
   * 超出隐藏
   */
  ellipsis?:{
    /**按字符长度裁剪,仅可配合children 为纯文本时使用 */
    textProps:Omit<TextEllipsisProps,'text'>&{tipText?:string};
    /**按空间裁剪 */
    lineProps:Omit<LineEllipsisProps,'text'>&{tipText?:React.ReactNode} | boolean;
  }
  children?: React.ReactNode;
 
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  /**
   * 自定义样式
   * @description 用于覆盖默认样式
   */
  style?: React.CSSProperties;
}


export interface TextEllipsisProps {
   /**
   * 需要展示的文本
   */
   text: React.ReactNode;
   /**
   * 气泡展示的文本
   */
  tipText?:string
  /**
   * 展示文本的最大长度（含ellipsis）
   */
  maxLength: number;
  /**
   * 表示省略号的字符
   */
  ellipsis?: string;
  /**
   * 文本截取方向
   */
  direction?: 'fromStart' | 'fromEnd';
  /**
   * 截断长度的基准，默认根据字符判断，可选基于字母或单词，中文无区别
   */
  basedOn?: 'letters' | 'words';
  /**
   * 设置标签类型
   */
  component?: React.ElementType;
  /**
   * 是否在被截断后，通过鼠标移入浮层展示完整文本
   */
  showTip?: boolean;
  /**
   * 鼠标移入浮层的样式
   */
  tipStyle?: React.CSSProperties;
  /**
   * 鼠标移入浮层基于基础组件Popover的props
   */
  popoverProps?: object;
}

export interface LineEllipsisProps {
  /**
   * 需要展示的文本
   */
  text: React.ReactNode;
   /**
   * 气泡展示的文本
   */
  tipText?:React.ReactNode
  /**
   * 是否在被截断后，通过鼠标移入浮层展示完整文本
   */
  showTip?: boolean;
  /**
   * 鼠标移入浮层基于基础组件Popover的props
   */
  popoverProps?: object;
  /**
   * 鼠标移入浮层的样式
   */
  tipStyle?: React.CSSProperties;
  /**
   * 容器的宽度（用于更新是否限制宽度的判断）
   */
  containerWidth?: number;
  /**
   * 自定义类名
   */
  className?: string;
}

export type tipShape = {
  /**
   * 复制前的提示文案
   */
  moveTip: string | React.ReactNode;
  /**
   * 复制后的提示文案
   */
  clickedTip: string | React.ReactNode;
};

export interface CopyProps {
  /**
   * 复制内容
   */
  text: string;
  /**
   * 设置字号
   */
  size?: SizeType;
  /**
   * 设置行高
   */
  lineHeight?:SizeType;
  /**
   * 提示文案
   */
  tipContent?: tipShape;
  /** 样式类名 */
  className?: string;
  /**
   * 自定义PopTip
   */
  customPoptip?(child: React.ReactNode): React.ReactNode;
  /**
   * 复制的回掉函数
   */
  handleCopy?(): void;
  /**
   * 复制后的回掉函数
   */
  handleCopied?(): void;
  /**
   * @ignore
   */
  copy?(str:string): void;
}
