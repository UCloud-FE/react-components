import type {
    CSSProperties,
    ReactNode,
    Component,
    PureComponent,
    HTMLAttributes,
} from "react";
import { Moment, MomentInput } from "moment";

// 忽略 T 对象中 键在 K 中的所有的属性
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

// base type
export type SizeType = "sm" | "md" | "lg";

// Icon
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    type: string;
    spin?: boolean;
    prefix?: string;
}
export declare class Icon extends PureComponent<IconProps> {}

// Button
export type ButtonStyleType = "primary" | "border" | "border-gray";
export type ButtonShape = "circle" | "square";
export interface ButtonProps extends HTMLAttributes<HTMLSpanElement> {
    styleType?: ButtonStyleType;
    size?: SizeType;
    shape?: ButtonShape;
    loading?: boolean;
    icon?: ReactNode;
}
export declare class Button extends PureComponent<ButtonProps> {}

// Box
type BoxSpacing = "sm" | "md" | "lg" | number | string;
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    spacing?: BoxSpacing | [BoxSpacing, BoxSpacing?];
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
    alignContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "stretch";
    padding?: BoxSpacing;
    width?: string;
    height?: string;
    span?: number;
    order?: number;
    flex?: string;
    cleanMargin?: boolean;
}
export declare class Box extends PureComponent<BoxProps> {}

// Row
export type RowType = "flex";
export type RowAlign = "top" | "middle" | "bottom";
export type RowJustify =
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between";
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    type?: RowType;
    align?: RowAlign;
    justify?: RowJustify;
    gutter?: number;
}
export declare class Row extends Component<RowProps> {}

// Col
export interface ColProps extends HTMLAttributes<HTMLDivElement> {
    span?: number;
    offset?: number;
    pull?: number;
    push?: number;
    order?: number;
}
export declare class Col extends Component<ColProps> {}

// Grid
export interface GridType {
    Row: Row;
    Col: Col;
}
export declare const Grid: GridType;

// Combine
export interface CombineProps extends HTMLAttributes<HTMLDivElement> {
    sharedProps?: CompactSharedProps;
    spacing?: "compact" | "smart" | "sm" | "md" | "lg" | string;
}
export declare class Combine extends PureComponent<CombineProps> {}

// Compact
export interface CompactSharedProps {
    [key: string]: any;
}
export interface CompactProps extends HTMLAttributes<HTMLDivElement> {
    sharedProps?: CompactSharedProps;
}
export declare class Compact extends Component<CompactProps> {}

// Input
export type InputProps = Override<HTMLAttributes<HTMLInputElement>, {
    icon?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    size?: SizeType;
    status?: "default" | "error";
}>
interface SearchInputProps extends InputProps {
    onSearch?: (value: string) => void;
}
declare class SearchInput extends PureComponent<SearchInputProps> {}
export declare class Input extends PureComponent<InputProps> {
    static Search: typeof SearchInput;
}

