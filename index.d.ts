import type {
    CSSProperties,
    PureComponent,
    ReactNode,
    Component,
    HTMLAttributes,
} from "react";
import { Moment, MomentInput } from "moment";

// 忽略 T 对象中 键在 K 中的所有的属性
type ObjectExclude<T, K extends keyof T> = Partial<Pick<T, { [P in keyof T]: P extends K ? never : P; }[keyof T]>>;

// base type
export type SizeType = "sm" | "md" | "lg";

// Icon
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    type: string;
    spin?: boolean;
    prefix?: string;
}
export class Icon extends PureComponent<IconProps> {}

// SvgIcon
export interface SvgIconProps extends HTMLAttributes<SVGElement> {
    type: string;
    color?: string;
    spin?: boolean;
}
export class SvgIcon extends PureComponent<SvgIconProps> {}

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
export class Button extends PureComponent<ButtonProps> {}

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
export class Row extends Component<RowProps> {}

// Col
export interface ColProps extends HTMLAttributes<HTMLDivElement> {
    span?: number;
    offset?: number;
    pull?: number;
    push?: number;
    order?: number;
    gutter?: number;
}
export class Col extends Component<ColProps> {}

// Grid
export interface GridType {
    Row: Row;
    Col: Col;
}
export const Grid: GridType;

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
export class Tabs extends Component<TabsProps> {
    static Pane: TabPane;
}

// Collapse
export interface CollapseProps {
    openKeys?: string[];
    defaultOpenKeys?: string[];
    multiple?: boolean;
    onChange?: (keys: string[]) => void;
}
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
declare class Panel extends Component<CollapsePanelProps> {}
export class Collapse extends Component<CollapseProps> {
    static Panel: typeof Panel;
}

// Form FormItem
export interface FormLabelCol {
    span?: number;
    offset?: number;
    pull?: number;
    push?: number;
}
export interface FormProps {
    label?: ReactNode;
    labelCol?: FormLabelCol;
    controllerCol?: FormLabelCol;
}
export interface FormItemProps {
    label?: ReactNode;
    children?: ReactNode;
    labelCol?: FormLabelCol;
    controllerCol?: FormLabelCol;
    className?: string;
}
declare class FormItem extends Component<FormItemProps> {}
export class Form extends Component<FormProps> {
    static Item: typeof FormItem;
}

// Card
export type CardChildProps = HTMLAttributes<HTMLDivElement>;
export interface CardHeaderProps extends CardChildProps {
    comment?: ReactNode;
}
declare class CardHeader extends Component<CardHeaderProps> {}
declare class CardContent extends Component<CardChildProps> {}
declare class CardFooter extends Component<CardChildProps> {}
declare class CardAction extends Component<CardChildProps> {}
export type CardProps = HTMLAttributes<HTMLDivElement>;
export class Card extends PureComponent<CardProps> {
    static Header: typeof CardHeader;
    static Content: typeof CardContent;
    static Footer: typeof CardFooter;
    static Action: typeof CardAction;
}

// Compact
export interface CompactSharedProps {
    [key: string]: any;
}
export interface CompactProps extends HTMLAttributes<HTMLDivElement> {
    sharedProps?: CompactSharedProps;
}
export class Compact extends Component<CompactProps> {}

// Combine
export interface CombineProps extends HTMLAttributes<HTMLDivElement> {
    sharedProps?: CompactSharedProps;
    spacing?: "compact" | "smart" | "sm" | "md" | "lg" | string;
}
export class Combine extends Component<CombineProps> {}

// Input
export interface InputProps
    extends ObjectExclude<HTMLAttributes<HTMLInputElement>, "prefix"> {
    icon?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    size?: SizeType;
    status?: "default" | "error";
}
interface SearchInputProps extends InputProps {
    onSearch?: (value: string) => void;
}
declare class SearchInput extends Component<SearchInputProps> {}
export class Input extends Component<InputProps> {
    static Search: typeof SearchInput;
}

// NumberInput
export type NumberInputStyleType = "default" | "split" | "pagination";
export interface NumberInputProps
    extends ObjectExclude<HTMLAttributes<HTMLInputElement>, "onChange"> {
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
    InputStyle?: CSSProperties;
    computeValidNumber?: (value: number) => number;
    hideHandler?: boolean;
}
export class NumberInput extends Component<NumberInputProps> {}

// Textarea
export type TextareaProps = HTMLAttributes<HTMLTextAreaElement>;
export class Textarea extends Component<TextareaProps> {}

