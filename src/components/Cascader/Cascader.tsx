import React, {
    ChangeEvent,
    HTMLAttributes,
    MouseEvent,
    Ref,
    RefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';

import Popover from 'src/components/Popover';
import { InputProps } from 'src/components/Input';
import Tooltip from 'src/components/Tooltip';
import SvgIcon from 'src/components/SvgIcon';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { SearchInput } from 'src/sharedComponents/Search';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import useUncontrolled from 'src/hooks/useUncontrolled';
import useSearch from 'src/hooks/useSearch';
import { Size } from 'src/type';

import { CascadeData, Key, LoadData } from './interface';
import { inputCls, SPopup, SWrap } from './style';
import Cascade, { CascadeSearchResult } from './Cascade';
import LOCALE from './locale/zh_CN';

export interface DefinedCascaderProps {
    /** 数据源 */
    dataSource?: CascadeData[];
    /** 选中的值 */
    value?: Key[];
    /** 默认值，非受控 */
    defaultValue?: Key[];
    /** 选中回调 */
    onChange?: (value: Key[] | void) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: Size;
    /** 使用搜索 */
    search?:
        | boolean
        | {
              /** 自定义搜索函数 */
              handleSearch?: (
                  searchValue: string,
                  dataSource: CascadeData[]
              ) => {
                  dataSource: CascadeData[];
                  count?: number;
              };
          };
    /** 异步加载数据操作 */
    loadData?: LoadData;
    /** 是否可清空 */
    clearable?: boolean;
    /** 状态 */
    status?: InputProps['status'];
    /** @ignore */
    placeholder?: string;
    /** 自定义 popover 的配置 */
    popoverProps?: { [key: string]: any };
    /** 分隔符 */
    separator?: string;
    /** 渲染级联顶部的插槽 */
    topExtraRender?: (props: {
        /** 当前级联索引 */
        index: number;
        parents?: CascadeData[];
        items?: CascadeData[];
    }) => React.ReactNode;
}

export type CascaderProps = DefinedCascaderProps;

const PopupWrapWithoutMemo = (props: HTMLAttributes<HTMLDivElement>) => {
    const handleFocus = useCallback((e: MouseEvent) => {
        e.preventDefault();
    }, []);
    return <SPopup {...props} onMouseDown={handleFocus} />;
};
const PopupWrap = React.memo(PopupWrapWithoutMemo);

type StaticInputRef = { inputRef: RefObject<{ input: HTMLInputElement }> };

const StaticInputWithoutMemo = React.forwardRef(function StaticInput(
    { value, inputing, ...rest }: InputProps & { inputing: boolean },
    ref?: Ref<StaticInputRef>
) {
    const [visible, setVisible] = useState(false);
    const inputRef = useRef<{ input: HTMLInputElement }>(null);
    const updateVisible = useCallback(
        (visible?: boolean) => {
            if (inputing) {
                setVisible(false);
            } else if (!visible) {
                setVisible(false);
            } else {
                const input = inputRef.current?.input;
                setVisible(input ? input?.scrollWidth > input?.clientWidth : false);
            }
        },
        [inputing]
    );
    useImperativeHandle(
        ref,
        () => {
            return { inputRef };
        },
        []
    );
    useEffect(() => {
        if (inputing) {
            setVisible(false);
        }
    }, [inputing, value]);
    const handleVisibleChange = useCallback(
        (visible: boolean) => {
            updateVisible(visible);
        },
        [updateVisible]
    );
    return (
        <Tooltip
            visible={visible}
            onVisibleChange={handleVisibleChange}
            popup={value}
            placement="topLeft"
            arrow={false}
        >
            <SearchInput {...rest} value={value} ref={inputRef} />
        </Tooltip>
    );
});
const StaticInput = React.memo(StaticInputWithoutMemo);

const getValueStringFromDataSource = ({ value, dataSource, separator: userSeparator }: { value?: Key[], dataSource?: CascadeData[],separator?:string }) => {
    if (!value?.length) return '';
    const separator = userSeparator ? userSeparator : '/';
    if (!dataSource) return value.join(separator);
    let tmpItems: CascadeData[] | void = dataSource;
    return value
        .map(key => {
            if (!tmpItems) return key;
            const item = tmpItems.find(item => item.key === key);
            tmpItems = item?.children;
            if (!item) {
                console.error(`Can't find info for value ${key}`);
                return key;
            }
            return item.title;
        })
        .join(separator);
};

const popoverAlign = {
    points: ['tl', 'bl'],
    overflow: { adjustX: 0, adjustY: 1 },
    offset: [0, 5],
    targetOffset: [0, 0]
};

const defaultDataSourceAfterSearch: never[] = [];

const Cascader = ({
    dataSource,
    value: _value,
    defaultValue,
    onChange: _onChange,
    disabled,
    size,
    search,
    clearable,
    placeholder,
    loadData,
    status,
    popoverProps,
    separator,
    topExtraRender
}: CascaderProps) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [expandedValue, setExpandedValue] = useState(() => (value ? value.slice(0, value.length - 1) : []));
    const [focusing, setFocusing] = useState(false);
    const locale = useLocale(LOCALE, 'Cascader');
    const searchAble = useMemo(() => search, [search]);
    const inputRef = useRef<StaticInputRef>(null);
    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);
    const handleVisibleChange = useCallback(visible => setVisible(visible), []);
    const handleSelect = useCallback(
        (v: typeof value) => {
            onChange?.(v);
            setSearchValue('');
            setVisible(false);
            inputRef.current?.inputRef?.current?.input?.blur();
        },
        [onChange]
    );
    const handleExpand = useCallback((expandedValue: Key[]) => {
        setExpandedValue(expandedValue);
    }, []);
    const handleFocus = useCallback(() => {
        setFocusing(true);
    }, []);
    const handleBlur = useCallback(() => {
        setFocusing(false);
        setSearchValue('');
    }, []);
    const valueString = useMemo(() => getValueStringFromDataSource({
        value, 
        dataSource,
        separator
    }), [dataSource, value,separator]);
    const inputFocused = useMemo(() => searchAble && focusing, [focusing, searchAble]);
    const inputValue = useMemo(() => (inputFocused ? searchValue : valueString), [
        inputFocused,
        searchValue,
        valueString
    ]);
    const inputPlaceholder = useMemo(() => (inputFocused ? valueString : placeholder || locale.placeholder), [
        inputFocused,
        valueString,
        placeholder,
        locale.placeholder
    ]);
    const popoverConfigProps = usePopoverConfig();
    const {
        dataSource: dataSourceAfterSearch,
        loading: searchLoading,
        count: searchCount,
        error: searchError
    } = useSearch({
        dataSource,
        searchValue,
        defaultDataSourceAfterSearch,
        handleSearch: typeof search === 'object' ? search?.handleSearch : undefined
    });
    const handleClear = useCallback(() => {
        onChange([]);
    }, [onChange]);
    const inputProps: InputProps = useMemo(() => {
        if (searchAble && focusing) {
            return { count: searchCount, status: 'default' };
        }
        return {
            prefix: null,
            suffix: <SvgIcon type={visible ? 'arrow-up' : 'arrow-down'} />,
            onClear: handleClear,
            clearable,
            status
        };
    }, [clearable, focusing, handleClear, searchAble, searchCount, status, visible]);

    return (
        <SWrap disabled={disabled}>
            <Popover
                {...popoverConfigProps}
                {...popoverProps}
                popup={
                    <PopupWrap>
                        {searchValue ? (
                            <CascadeSearchResult
                                dataSource={dataSourceAfterSearch}
                                loading={searchLoading}
                                empty={searchCount === 0}
                                error={searchError}
                                onChange={handleSelect}
                                onExpand={handleExpand}
                            />
                        ) : (
                            <Cascade
                                dataSource={dataSource}
                                value={value}
                                onChange={handleSelect}
                                expandedValue={expandedValue}
                                onExpand={handleExpand}
                                topExtraRender={topExtraRender}
                                loadData={loadData}
                            />
                        )}
                    </PopupWrap>
                }
                trigger={[]}
                showAction={['click', 'focus']}
                hideAction={['blur']}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                forceAlignWhenScroll={false}
                forceAlignWhenUpdate={false}
                align={popoverAlign}
            >
                <StaticInput
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    value={inputValue}
                    placeholder={inputPlaceholder}
                    className={inputCls}
                    disabled={disabled}
                    readOnly={!searchAble}
                    inputing={visible && focusing}
                    size={size}
                    ref={inputRef}
                    {...inputProps}
                />
            </Popover>
        </SWrap>
    );
};

export default React.memo(Cascader);