// NumberInput
export type NumberInputStyleType = "default" | "split" | "pagination";
export type NumberInputProps = Override<HTMLAttributes<HTMLInputElement>, {
    value?: number | string;
    defaultValue?: number | string;
    onChange?: (value: number | string) => void;
    onNumberChange?: (value: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    max?: number;
    min?: number;
    step?: number | string;
    upHandler?: ReactNode;
    downHandler?: ReactNode;
    formatter?: (value: number) => number | string;
    parser?: (value: string) => string;
    precision?: number;
    styleType?: NumberInputStyleType;
    size?: SizeType;
    suffix?: ReactNode;
    inputStyle?: CSSProperties;
    computeValidNumber?: (value: number) => number;
    hideHandler?: boolean;
}>
export declare class NumberInput extends Component<NumberInputProps> {}

// Textarea
export type TextareaProps = HTMLAttributes<HTMLTextAreaElement>;
export declare class Textarea extends Component<TextareaProps> {}

// Select
interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
    value?: any;
    disabled?: boolean;
}
interface InterfaceSelectOption extends SelectOptionProps {
    label?: ReactNode;
}
interface SelectSearch {
    handleSearch(searchValue: string, value: any, item: InterfaceSelectOption): boolean;
}
interface SelectExtraProps extends HTMLAttributes<HTMLDivElement> {
    autoHidePopup?: boolean;
}
interface SelectGroupProps {
    title?: ReactNode;
    groupKey?: any;
}
interface SelectCustomStyle {
    optionListMaxHeight?: number;
    [key: string]: any
}
interface SelectShapeExtra extends SelectExtraProps {
    content?: ReactNode;
}
interface SelectRenderPopupOptions {
    handleVisible: (open: boolean) => void;
    onChange: (value: any) => void;
    value: any;
    multiple: boolean;
    extra: ReactNode | SelectShapeExtra;
    search: true | SelectSearch;
    children: ReactNode;
}
export type SelectOptions = InterfaceSelectOption[];
export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
    value?: any;
    defaultValue?: any;
    placeholder?: string;
    onChange?: (value: any) => void;
    options?: SelectOptions;
    extra?: ReactNode | SelectShapeExtra;
    multiple?: boolean;
    showSelectAll?: boolean;
    disabled?: boolean;
    renderContent?: (value: any, valueChild: any) => ReactNode;
    renderSelector?: (node: ReactNode, visible: boolean) => ReactNode;
    renderPopup?: (options: SelectRenderPopupOptions) => ReactNode;
    search?: true | SelectSearch;
    size?: SizeType;
    popoverProps?: PopoverProps;
    customStyle?: SelectCustomStyle;
    emptyContent?: ReactNode;
}
declare class SelectOption extends PureComponent<SelectOptionProps> {}
declare class SelectGroup extends Component<SelectGroupProps> {}
declare class SelectExtra extends PureComponent<SelectExtraProps> {}
export declare class Select extends Component<SelectProps> {
    static Option: typeof SelectOption;
    static Group: typeof SelectGroup;
    static Extra: typeof SelectExtra;
}

// Checkbox
export type CheckboxStyleType = "default" | "card";
export type CheckboxProps = Override<HTMLAttributes<HTMLSpanElement>, {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    indeterminate?: boolean;
    value?: any;
    size?: SizeType;
    styleType?: CheckboxStyleType;
    title?: ReactNode;
    disabledLabel?: ReactNode;
}>
export type CheckboxOptions = SelectOptions;
export interface CheckboxGroupProps {
    value?: any[];
    defaultValue?: any[];
    onChange?: (value: any[]) => void;
    options?: CheckboxOptions;
    disabled?: boolean;
    size?: SizeType;
    styleType?: CheckboxStyleType;
}
export declare class CheckboxGroup extends Component<CheckboxGroupProps> {}
export declare class Checkbox extends Component<CheckboxProps> {
    static Group: typeof CheckboxGroup;
}

// Radio
export type RadioStyleType = "default" | "button" | "tag" | "card" | "text";
export interface RadioProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    value?: any;
    styleType?: RadioStyleType;
    size?: SizeType;
    title?: ReactNode;
    disabledLabel?: ReactNode;
}
interface RadioOption extends RadioProps {
    label?: ReactNode;
}
export type RadioOptions = RadioGroup[];
export interface RadioGroupProps {
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
    options?: RadioOptions;
    disabled?: boolean;
    size?: SizeType;
    styleType?: RadioStyleType;
}
declare class RadioGroup extends Component<RadioGroupProps> {}
export declare class Radio extends Component<RadioProps> {
    static Group: typeof RadioGroup;
}

// Switch
export type SwitchProps = Override<HTMLAttributes<HTMLDivElement>, {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: SizeType;
    onText?: ReactNode;
    offText?: ReactNode;
}>
export declare class Switch extends Component<SwitchProps> {}

