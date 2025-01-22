import type { CSSProperties, ReactNode, Component, PureComponent, HTMLAttributes, TextareaHTMLAttributes } from 'react';

// 忽略 T 对象中 键在 K 中的所有的属性
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

// base type
export type SizeType = 'sm' | 'md' | 'lg';

// ThemeProvider
interface ThemeProviderProps {
    theme: any;
}
export declare class ThemeProvider extends Component<ThemeProviderProps> {}

export { default as Tree } from './lib/components/Tree';

export { default as Cascader } from './lib/components/Cascader';

export { default as Link } from './lib/components/Link';

export { default as AutoComplete } from './lib/components/AutoComplete';

export { default as Switch, SwitchProps } from './lib/components/Switch';

export { default as Tabs, TabsProps, TabPaneProps } from './lib/components/Tabs';

export { default as Input } from './lib/components/Input';
import Input from './lib/components/Input';

export { default as Checkbox, CheckboxProps } from './lib/components/Checkbox';

export { default as Menu } from './lib/components/Menu';

export { default as Collapse } from './lib/components/Collapse';

export { default as ActionList } from './lib/components/ActionList';
import ActionList from './lib/components/ActionList';

export { default as Tooltip } from './lib/components/Tooltip';

export { default as PopConfirm } from './lib/components/PopConfirm';

export { default as ConfigProvider } from './lib/components/ConfigProvider';

export { default as Icon } from './lib/components/Icon';

export { default as Select } from './lib/components/Select';

export { default as Breadcrumb } from './lib/components/Breadcrumb';

export { default as Nav } from './lib/components/Nav';

export { default as Skeleton } from './lib/components/Skeleton';

// Button
import { ButtonProps } from './lib/components/Button/Button';
export { default as Button } from './lib/components/Button';

// Box
type BoxSpacing = 'sm' | 'md' | 'lg' | number | string;
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    spacing?: BoxSpacing | [BoxSpacing, BoxSpacing?];
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    alignContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';
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
export type RowType = 'flex';
export type RowAlign = 'top' | 'middle' | 'bottom';
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    type?: RowType;
    align?: RowAlign;
    justify?: RowJustify;
    gutter?: number | [number, number];
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
    spacing?: 'compact' | 'smart' | 'sm' | 'md' | 'lg' | string;
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

// NumberInput
export type NumberInputStyleType = 'default' | 'split' | 'pagination';
export type NumberInputProps = Override<
    HTMLAttributes<HTMLInputElement>,
    {
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
    }
>;
export declare class NumberInput extends Component<NumberInputProps> {}

// Textarea
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export declare class Textarea extends Component<TextareaProps> {}

// Radio
export type RadioStyleType = 'default' | 'button' | 'tag' | 'card' | 'text' | 'list';
export interface RadioProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    value?: any;
    styleType?: RadioStyleType;
    size?: SizeType;
    title?: ReactNode;
    extra?: ReactNode;
    disabledLabel?: ReactNode;
}
interface RadioOption extends RadioProps {
    label?: ReactNode;
}
export type RadioOptions = RadioOption[];
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

// Slider
export interface SliderMark {
    label?: string;
    step?: number;
    ratio?: number;
}
export interface SliderMarks {
    [key: string]: SliderMark | ReactNode;
}
interface NumberInputTipFormatterOption {
    currentValue: number;
    inputValue: number;
    isSensitive: boolean;
    locale: any;
}
export type SliderProps = Override<
    HTMLAttributes<HTMLDivElement>,
    {
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
        numberInputTipFormatter?: (option: NumberInputTipFormatterOption) => ReactNode;
        tipFormatter?: (value: number) => ReactNode;
        size?: SizeType;
    }
>;
export declare class Slider extends Component<SliderProps> {}

// Upload
export interface UploadFile {
    name: string;
    uid: string;
    size?: number;
    status?: 'uploading' | 'success' | 'error';
    thumbnailUrl?: string;
    url?: string;
    type?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    progress?: number;
    error?: Error;
}
interface UpdateProgress {
    (progress: number): void;
}
type UploadListTypeOption<T> = [T, 'none' | 'dropzone' | 'thumbnail'];
export type UploadListType =
    | 'none'
    | 'text'
    | 'list'
    | 'dropzone'
    | UploadListTypeOption<'list'>
    | UploadListTypeOption<'dropzone'>;
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
    defaultFileList?: (File | UploadFile)[];
    fileList?: (File | UploadFile)[];
    style?: CSSProperties;
    customStyle?: UploadCustomStyle;
}
export declare class Upload extends Component<UploadProps> {}

// Calendar
export { default as Calendar } from './lib/components/Calendar';