// Select
export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
    value?: string | number;
}
export interface InterfaceSelectOption extends SelectOptionProps {
    label?: ReactNode;
}
export type SelectOptions = InterfaceSelectOption[];
export interface SelectSearch {
    handleSearch(value: string, item: InterfaceSelectOption): boolean;
}
export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
    value?: any;
    defaultValue?: any;
    placeholder?: string;
    onChange?: (value: any) => void;
    options?: SelectOptions;
    multiple?: boolean;
    showSelectAll?: boolean;
    disabled?: boolean;
    renderContent?: () => ReactNode;
    renderSelector?: (node: ReactNode, visible: boolean) => ReactNode;
    search?: true | SelectSearch;
    size?: SizeType;
    popover?: PopoverProps;
}
declare class SelectOption extends Component<SelectOptionProps> {}
interface SelectGroupProps {
    title?: ReactNode;
    groupKey?: any;
}
declare class SelectGroup extends Component<SelectGroupProps> {}
export class Select extends Component<SelectProps> {
    static Option: typeof SelectOption;
    static Group: typeof SelectGroup;
}

// Checkbox
export type CheckboxStyleType = "default" | "card";
export interface CheckboxProps
    extends ObjectExclude<HTMLAttributes<HTMLSpanElement>, "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    value?: any;
    size?: SizeType;
    styleType?: CheckboxStyleType;
    onChange?: (checked: boolean) => void;
}
export type CheckboxOptions = SelectOptions;
export interface CheckboxGroupProps {
    value?: any[];
    defaultValue?: any[];
    onChange?: (value: any[]) => void;
    options?: CheckboxOptions;
    disabled?: boolean;
    size?: SizeType;
}
export class CheckboxGroup extends Component<CheckboxGroupProps> {}
export class Checkbox extends Component<CheckboxProps> {
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
export class Radio extends Component<RadioProps> {
    static Group: typeof RadioGroup;
}

// Switch
export interface SwitchProps
    extends ObjectExclude<HTMLAttributes<HTMLDivElement>, "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: SizeType;
    onText?: ReactNode;
    offText?: ReactNode;
}
export class Switch extends Component<SwitchProps> {}