// Slider
export interface SliderMark {
    label?: string;
    step?: number;
    ratio?: number;
}
export interface SliderMarks {
    [key: string]: SliderMark
}
interface NumberInputTipFormatterOption {
    currentValue: number;
    inputValue: number;
    isSensitive: boolean;
    locale: any;
}
export type SliderProps = Override<HTMLAttributes<HTMLDivElement>, {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onLastChange?: (value: number) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number | string;
    marks?: SliderMarks;
    className?: string;
    style?: CSSProperties;
    sliderClassName?: string;
    numberInput?: NumberInputProps;
    isSensitive?: boolean;
    numberInputTipFormatter?: (
        option: NumberInputTipFormatterOption
    ) => ReactNode;
    tipFormatter?: (value: number) => ReactNode;
    size?: SizeType;
}>
export declare class Slider extends Component<SliderProps> {}

// Upload
export interface UploadFile {
    name: string;
    uid: string;
    size: number;
    type: string;
    status?: "uploading" | "success" | "error";
    lastModified?: number;
    lastModifiedDate?: Date;
}
interface UpdateProgress {
    (progress: number): void;
}
type UploadListTypeOption<T> = [T, "none" | "dropzone" | "thumbnail"];
export type UploadListType = "none" | "text" | "list" | "dropzone" | UploadListTypeOption<"list"> | UploadListTypeOption<"dropzone">;
export interface UploadCustomStyle {
    listMaxHeight?: string;
    [key: string]: any;
}
export interface UploadProps {
    onChange?: (fileList: UploadFile[]) => void;
    onAdd?: (fileList: UploadFile[]) => boolean;
    onRemove?: (file: UploadFile, index: number) => boolean;
    getRemovableOfItem?: (file: UploadFile) => boolean;
    onError?: (error: Error) => void;
    onPreview?: (file: UploadFile, index: number) => void;
    getPreviewableOfItem?: (file: UploadFile) => boolean;
    handleUpload?: <T = any>(file: UploadFile, updateProgress: UpdateProgress) => Promise<any>;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxCount?: number;
    selector?: ReactNode;
    listType?: UploadListType;
    defaultFileList?: File[];
    fileList?: File[];
    style?: CSSProperties;
    customStyle?: UploadCustomStyle;
}
export declare class Upload extends Component<UploadProps> {}

// Calendar
type DateValue = Date | Moment | number;
export interface CalendarRule {
    range?: [DateValue?, DateValue?];
    custom?: (current: DateValue, value: DateValue) => boolean;
}
interface DateChangeEvent {
    (value: DateValue): void;
}
export interface CalendarProps {
    value?: DateValue;
    defaultValue?: DateValue;
    onSelect?: DateChangeEvent;
    onChange?: DateChangeEvent;
    rules?: CalendarRule;
}
export declare class Calendar extends Component<CalendarProps> {}

// DatePicker
interface DatePickerDisplayOption {
    format?: string;
    display?: boolean;
}
export interface DatePickerDisplay {
    date?: boolean | DatePickerDisplayOption;
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
}
export type DatePickerProps = Override<HTMLAttributes<HTMLDivElement>, {
    value?: DateValue;
    defaultValue?: DateValue;
    onChange?: DateChangeEvent;
    rules?: CalendarRule;
    size?: SizeType;
    display?: DatePickerDisplay;
    disabled?: boolean;
    zIndex?: number;
    getCalendarContainer?: () => ReactNode;
}>
interface MonthDisplayOption {
    format?: string;
}
interface MonthDisplay {
    date?: MonthDisplayOption;
}
export type MonthProps = Override<HTMLAttributes<HTMLDivElement>, {
    value?: DateValue;
    defaultValue?: DateValue;
    onChange?: DateChangeEvent;
    rules?: CalendarRule;
    display?: MonthDisplay;
    size?: SizeType;
    disabled?: boolean;
    zIndex?: number;
    getCalendarContainer?: () => ReactNode;
}>
declare class DatePickerMonth extends Component<MonthProps> {}
type DateRangeValue = DateValue[];
interface DateRangeChangeEvent {
    (value: DateRangeValue): void;
}
export interface DatePickerRangeSelectOption extends SelectOptionProps {
    label?: ReactNode;
    range?: {
        start?: MomentInput;
        end?: MomentInput;
    }
}
export type RangeProps = Override<HTMLAttributes<HTMLDivElement>,  {
    value?: DateRangeValue;
    defaultValue?: DateRangeValue;
    onChange?: DateRangeChangeEvent;
    onInitialChange?: DateRangeChangeEvent;
    options?: DatePickerRangeSelectOption[];
    option?: string | number;
    defaultOption?: string | number;
    onOptionChange?: (value: string | number) => void;
    hideOptions?: boolean;
    display?: DatePickerDisplay;
    rules?: CalendarRule;
    type?: "date" | "month";
    size?: SizeType;
    disabled?: boolean;
    zIndex?: number;
    selectProps?: SelectProps;
    popoverProps?: PopoverProps;
    datePickerProps?: DatePickerProps;
    rangeTip?: ReactNode
}>
declare class DatePickerRange extends Component<RangeProps> {}
export declare class DatePicker extends Component<DatePickerProps> {
    static Month: typeof DatePickerMonth;
    static Range: typeof DatePickerRange;
}