// DatePicker
export { default as DatePicker } from './lib/components/DatePicker';

// ZForm
export interface FormShape {
    getFieldsValue: Function;
    getFieldValue: Function;
    getFieldInstance: Function;
    setFieldsValue: Function;
    setFields: Function;
    setFieldsInitialValue: Function;
    getFieldDecorator: Function;
    getFieldProps: Function;
    getFieldsError: Function;
    getFieldError: Function;
    isFieldValidating: Function;
    isFieldsValidating: Function;
    isFieldsTouched: Function;
    isFieldTouched: Function;
    isSubmitting: Function;
    submit: Function;
    validateFields: Function;
    resetFields: Function;
}
export interface ZFormProps extends FormProps {
    form?: FormShape;
}
interface ControllerDecoratorOptions {
    [key: string]: any;
}
export declare class ZForm extends Component<ZFormProps> {
    static formDecorator?: (options: FormShape) => Function;
    static controllerDecorator?: (options: ControllerDecoratorOptions) => Function;
    static formShape?: FormShape;
}

// Transfer
type TransferSearch = (searchValue: string, item: any) => boolean;
interface TransferSource {
    title?: ReactNode;
    footer?: ReactNode;
    search?: boolean | TransferSearch;
    disabled?: boolean;
}
export type TransferProps = Override<
    HTMLAttributes<HTMLDivElement>,
    {
        dataSource?: any[];
        renderList?: (options: TransferProps) => ReactNode;
        selectedKeys?: string[];
        defaultSelectedKeys?: string[];
        onChange?: (keys: string[]) => void;
        disabled?: boolean;
        search?: boolean | TransferSearch;
        source?: TransferSource;
        target?: TransferSource;
    }
>;
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
export { default as Notice, NoticeProps } from './lib/components/Notice';

// Badge
export { default as Badge, BadgeProps } from './lib/components/Badge';

// Tag
export type TagStyleType =
    | 'default'
    | 'green'
    | 'yellow'
    | 'red'
    | 'primary'
    | 'purple'
    | 'lightblue'
    | 'blue'
    | 'orange'
    | 'cyan'
    | 'success'
    | 'warning'
    | 'error'
    | 'purple-fill'
    | 'lightblue-fill'
    | 'blue-fill'
    | 'orange-fill'
    | 'yellow-fill'
    | 'cyan-fill'
    | string;
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    styleType?: TagStyleType;
    closable?: boolean;
    onClose?: () => void;
    icon?: 'circle-fill' | 'circle' | 'loading' | 'custom' | ReactNode;
    disabled?: boolean;
    border?: boolean;
    borderType?: 'default' | 'circle';
    suffix?: ReactNode;
}
export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    compact?: boolean;
    exposeCount?: number;
    popoverProps?: PopoverProps;
}
export declare class TagIcon extends PureComponent<TagProps> {}
export declare class TagGroup extends PureComponent<TagGroupProps> {}
export declare class Tag extends PureComponent<TagProps> {
    declare static Icon: typeof TagIcon;
    declare static Group: typeof TagGroup;
}

// Popover
interface PopupAlign {
    points?: string[];
    offset?: number[];
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
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
    alignPoint?: boolean;
    placement?: PopoverPlacement;
    align?: PopupAlign;
    stretch?: 'with' | 'minWidth' | 'height' | 'minHeight';
    popup?: ReactNode;
    popupClassName?: string;
    popupStyle?: CSSProperties;
    zIndex?: number;
    getPopupContainer?: GetPopupContainer;
    forwardPopupContainer?: boolean | GetPopupContainer;
    prefixCls?: string;
    animation?: 'fade' | 'zoom' | 'bounce' | 'slide-up';
}
export declare class Popover extends Component<PopoverProps> {}

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
    (options: ModalProps, contentNode?: ReactNode): ModalConfirmHandle;
}
export declare class ModalContent extends Component<HTMLAttributes<HTMLDivElement>> {}
export declare class Modal extends Component<ModalProps> {
    static confirm: ModalConfirm;
    static alert: ModalConfirm;
    static open: ModalConfirm;
    static Content: typeof ModalContent;
}