// Slider
export interface SliderMarkOption {
    label?: string;
    step?: number;
    ratio?: number;
}
export type SliderMark = SliderMarkOption[];
interface NumberInputTipFormatterOption {
    currentValue: number;
    inputValue: number;
    isSensitive: boolean;
    locale: any;
}
export interface SliderProps
    extends ObjectExclude<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onLastChange?: (value: number) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number | string;
    marks?: SliderMark;
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
}
export class Slider extends Component<SliderProps> {}

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
export class Upload extends Component<UploadProps> {}

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
export class Calendar extends Component<CalendarProps> {}

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
export interface DatePickerProps {
    value?: DateValue;
    defaultValue?: DateValue;
    onChange?: DateChangeEvent;
    rules?: CalendarRule;
    size?: SizeType;
    display?: DatePickerDisplay;
    disabled?: boolean;
    zIndex?: number;
    style?: CSSProperties;
    getCalendarContainer?: () => ReactNode;
}
interface MonthDisplayOption {
    format?: string;
}
interface MonthDisplay {
    date?: MonthDisplayOption;
}
export interface MonthProps {
    value?: DateValue;
    defaultValue?: DateValue;
    onChange?: DateChangeEvent;
    rules?: CalendarRule;
    display?: MonthDisplay;
    size?: SizeType;
    disabled?: boolean;
    zIndex?: number;
    getCalendarContainer?: () => ReactNode;
}
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
export interface RangeProps {
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
}
declare class DatePickerRange extends Component<RangeProps> {}
export class DatePicker extends Component<DatePickerProps> {
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
export interface MenuItemProps extends HTMLDivElement {
    itemKey?: number | string;
    disabled?: boolean;
}
declare class MenuItem extends Component<MenuItemProps> {}
export interface MenuSubMenuProps extends ObjectExclude<HTMLDivElement, "title"> {
    title?: ReactNode;
    styleType?: "collapse" | "popover";
    subMenuKey?: string;
    disabled?: boolean;
}
declare class MenuSubMenu extends Component<MenuSubMenuProps> {}
export class Menu extends Component<MenuProps> {
    static Item: typeof MenuItem;
    static SubMenu: typeof MenuSubMenu;
}

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
export interface ZFormProps {
    form?: FormShape;
}
interface ControllerDecoratorOptions {
    [key: string]: any
}
export class ZForm extends Component<ZFormProps> {
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
export interface TransferProps extends HTMLDivElement {
    dataSource?: any[];
    renderList?: (options: TransferProps) => ReactNode;
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    onChange?: (keys: string[]) => void;
    disabled?: boolean;
    search?: boolean | SelectSearch;
    source?: TransferSource;
    target?: TransferSource;
}
export class Transfer extends Component<TransferProps> {}

// Notice
export type NoticeStyleType = "default" | "success" | "warning" | "error" | "disabled";
export interface NoticeProps extends HTMLDivElement {
    closable?: boolean;
    icon?: ReactNode;
    onClose?: Function;
    styleType?: NoticeStyleType;
    action?: ReactNode;
}
export class Notice extends Component<NoticeProps> {}

// Badge
export interface BubbleCustomStyle {
    bubbleColor?: string;
    bubbleBackground?: string;
    [key: string]: any;
}
export interface BubbleProps extends HTMLDivElement {
    bubble?: ReactNode;
    styleType?: "yellow" | "orange" | "gray" | "purple";
    size?: "sm" | "md";
    customStyle?: BubbleCustomStyle;
    getBubbleContainer?: GetPopupContainer;
    offset?: number[];
}
export type BadgePlacement = "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
export interface BadgeProps extends HTMLDivElement {
    value?: ReactNode;
    maxValue?: number;
    dot?: boolean;
    placement?: BadgePlacement;
    hideWhenZero?: boolean;
    badgeStyle?: CSSProperties;
}
export class Badge extends Component<BadgeProps> {}

// Tag
export interface TagProps {
    styleType?:
        | "default"
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
    closable?: boolean;
    onClose?: () => void;
    icon?: "circle-fill" | "circle" | "loading" | "custom" | ReactNode;
    disabled?: boolean;
}
export class Tag extends Component<TagProps> {}

// Popover
interface PopupAlign {
    points?: string[];
    offset?: number[];
}
export type PopoverPlacement = | "topLeft"
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
export interface PopoverProps extends ObjectExclude<HTMLDivElement, "align"> {
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
export class Popover extends Component<PopoverProps> {}

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
export class Tooltip extends Component<TooltipProps> {}

// PopConfirm
interface PopConfirmProps extends TooltipProps {
    onConfirm?: () => void;
    onCancel?: () => void;
}
export class PopConfirm extends Component<PopConfirmProps> {}

// Modal
interface ModalGetFooter {
    (): ReactNode;
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
export class Modal extends Component<ModalProps> {
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
export class Drawer extends Component<DrawerProps> {}

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
}
interface DefaultColumnConfig {
    [key: string]: string
}
interface TableRowBack extends HTMLTableDataCellElement {}
interface TableCustomStyle {
    outerPadding?: string;
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
interface TableActionItem extends ButtonProps {
    label?: ReactNode;
}
interface TableActionListProps {
    actionList: TableActionItem[];
    exposeCount?: number;
    size?: SizeType;
    buttonStyleType?: ButtonStyleType;
    smart?: boolean;
    popoverProps?: PopoverProps;
}
declare class TableActionList extends Component<TableActionListProps> {}
interface TableExpandedRowContentProps extends HTMLDivElement {}
declare class TableExpandedRowContent extends Component<TableExpandedRowContentProps> {}
export class Table extends Component<TableProps> {
    static ColumnConfigButton: typeof TableColumnConfigButton;
    static SearchInput: typeof SearchInput;
    static ActionList: typeof TableActionList;
    static ExpandedRowContent: typeof TableExpandedRowContent;
}

// TransferTable
export interface TransferTableProps extends TransferProps {
    columns?: Column[];
    tableProps?: TableProps;
}

export class TransferTable extends Component<TransferTableProps> {}

// TransferMenu
export interface TransferMenuProps extends TransferProps {
    renderItem?: (item: any) => ReactNode;
}

export class TransferMenu extends Component<TransferMenuProps> {}

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

export class EditableList extends Component<EditableListProps> {}

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

export class EditableTable extends Component<EditableTableProps> {}

// Progress
interface ProgressFormat {
    (percent: number): string;
}
export interface ProgressProps extends HTMLDivElement {
    percent?: number;
    color?: "success" | "warn" | "error" | string
    format?: null | ProgressFormat;
}
export class Progress extends Component<ProgressProps> {}

// Loading
export interface LoadingProps extends HTMLDivElement {
    loading?: boolean;
    indicator?: ReactNode;
    tip?: ReactNode;
    maskStyle?: CSSProperties;
    maskClassName?: string;
}
export class Loading extends Component<LoadingProps> {}

// Pagination
interface GetPaginationShowTotal {
    (total: number): string;
}
interface ShowQuickJumperObject {
    goButton?: ReactNode;
}
export interface PaginationProps {
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
}
export class Pagination extends Component<PaginationProps> {}

// Message
export interface MessageProps {
    closable?: boolean;
    title?: ReactNode;
    footer?: ReactNode;
    styleType?: NoticeStyleType
}
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
export class Message extends Component<MessageProps> {
    static message: MessageMethod;
    static info: MessageMethod;
    static warning: MessageMethod;
    static success: MessageMethod;
    static error: MessageMethod;
    static loading: MessageMethod;
    static config: (config: MessageConfig) => void;
}

// LocaleProvider
interface LocaleProviderProps {
    children?: ReactNode;
    locale?: any;
}
export class LocaleProvider extends Component<LocaleProviderProps> {}

// ThemeProvider
interface ThemeProviderProps {
    theme: any;
}
export class ThemeProvider extends Component<ThemeProviderProps> {}