// Menu
export interface MenuCustomStyle {
    maxHeight?: string;
    [key: string]: any;
}
export interface MenuProps {
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    onChange?: (selectedKeys: string[]) => void;
    multiple?: boolean;
    selectable?: boolean;
    collapse?: CollapseProps;
    showSelectAll?: boolean;
    block?: boolean;
    disabled?: boolean;
    customStyle?: MenuCustomStyle;
}
export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    itemKey?: number | string;
    disabled?: boolean;
    tooltip?: ReactNode | TooltipProps;
}
declare class MenuItem extends PureComponent<MenuItemProps> {}
export type MenuSubMenuProps = Override<HTMLAttributes<HTMLDivElement>, {
    title?: ReactNode;
    styleType?: "collapse" | "popover";
    subMenuKey?: string;
    disabled?: boolean;
}>
declare class MenuSubMenu extends Component<MenuSubMenuProps> {}
export declare class Menu extends Component<MenuProps> {
    static Item: typeof MenuItem;
    static SubMenu: typeof MenuSubMenu;
}

// ActionList
interface ActionItem extends ButtonProps {
    label?: ReactNode;
}
interface ActionListProps extends HTMLAttributes<HTMLUListElement> {
    actionList: ActionItem[];
    exposeCount?: number;
    size?: SizeType;
    buttonStyleType?: ButtonStyleType;
    smart?: boolean;
    popoverProps?: PopoverProps;
}
export declare class ActionList extends Component<ActionListProps> {}

// ZForm
export interface FormShape {
    getFieldsValue: Function,
    getFieldValue: Function,
    getFieldInstance: Function,
    setFieldsValue: Function,
    setFields: Function,
    setFieldsInitialValue: Function,
    getFieldDecorator: Function,
    getFieldProps: Function,
    getFieldsError: Function,
    getFieldError: Function,
    isFieldValidating: Function,
    isFieldsValidating: Function,
    isFieldsTouched: Function,
    isFieldTouched: Function,
    isSubmitting: Function,
    submit: Function,
    validateFields: Function,
    resetFields: Function
}
export interface ZFormProps extends FormProps {
    form?: FormShape;
}
interface ControllerDecoratorOptions {
    [key: string]: any
}
export declare class ZForm extends Component<ZFormProps> {
    static formDecorator?: (options: FormShape) => Function;
    static controllerDecorator?: (options: ControllerDecoratorOptions) => Function;
    static formShape?: FormShape;
}

// Transfer
interface TransferSource {
    title?: ReactNode;
    footer?: ReactNode;
    search?: boolean | SelectSearch;
    disabled?: boolean;
}
export type TransferProps = Override<HTMLAttributes<HTMLDivElement>, {
    dataSource?: any[];
    renderList?: (options: TransferProps) => ReactNode;
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    onChange?: (keys: string[]) => void;
    disabled?: boolean;
    search?: boolean | SelectSearch;
    source?: TransferSource;
    target?: TransferSource;
}>
export declare class Transfer extends PureComponent<TransferProps> {}

// TransferMenu
export interface TransferMenuProps extends TransferProps {
    renderItem?: (item: any) => ReactNode;
}

export declare class TransferMenu extends PureComponent<TransferMenuProps> {}

// TransferTable
export interface TransferTableProps extends TransferProps {
    columns?: Column[];
    tableProps?: TableProps;
}

