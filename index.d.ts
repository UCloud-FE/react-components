declare module '@ucloud-fe/react-components' {
	import * as React from 'react';

  	/** Base */
  	// Icon
  	interface IconProps {
		type?: string;
		spin?: boolean;
		className?: string;
		onClick?: React.MouseEventHandler<HTMLAnchorElement>;
		style?: React.CSSProperties;
  	}
  	export class Icon extends React.PureComponent<IconProps, {}> {}

    // Button
    type Size = 'sm'|'md'|'lg'
    type ButtonType = 'primary'|'border'|'border-gray'
    type ButtonShape = 'circle'

    interface ButtonProps {
        styleType?: ButtonType;
        size?: Size;
        shape?: ButtonShape;
        loading?: boolean;
        icon?: string | React.ReactNode;
        type?: string;
        className?: string;
        onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
        disabled?: boolean;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }
    export class Button extends React.PureComponent<ButtonProps, {}> {}



    /** Layout */  
    // Row
    interface RowProps {
        type?: 'flex';
        align?: 'top' | 'middle' | 'bottom';
        justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
        gutter?: number;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }
    export class Row extends React.Component<RowProps, {}> {}

    // Col
    interface ColProps {
        span?: number;
        offset?: number;
        pull?: number;
        push?: number;
        order?: number;
        gutter?: number;
        className?: string;
        children?: React.ReactNode;
    }
    export class Col extends React.Component<ColProps, {}> {}

    // Grid
    interface GridProps {
        Row:typeof Row;
        Col:typeof Col;
    }
    export const Grid:GridProps;

    // Tabs Pane
    type StyleType = 'default' | 'ink';
    type TabBarPosition = 'left' | 'right' | 'top' | 'bottom';

    interface TabsProps {
        activeKey?: string;
        defaultActiveKey?: string;
        onChange?: Function;
        tabBarPosition?: TabBarPosition;
        styleType?: StyleType;
        destroyInactiveTabPane?: boolean;
    }

    interface PaneProps {
        tab?: React.ReactNode;
        forceRender?: boolean;
        disabled?: boolean;
    }
    export class Pane extends React.Component<PaneProps, {}> {}

    export class Tabs extends React.Component<TabsProps, {}> {
        static styleType: StyleType;
        static tabBarPosition: TabBarPosition;
        static Pane: typeof Pane;
    }

    // Collapse Panel
    interface CollapseProps {
        openKeys?: string[];
        defaultOpenKeys?: string[];
        multiple?: boolean;
        selectable?: boolean;
        onChange?: Function;
    }

    interface PanelProps {
        title: React.ReactNode | Function
        children: React.ReactNode;
        onChange: Function;
        open: boolean;
        defaultOpen: boolean;
        forceRender: boolean;        
        disabled: boolean;
        panelKey: any;
        titlePosition: 'top'|'bottom';
        multiple: boolean;
    }
    class Panel extends React.Component<PanelProps, {}>{}

    export class Collapse extends React.Component<CollapseProps, {}> {
        static Panel: typeof Panel;
    }

    // Form FormItem
    interface LabelCol {
        span?: number;
        offset?: number;
        pull?: number;
        push?: number;
    }

    interface FormProps {
        label?: React.ReactNode;
        labelCol?: LabelCol;
        controllerCol?: LabelCol;
    }

    interface FormItemProps {
        label?: React.ReactNode;
        children?: React.ReactNode;
        labelCol?: LabelCol;
        controllerCol?: LabelCol;
        className?: string;
    }
    class FormItem extends React.Component<FormItemProps, {}>{}

    export class Form extends React.Component<FormProps, {}> {
        static Item: typeof FormItem;
    }

    // Card
    interface CardChildProps  extends React.HTMLAttributes<HTMLDivElement>{
        children?: React.ReactNode;
    }

    interface HeaderProps extends CardChildProps {
        comment?: React.ReactNode;
    }
    class CardHeader extends React.Component<HeaderProps, {}> {}

    class CardContent extends React.Component<CardChildProps, {}> {}

    class CardFooter extends React.Component<CardChildProps, {}> {}

    class CardAction extends React.Component<CardChildProps, {}> {}

    interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

    export class Card extends React.PureComponent<CardProps, {}>{
        static Header: typeof CardHeader;
        static Content: typeof CardContent;
        static Footer: typeof CardFooter;
        static Action: typeof CardAction;
    }

    // Compact
    interface SharedProps {
        size?: Size;
        className?: string;
        style?: React.CSSProperties;
    }
    interface CompactProps {
        sharedProps?: SharedProps;
        children?: React.ReactNode;
    }
    export class Compact extends React.Component<CompactProps, {}> {}

    /** Interactive */
    // Input
    interface InputProps {
        id?: string;
        icon?: string | React.ReactNode;
        size?: Size;
        disabled?: boolean;
        value?: string | number | boolean;
        placeholder?: string;
        onChange?: Function;
        className?: string;
        style?: React.CSSProperties;
    }
    export class Input extends React.Component<InputProps, {}> {
        static Search: typeof SearchInput;
    }

    // NumberInput
    interface NumberInputProps {
        value?: number | string;
        defaultValue?: number | string;
        onChange?: Function;
        onNumberChange?: Function;
        disabled?: boolean;
        readOnly?: boolean;
        max?: number;
        min?: number;
        step?: number | string;
        upHandler?: React.ReactNode;
        downHandler?: React.ReactNode;
        formatter?: Function;
        parser?: Function;
        precision?: number;
        styleType?: 'default' | 'split' | 'pagination';
        size?: Size;
        suffix?: React.ReactNode;
        InputStyle?: React.CSSProperties;
        computeValidNumber?: Function;
        hideHandler?: boolean;
    }
    export class NumberInput extends React.Component<NumberInputProps, {}> {}

    // Textarea
    interface TextareaProps {
        disabled?: boolean;
        placeholder?: string;
    }
    export class Textarea extends React.Component<TextareaProps, {}> {}

    // Select
    interface SelectOptionProps {
        label?: string;
        value?: string;
    }
    
    interface SelectProps {
        value?: string | number | string[] | number[];
        defaultValue?: string | number | string[] | number[];
        placeholder?: string;
        onChange?: Function;
        options?: SelectOptionProps[];
        multiple?: boolean;
        showSelectAll?: boolean;
        disabled?: boolean;
        renderContent?: Function;
        renderSelector?: Function;
        search?: any;
        size?: Size;
        popover?: any;
        style?: React.CSSProperties;
        className?: string;
    }
    
    export class SelectOption extends React.Component<any, any> {}

    interface SelectGroupProps {
        title?: React.ReactNode;
        groupKey?: any;
    }

    export class SelectGroup extends React.Component<SelectGroupProps, {}> {}

    export class Select extends React.Component<SelectProps, {}> {
        static Option: typeof SelectOption;
        static Group: typeof SelectGroup;
    }

    // Checkbox
    interface CheckboxProps {
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
        value?: string | number;
        size?: Size;
        styleType?: 'default' | 'card';
        onChange?: Function;
    }

    interface CheckboxGroupProps {
        value?: Array<string | number>;
        defaultValue?: Array<string | number>;
        onChange?: Function;
        options?: Array<string | number>;
        disabled?: boolean;
        size?: Size;
    }
    export class CheckboxGroup extends React.Component<CheckboxGroupProps, {}> {}

    export class Checkbox extends React.Component<CheckboxProps, {}> {
        static Group: typeof CheckboxGroup;
    }

    // Radio
    interface RadioProps {
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
        onChange?: Function;
        value?: string | number;
        styleType?: 'default' | 'button' | 'tag';
        size?: Size;
    }

    interface RadioGroupProps {
        value?: Array<string | number>;
        defaultValue?: Array<string | number>;
        onChange?: Function;
        options?: Array<string | number>;
        disabled?: boolean;
        size?: Size;
        styleType?: 'default' | 'button' | 'tag';
    }
    export class RadioGroup extends React.Component<RadioGroupProps, {}> {}

    export class Radio extends React.Component<RadioProps, {}> {
        static Group: typeof RadioGroup;
    }

    // Switch
    interface SwitchProps {
        checked?: boolean;
        defaultChecked?: boolean;
        onChange?: Function;
        disabled?: boolean;
        size?: Size;
        onText?: React.ReactNode;
        offText?: React.ReactNode;
    }
    export class Switch extends React.Component<SwitchProps, {}> {}

    // Slider
    interface SliderMarkOption {
        label?: string;
        step?: number;
        ratio?: number;
    }
    interface SliderMark {
        [propName: number]: SliderMarkOption;
    }
    interface SliderProps {
        value?: number;
        defaultValue?: number;
        onChange?: Function;
        onLastChange?: Function;
        disabled?: boolean;
        min?: number;
        max?: number;
        step?: number | string;
        marks?: SliderMark;
        sliderClassName?: string;
        numberInput?: NumberInputProps;
        isSensitive?: boolean;
        numberInputTipFormatter?: Function;
        tipFormatter?: Function;
        size?: Size;
    }
    export class Slider extends React.Component<SliderProps, {}> {}

    // Upload

    interface UploadProps {
        onChange?: Function;
        onAdd?: Function;
        onRemove?: Function;
        onError?: Function;
        onPreview?: Function;
        handleUpload?: Function;
        disabled?: boolean;
        multiple?: boolean;
        accept?: string;
        maxSize?: number;
        maxCount?: number;
        selector?: React.ReactNode;
        listType?: 'none' | 'text';
        defaultFileList?: File[];
        fileList?: File[];
        style?: React.CSSProperties;
    }
    export class Upload extends React.Component<UploadProps, {}> {}

    // Calendar
    
    interface CalendarRule {
        range?: Array<string | Date>;
        custom?: Function;
    }
    interface CalendarProps {
        value?: Date;
        defaultValue?: Date;
        onSelect?: Function;
        onChange?: Function;
        rules?: CalendarRule;
    }
    export class Calendar extends React.Component<CalendarProps, {}> {}

    interface DatePickerDisplayOption {
        format?: string;
        display?: boolean;
    }
    interface DatePickerDisplay {
        date?: boolean | DatePickerDisplayOption;
        hour?: boolean | DatePickerDisplayOption;
        minute?: boolean | DatePickerDisplayOption;
        second?: boolean | DatePickerDisplayOption;
    }
    interface DatePickerProps {
        value?: Date;
        defaultValue?: Date;
        onChange?: Function;
        rules?: Array<string | Date>;
        size?: Size;
        display?: DatePickerDisplay;
        disabled?: boolean;
        zIndex?: number;
        style?: React.CSSProperties;
    }

    interface MonthDisplayOption {
        format?: string;
    }
    interface MonthDisplay {
        date?: MonthDisplayOption;
    }
    interface MonthProps {
        value?: Date | number;
        defaultValue?: Date | number;
        onChange?: Function;
        rules?: CalendarRule;
        display?: MonthDisplay;
        size?: Size;
        disabled?: boolean;
        zIndex?: number;
    }
    export class Month extends React.Component<MonthProps, {}> {}

    interface RangeProps {
        value?: Array<string | Date>;
        defaultValue?: Array<string | Date>;
        onChange?: Function;
        onInitialChange?: Function;
        options?: Array<string>;
        defaultOption?: string;
        onOptionChange?: Function;
        hideOptions?: boolean;
        display?: DatePickerDisplay;
        rules?: CalendarRule;
        type?: 'date' | 'month';
        size?: Size;
        disabled?: boolean;
        zIndex?: number;
    }
    export class Range extends React.Component<RangeProps, {}> {}

    // DatePicker
    export class DatePicker extends React.Component<DatePickerProps, {}> {
        static Month: typeof Month;
        static Range: typeof Range;
    }

    interface CollapseProps {
        openKeys?: string[];
        defaultOpenKeys?: string[];
        multiple?: boolean;
        onChange?: Function;
    }

    // Menu
    interface MenuProps {
        selectedKeys?: Array<string>;
        defaultSelectedKeys?: Array<string>;
        onChange?: Function;
        multiple?: boolean;
        selectable?: boolean;
        collapse?: CollapseProps;
        showSelectAll?: boolean;
        theme?: string;
        themeType?: string;
        className?: string;
    }

    interface MenuItemProps {
        itemKey?:string;
        key?:string;
        styleType?: 'collapse' | 'popover';
        style?:React.CSSProperties;
    }
    export class MenuItem extends React.Component<MenuItemProps, {}> {}

    interface MenuSubMenuProps {
        disabled?:boolean;
        key?:string;
        subMenuKey?:string;
        title:string | React.ReactNode;
        children?:Array<MenuItem | MenuSubMenu>;
        onTitleClick?:Function;
        style?:React.CSSProperties;
        styleType?: 'collapse' | 'popover';
    }
    export class MenuSubMenu extends React.Component<MenuSubMenuProps, {}> {}

    export class Menu extends React.Component<MenuProps, {}> {
        static Item: typeof MenuItem;
        static SubMenu: typeof MenuSubMenu;
    }

    // ZForm
    interface ZFormProps {
        form?: typeof ZForm.formShape;
        style?: React.CSSProperties;
    }
    export class ZForm extends React.Component<ZFormProps, {}> {
        static formDecorator?: any;
        static controllerDecorator?: any;
        static formShape?: any
    }

    /** display */
    // Notice
    interface NoticeProps {
        closable?: boolean;
        icon?: string | React.ReactNode;
        onClose?: Function;
        styleType?: 'default' | 'suceess' | 'warning' | 'error';
        action?: React.ReactNode;
        style?: React.CSSProperties;
    }
    export class Notice extends React.Component<NoticeProps, {}> {}

    // Badge
    type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    interface BadgeProps {
        value?: React.ReactNode;
        maxValue?: number;
        dot?: boolean;
        placement?: Placement;
        hideWhenZero?: boolean;
        badgeStyle?: React.CSSProperties;
    }
    export class Badge extends React.Component<BadgeProps, {}> {}

    // Popover
    interface PopupAlign {
        points: string[];
        offset: number[]
    }
    interface PopoverProps {
        visible?: boolean;
        defaultVisible?: boolean;
        onVisibleChange?: Function;
        trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
        alignPoint?: boolean;
        placement?: Placement;
        align?: PopupAlign;
        stretch?: 'with' | 'minWidth' | 'height' | 'minHeight';
        popup?: React.ReactNode;
        popupClassName?: string;
        popupStyle?: React.CSSProperties;
        zIndex?: number;
        getPopupContainer?: Function;
        animation?: 'fade' | 'zoom' | 'bounce' | 'slide-up';
    }
    export class Popover extends React.Component<PopoverProps, {}> {}

    // Tooltip
    type TooltipTheme = 'light' | 'dark';
    type PlacementInfo = 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom';

    interface TooltipProps {
        popup?: React.ReactNode;
        style?: React.CSSProperties;
        onClick?: React.MouseEventHandler<HTMLAnchorElement>;
        theme?: TooltipTheme;
        placement?: PlacementInfo;
        getPopupContainer?: Function;
    }
    export class Tooltip extends React.Component<TooltipProps, {}> {
        static Theme: TooltipTheme[]
    }

    // Modal
    interface ModalProps {
        title?: string | React.ReactNode;
        footer?: React.ReactNode;
        visible?: boolean;
        size?: Size;
        zIndex?: number;
        closable?: boolean;
        mask?: boolean;
        maskClosable?: boolean;
        keyboard?: boolean;
        onClose?: Function;
        onOk?: Function;
        afterClose?: Function;
        destroyOnClose?: boolean;
        maskAnimation?: string;
        animation?: string;
        className?: string;
        wrapClassName?: string;
        style?: React.CSSProperties;
        bodyStyle?: React.CSSProperties;
        maskStyle?: React.CSSProperties;
    }
    export class Modal extends React.Component<ModalProps, {}> {
        static confirm : Function;
        static alert : Function;
        static info : Function;
    }

    // Table
    interface Scroll {
        x?: number;
        y?: number;
    }
    type RowKey = () => string;

    interface Selection {
        key?: string;
        text?: string | React.ReactNode;
        onSelect?: Function;
    }
    interface RowSelection {
        columnWidth?: string | number;
        columnTitle?: string | React.ReactNode;
        fixed?: boolean;
        getCheckboxProps?: Function;
        hideDefaultSelections?: boolean;
        selectedRowKeys?: string[];
        selections?: Selection[] | boolean;
        type?: 'checkbox' | 'radio';
        onChange?: Function;
        onSelect?: Function;
        onSelectAll?: Function;
        onSelectInvert?: Function;
    }
    interface TableProps {
        className?: string;
        rowClassName?: string;
        pagination?: null | PaginationProps;
        dataSource?: Object[];
        columns?: Object[];
        defaultColumnConfig?: Object[];
        onColumnConfigChange?: Function;
        expandedRowRender?: Function;
        expandIconAsCell?: boolean;
        hideExpandIcon?: boolean;
        defaultExpandedRowKeys?: string[];
        expandedRowKeys?: string[];
        defaultExpandAllRows?: boolean;
        onExpandedRowsChange?: Function;
        onExpand?: Function;
        onRow?: Function;
        onHeaderRow?: Function;
        rowSelection?: RowSelection;
        showHeader?: boolean;
        title?: Function;
        footer?: Function;
        emptyContent?: React.ReactNode;
        handleSearch?: Function;
        scroll?: Scroll;
        rowKey?: string | RowKey;
        contextMenu?: Function;
    }

    interface SearchInputProps extends InputProps{
        onSearch?: Function;
    }
    export class SearchInput extends React.Component<SearchInputProps, {}> {}

    export class Table extends React.Component<TableProps, {}> {
        static SearchInput: typeof SearchInput;
        static ColumnConfigButton: typeof Button;
    }

    // Progress
    interface ProgressProps {
        percent?: number;
        format?: Function;
    }
    export class Progress extends React.Component<ProgressProps, {}> {}

    // Loading
    interface LoadingProps {
        loading?: boolean;
        indicator?: React.ReactNode;
        tip?: React.ReactNode;
        maskStyle?: React.CSSProperties;
        maskClassName?: string;
    }
    export default class Loading extends React.Component<LoadingProps, {}> {}

    /** other */
    // Pagination
    interface PaginationProps {
        current?: number;
        defaultCurrent?: number;
        total?: number;
        pageSize?: number;
        defaultPageSize?: number;
        onChange?: Function;
        onAdvise?: Function;
        showSizeChanger?: boolean;
        showLessItems?: boolean;
        onPageSizeChange?: Function;
        showPrevNextJumpers?: boolean;
        showQuickJumper?: boolean | Object;
        showTitle?: boolean;
        pageSizeOptions?: number[];
        simple?: boolean;
        size?: Size;
    }
    export class Pagination extends React.Component<PaginationProps, {}> {}

    // Message
    export class Message extends React.Component<{}, {}> {
        static message: Function;
        static warning: Function;
        static success: Function;
        static error: Function;
    }

    // LocaleProvider
    interface LocaleProviderProps {
        children?: React.ReactNode;
        locale?: any;
    }
    export class LocaleProvider extends React.Component<LocaleProviderProps, {}> {}

    // ThemeProvider
    interface ThemeProviderProps {
        theme?: any;
    }
    export class ThemeProvider extends React.Component<ThemeProviderProps, {}> {}
}