// Drawer
export interface DrawerProps {
    visible?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    keyboard?: boolean;
    onClose?: () => void;
    destroyOnClose?: boolean;
    placement?: 'left' | 'right' | 'top' | 'bottom';
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
type RowKey = (row: any) => string;
export interface RowSelection {
    fixed?: boolean;
    onChange?: Function;
    defaultSelectedRowKeys?: string[];
    selectedRowKeys?: string[];
    getDisabledOfRow?: (row: any) => boolean;
    multiple?: boolean;
    selectedTip?: boolean | 'button';
    disabled?: boolean;
}
interface DragSorting {
    fixed: boolean;
    onChange: (record: any, fromIndex: number, toIndex: number) => void;
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
    fixed?: 'left' | 'right';
    render?: ColumnRender;
    onCellClick?: Function;
    onCell?: Function;
    onHeaderCell?: Function;
    [key: string]: any;
}
interface DefaultColumnConfig {
    [key: string]: string;
}
interface TableCustomStyle {
    outerPadding?: string;
    [key: string]: any;
}
interface TableOrder {
    key: string;
    state: 'desc' | 'asc';
}
export interface TableConditionChangeEventOrder {
    order: TableOrder;
    filters: { key: string; value: string }[];
    searchValue: string;
}
interface ConditionChangeEvent {
    (condition: TableConditionChangeEventOrder): void;
}
interface TableContextMenu {
    (row: object, hide: boolean): ReactNode;
}
export interface TableProps {
    pagination?: PaginationProps | null;
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
    onRow?: (row: any, index: number) => any;
    onHeaderRow?: (row: any, index: number) => any;
    rowSelection?: RowSelection | true;
    dragSorting?: boolean | DragSorting;
    onRowSelect?: (keys: string[]) => void;
    showHeader?: boolean;
    columnResizable?: boolean;
    title?: () => ReactNode;
    footer?: () => ReactNode;
    emptyContent?: ReactNode;
    errorContent?: ReactNode;
    handleSearch?: (row: any, searchValue: string) => boolean;
    customStyle?: TableCustomStyle;
    scroll?: TableScroll;
    tableLayout?: 'auto' | 'fixed';
    rowKey?: string | RowKey;
    zebraCrossing?: boolean;
    components?: any;
    defaultOrder?: TableOrder;
    order?: TableOrder;
    onConditionChange?: ConditionChangeEvent;
    doNotHandleCondition?: boolean;
    contextMenu?: TableContextMenu;
    className?: string;
}
interface ColumnConfigButtonProps extends ButtonProps {
    modalProps?: ModalProps;
}
declare class TableColumnConfigButton extends Component<ColumnConfigButtonProps> {}
interface TableExpandedRowContentProps extends HTMLAttributes<HTMLDivElement> {}
declare class TableExpandedRowContent extends Component<TableExpandedRowContentProps> {}
declare class HoverDisplayArea extends Component<HTMLAttributes<HTMLDivElement>> {}
export declare class Table extends Component<TableProps> {
    static ColumnConfigButton: typeof TableColumnConfigButton;
    static SearchInput: typeof Input['Search'];
    static ActionList: typeof ActionList;
    static ExpandedRowContent: typeof TableExpandedRowContent;
    static HoverDisplayArea: typeof HoverDisplayArea;
    static getColumnConfigFromLocalStorage: typeof Function;
    static setColumnConfigToLocalStorage: typeof Function;
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
    status?: 'default' | 'success' | 'warning' | 'error' | 'loading';
    shareStatus?: boolean;
    tip?: ReactNode | FormItemTip;
}
export type FormGroupProps = Override<
    HTMLAttributes<HTMLDivElement>,
    {
        title?: ReactNode;
        itemProps?: FormItemProps;
    }
>;
export interface FormSubAreaProps extends HTMLAttributes<HTMLFormElement> {
    itemProps?: FormItemProps;
}
export interface FormProps extends HTMLAttributes<HTMLFormElement> {
    size?: 'md' | 'lg';
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
    status?: 'disabled' | 'error' | 'success' | 'normal';
}
export interface StepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    steps: Step[];
    current?: string | number;
    status?: 'current' | 'loading' | 'error';
    direction?: 'horizontal' | 'vertical';
    nowrap?: boolean;
    onChange?: (current: string | number) => void;
}
export declare class Steps extends Component<StepsProps> {}

// Message
export type MessageProps = Override<
    HTMLAttributes<HTMLDivElement>,
    {
        closable?: boolean;
        title?: ReactNode;
        footer?: ReactNode;
        styleType?: 'default' | 'success' | 'loading' | 'warning' | 'error';
    }
>;
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

// Pagination
interface GetPaginationShowTotal {
    (total: number): string;
}
interface ShowQuickJumperObject {
    goButton?: ReactNode;
}
export type PaginationProps = Override<
    HTMLAttributes<HTMLUListElement>,
    {
        current?: number;
        defaultCurrent?: number;
        total?: number;
        showTotal?: boolean | GetPaginationShowTotal;
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
>;
export declare class Pagination extends Component<PaginationProps> {}

// Progress
interface ProgressFormat {
    (percent: number): string;
}
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    percent?: number;
    color?: 'success' | 'warn' | 'error' | string;
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