export declare class TransferTable extends PureComponent<TransferTableProps> {}

// EditableTable
interface EditableTableAddition extends EditableListAddition {
    tip?: ReactNode;
}
interface EditableTableRowDeletion {
    onDelete?: (record: any) => void;
    getDisabledOfRow?: (record: any) => boolean;
    fixed?: boolean;
}
export interface EditableTableProps extends TableProps {
    addition?: boolean | EditableTableAddition;
    rowDeletion?: boolean | EditableTableRowDeletion;
}
export declare class EditableTable extends PureComponent<EditableTableProps> {}

// EditableList
interface EditableListAddition {
    onAdd?: Function;
    disabled?: boolean;
}
interface EditableListRowDeletion {
    onDelete?: (item: any) => void;
    getDisabledOfItem?: (item: any) => boolean;
}
interface EditableListGrid {
    itemCol?: ColProps;
    actionCol?: ColProps;
}
export interface EditableListProps {
    dataSource?: any[];
    renderItem?: (item: any) => ReactNode;
    grid?: EditableListGrid;
    size?: SizeType;
    addition?: boolean | EditableListAddition;
    itemDeletion?: boolean | EditableListRowDeletion;
}
export declare class EditableList extends PureComponent<EditableListProps> {}

// Notice
export type NoticeStyleType = "default" | "success" | "warning" | "error" | "disabled";
export interface NoticeProps extends HTMLAttributes<HTMLDivElement> {
    closable?: boolean;
    icon?: ReactNode;
    onClose?: Function;
    styleType?: NoticeStyleType;
    action?: ReactNode;
}
export declare class Notice extends Component<NoticeProps> {}

// Badge
export { default as Badge } from './lib/components/Badge';

// Tag
export type TagStyleType =
    "default"
    | "green"
    | "yellow"
    | "red"
    | "primary"
    | "purple"
    | "lightblue"
    | "blue"
    | "orange"
    | "cyan"
    | "success"
    | "warning"
    | "error"
    | "purple-fill"
    | "lightblue-fill"
    | "blue-fill"
    | "orange-fill"
    | "yellow-fill"
    | "cyan-fill"
    | string;
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    styleType?: TagStyleType;
    closable?: boolean;
    onClose?: () => void;
    icon?: "circle-fill" | "circle" | "loading" | "custom" | ReactNode;
    disabled?: boolean;
}
export declare class Tag extends PureComponent<TagProps> {}

// Popover
interface PopupAlign {
    points?: string[];
    offset?: number[];
}
export type PopoverPlacement =
    "topLeft"
    | "top"
    | "topRight"
    | "bottomLeft"
    | "bottom"
    | "bottomRight"
    | "leftTop"
    | "left"
    | "leftBottom"
    | "rightTop"
    | "right"
    | "rightBottom";
export interface GetPopupContainer {
    (): HTMLElement
}
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    trigger?: "hover" | "focus" | "click" | "contextMenu";
    alignPoint?: boolean;
    placement?: PopoverPlacement;
    align?: PopupAlign;
    stretch?: "with" | "minWidth" | "height" | "minHeight";
    popup?: ReactNode;
    popupClassName?: string;
    popupStyle?: CSSProperties;
    zIndex?: number;
    getPopupContainer?: GetPopupContainer;
    forwardPopupContainer?: boolean | GetPopupContainer;
    prefixCls?: string;
    animation?: "fade" | "zoom" | "bounce" | "slide-up";
}
export declare class Popover extends Component<PopoverProps> {}

// Tooltip
interface TooltipCustomStyle {
    popupWrapperPadding?: string;
    [key: string]: any;
}
export type TooltipTheme = "light" | "dark";
export interface TooltipProps extends PopoverProps {
    arrow?: boolean;
    theme?: TooltipTheme;
    customStyle?: TooltipCustomStyle;
}
export declare class Tooltip extends Component<TooltipProps> {}

// PopConfirm
interface PopConfirmProps extends TooltipProps {
    onConfirm?: () => void;
    onCancel?: () => void;
}
export declare class PopConfirm extends Component<PopConfirmProps> {}

// Modal
interface ModalGetFooter {
    (): ReactNode;
}
interface ModalCustomStyle {
    [key: string]: any;
}
export interface ModalProps {
    title?: ReactNode;
    footer?: ReactNode | ModalGetFooter;
    visible?: boolean;
    size?: SizeType;
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
    customStyle?: ModalCustomStyle;
    style?: CSSProperties;
    bodyStyle?: CSSProperties;
    maskStyle?: CSSProperties;
}
interface ModalConfirmHandle {
    destroy(): void;
}
interface ModalConfirm {
    (options: ModalProps): ModalConfirmHandle
}
export declare class Modal extends Component<ModalProps> {
    static confirm: ModalConfirm;
    static alert: ModalConfirm;
    static open: ModalConfirm;
}

// Drawer
export interface DrawerProps {
    visible?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    keyboard?: boolean;
    onClose?: () => void;
    destroyOnClose?: boolean;
    placement?: "left" | "right" | "top" | "bottom";
    width?: string | number;
    height?: string | number;
    getContainer?: () => ReactNode;
    zIndex?: number;
    closeHandler?: null | false;
}
export declare class Drawer extends Component<DrawerProps> {}

// Table
export interface TableScroll {
    x?: number;
    y?: number;
    onScroll?: (e: WheelEvent) => void;
}
type RowKey = () => string;
export interface RowSelection {
    fixed?: boolean;
    onChange?: Function;
    defaultSelectedRowKeys?: string[];
    selectedRowKeys?: string[];
    getDisabledOfRow?: (row: any) => boolean;
    multiple?: boolean;
    selectedTip?: boolean | "button";
    disabled?: boolean;
}
interface GetRowClassName {
    (): string
}
interface ColumnRender {
    (col: any, row?: any): ReactNode;
}
export interface Column {
    key?: string;
    className?: string;
    colSpan?: number;
    title?: ReactNode;
    dataIndex?: string;
    width?: string | number;
    fixed?: "left" | "right";
    render?: ColumnRender;
    onCellClick?: Function;
    onCell?: Function;
    onHeaderCell?: Function;
    [key: string]: any;
}
interface DefaultColumnConfig {
    [key: string]: string
}
interface TableRowBack extends HTMLTableDataCellElement {}
interface TableCustomStyle {
    outerPadding?: string;
    [key: string]: any;
}
interface TableDefaultOrder {
    key: string;
    state: "desc" | "asc"
}
export interface TableConditionChangeEventOrder {
    order: string;
    filter: string[];
    searchValue: string;
}
interface ConditionChangeEvent {
    (condition: TableConditionChangeEventOrder): void;
}
interface TableContextMenu {
    (row: object, hide: boolean): ReactNode;
}
export interface TableProps {
    pagination?: PaginationProps;
    dataSource?: any[];
    columns?: Column[];
    columnPlaceholder?: boolean;
    defaultColumnConfig?: DefaultColumnConfig;
    onColumnConfigChange?: (config: DefaultColumnConfig) => void;
    expandedRowRender?: (row: any) => ReactNode;
    expandIconAsCell?: boolean;
    expandIconColumnIndex?: number;
    hideExpandIcon?: boolean;
    defaultExpandedRowKeys?: string[];
    expandedRowKeys?: string[];
    defaultExpandAllRows?: boolean;
    onExpandedRowsChange?: (row: any) => void;
    onExpand?: Function;
    onRow?: (row: any, index: number) => TableRowBack;
    onHeaderRow?: (row: any, index: number) => TableRowBack;
    rowSelection?: RowSelection | true;
    onRowSelect?: (keys: string[]) => void;
    showHeader?: boolean;
    title?: () => ReactNode;
    footer?: () => ReactNode;
    emptyContent?: ReactNode;
    errorContent?: ReactNode;
    handleSearch?: (row: any, searchValue: string) => boolean;
    customStyle?: TableCustomStyle;
    scroll?: TableScroll;
    tableLayout?: "auto" |"fixed";
    rowKey?: string | RowKey;
    zebraCrossing?: boolean;
    components?: any;
    defaultOrder?: TableDefaultOrder;
    onConditionChange?: ConditionChangeEvent;
    doNotHandleCondition?: boolean;
    contextMenu?: TableContextMenu;
    className?: string;
    rowClassName?: string | GetRowClassName;
}
interface ColumnConfigButtonProps extends ButtonProps {
    modalProps?: ModalProps;
}
declare class TableColumnConfigButton extends Component<ColumnConfigButtonProps> {}
interface TableExpandedRowContentProps extends HTMLAttributes<HTMLDivElement> {}
declare class TableExpandedRowContent extends Component<TableExpandedRowContentProps> {}
export declare class Table extends Component<TableProps> {
    static ColumnConfigButton: typeof TableColumnConfigButton;
    static SearchInput: typeof SearchInput;
    static ActionList: typeof ActionList;
    static ExpandedRowContent: typeof TableExpandedRowContent;
    static getColumnConfigFromLocalStorage: typeof Function;
    static setColumnConfigToLocalStorage: typeof Function;
}

// Tabs
export type TabsStyleType = "default" | "ink";
export type TabBarPosition = "left" | "right" | "top" | "bottom";
export interface TabsProps {
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (key: string) => void;
    tabBarPosition?: TabBarPosition;
    styleType?: TabsStyleType;
    size?: SizeType;
    destroyInactiveTabPane?: boolean;
}
export interface TabsPaneProps {
    key: string;
    tab?: ReactNode;
    forceRender?: boolean;
    disabled?: boolean;
}
declare class TabPane extends Component<TabsPaneProps> {}
export declare class Tabs extends Component<TabsProps> {
    static Pane: typeof TabPane;
}

// Collapse
export type CollapseProps = Override<HTMLAttributes<HTMLDivElement>, {
    openKeys?: any[];
    defaultOpenKeys?: any[];
    multiple?: boolean;
    onChange?: (keys: any[]) => void;
}>
export interface CollapsePanelToggle {
    (open: boolean): void;
}
export interface CollapsePanelTitleFunction {
    (open: boolean, disabled: boolean, toggle: CollapsePanelToggle): ReactNode;
}
export interface CollapsePanelProps {
    title?: ReactNode | CollapsePanelTitleFunction;
    children?: ReactNode;
    onChange?: (open: boolean) => void;
    open?: boolean;
    defaultOpen?: boolean;
    forceRender?: boolean;
    disabled?: boolean;
    panelKey?: any;
    titlePosition?: "top" | "bottom";
    multiple?: boolean;
}
declare class CollapsePanel extends Component<CollapsePanelProps> {}
export declare class Collapse extends Component<CollapseProps> {
    static Panel: typeof CollapsePanel;
}

// Form
export interface FormLabelCol {
    span?: number;
    offset?: number;
    pull?: number;
    push?: number;
}
interface FormItemTip {
    icon?: ReactNode;
    content?: ReactNode;
}
export interface FormItemProps extends RowProps {
    label?: ReactNode;
    labelCol?: FormLabelCol;
    controllerCol?: FormLabelCol;
    help?: ReactNode;
    required?: boolean;
    status?: "default" | "success" | "warning" | "error" | "loading";
    shareStatus?: boolean;
    tip?: ReactNode | FormItemTip;
}
export type FormGroupProps = Override<HTMLAttributes<HTMLDivElement>, {
    title?: ReactNode;
    itemProps?: FormItemProps;
}>
export interface FormSubAreaProps extends HTMLAttributes<HTMLFormElement> {
    itemProps?: FormItemProps;
}
export interface FormProps extends HTMLAttributes<HTMLFormElement> {
    size?: "md" | "lg";
    itemProps?: FormItemProps;
}
declare class FormItem extends PureComponent<FormItemProps> {}
declare class FormGroup extends Component<FormGroupProps> {}
declare class FormSubArea extends PureComponent<FormSubAreaProps> {}
export declare class Form extends PureComponent<FormProps> {
    static Item: typeof FormItem;
    static Group: typeof FormGroup;
    static SubArea: typeof FormSubArea;
}

// Card
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    comment?: ReactNode;
}
declare class CardHeader extends Component<CardHeaderProps> {}
declare class CardContent extends Component<HTMLAttributes<HTMLDivElement>> {}
declare class CardFooter extends Component<HTMLAttributes<HTMLDivElement>> {}
declare class CardAction extends Component<HTMLAttributes<HTMLDivElement>> {}
export type CardProps = HTMLAttributes<HTMLDivElement>;
export declare class Card extends PureComponent<CardProps> {
    static Header: typeof CardHeader;
    static Content: typeof CardContent;
    static Footer: typeof CardFooter;
    static Action: typeof CardAction;
}

// Steps
interface Step {
    key?: string | number;
    step?: ReactNode;
    title?: ReactNode;
    remark?: ReactNode;
}
export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
    steps: Step[];
    current?: string | number;
    status?: "current" | "loading" | "error";
}
export declare class Steps extends Component<StepsProps> {}

// Message
export type MessageProps = Override<HTMLAttributes<HTMLDivElement>, {
    closable?: boolean;
    title?: ReactNode;
    footer?: ReactNode;
    styleType?: "default" | "success" | "loading" | "warning" | "error";
}>
interface MessageOption {
    zIndex?: number;
    style?: CSSProperties;
    className?: string;
}
interface MessageHandle {
    destroy(): void;
}
interface MessageMethod {
    (content: ReactNode, duration?: number, onClose?: () => void, option?: MessageOption): MessageHandle;
}
interface MessageConfig {
    duration?: number;
    getContainer?: () => ReactNode;
    top?: number;
}
export declare class Message extends Component<MessageProps> {
    static message: MessageMethod;
    static info: MessageMethod;
    static warning: MessageMethod;
    static success: MessageMethod;
    static error: MessageMethod;
    static loading: MessageMethod;
    static config: (config: MessageConfig) => void;
}

// Breadcrumb
interface BreadcrumbItemProps {
    disabled?: boolean;
    current?: boolean;
    noAction?: boolean;
    onClick?: Function;
}
declare class BreadcrumbItem extends Component<BreadcrumbItemProps> {}
interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
    separator?: ReactNode;
    styleType?: "block-hover" | "hover" | "active";
}
declare class BreadcrumbBackButton extends Component<ButtonProps> {}
export declare class Breadcrumb extends Component<BreadcrumbProps> {
    static Item: typeof BreadcrumbItem;
    static BackButton: typeof BreadcrumbBackButton;
}

// Pagination
interface GetPaginationShowTotal {
    (total: number): string;
}
interface ShowQuickJumperObject {
    goButton?: ReactNode;
}
export type PaginationProps = Override<HTMLAttributes<HTMLUListElement>, {
    current?: number;
    defaultCurrent?: number;
    total?: number;
    showTotal?: number | GetPaginationShowTotal;
    pageSize?: number;
    defaultPageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    onAdvise?: (newCurrent: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    showLessItems?: boolean;
    onPageSizeChange?: (current: number, pageSize: number) => void;
    showPrevNextJumpers?: boolean;
    showQuickJumper?: boolean | ShowQuickJumperObject;
    showTitle?: boolean;
    pageSizeOptions?: Array<number | string>;
    simple?: boolean;
    size?: SizeType;
}>
export declare class Pagination extends Component<PaginationProps> {}

// Progress
interface ProgressFormat {
    (percent: number): string;
}
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    percent?: number;
    color?: "success" | "warn" | "error" | string
    format?: null | ProgressFormat;
}
export declare class Progress extends Component<ProgressProps> {}

// Loading
export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    indicator?: ReactNode;
    tip?: ReactNode;
    maskStyle?: CSSProperties;
    maskClassName?: string;
}
export declare class Loading extends Component<LoadingProps> {}

// LocaleProvider
interface LocaleProviderProps {
    children?: ReactNode;
    locale?: any;
}
export declare class LocaleProvider extends Component<LocaleProviderProps> {}

// ThemeProvider
interface ThemeProviderProps {
    theme: any;
}
export declare class ThemeProvider extends Component<ThemeProviderProps> {}
