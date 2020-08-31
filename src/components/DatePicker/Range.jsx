import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import Popover from 'src/components/Popover';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

import DatePicker from './DatePicker';
import MonthPicker from './Month';
import LOCALE from './locale/zh_CN';

const formatString = { date: 'YYYY-MM-DD HH:mm:ss', month: 'YYYY-MM' };

import { isRangeDateValid } from './utils';
import {
    RangePopup,
    RangeSelect,
    RangeDateWrap,
    PickerIcon,
    RangeDateSeparator,
    RangePopupConfirmButton,
    RangePopupError,
    RangePopupTip,
    RangePopupFooter,
    RangePopupPickerContainer,
    RangeContainer
} from './style';
import { Size } from './DatePicker';

const getDateFromOption = option => {
    if (moment.isDate(option) || moment.isMoment(option) || _.isNumber(option)) {
        return moment(option);
    } else {
        return moment().add(option);
    }
};

const cloneDateRange = (range = []) => {
    return range.map(v => moment(v));
};

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'DatePicker' })
@uncontrolledDecorator(
    { onChangeName: ['onChange', 'onInitialChange'] },
    { valueName: 'option', onChangeName: 'onOptionChange' }
)
class Range extends Component {
    constructor(props) {
        super(props);
        this.now = +moment();
        this.defaultValue = cloneDateRange([this.now, this.now]);
        const { value = cloneDateRange(this.defaultValue) } = props;
        this.state = {
            visible: false,
            cache: value
        };
    }
    static propTypes = {
        /** 当前值，受控 */
        value: PropTypes.array,
        /** 默认值，非受控 */
        defaultValue: PropTypes.array,
        /** 修改回调，返回moment对象数组 */
        onChange: PropTypes.func,
        /** 初始化回调函数，传入option的情况下会输出option对应的值，配合option或者defaultOption使用 */
        onInitialChange: PropTypes.func,
        /** 选项 */
        options: PropTypes.array,
        /** 当前选项，受控 */
        option: PropTypes.string,
        /** 默认选项，非受控 */
        defaultOption: PropTypes.string,
        /** 选项变化回调 */
        onOptionChange: PropTypes.func,
        /** 隐藏快捷选项 */
        hideOptions: PropTypes.bool,
        /** 展示格式，除了range以外的属性会传入DatePicker和Month中（按照type） */
        display: PropTypes.object,
        /** 自定义规则 */
        rules: PropTypes.shape({
            /** 可选值范围 */
            range: PropTypes.array
        }),
        type: PropTypes.oneOf(['date', 'month']),
        /** 控件尺寸 */
        size: PropTypes.oneOf(Size),
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 弹出层的z-index */
        zIndex: PropTypes.number,
        /** 自定义默认选项props */
        selectProps: PropTypes.object,
        /** 自定义时间选择框弹出层props */
        popoverProps: PropTypes.object,
        /** 自定义datepicker的props */
        datePickerProps: PropTypes.object,
        /** @ignore */
        locale: PropTypes.object,
        /** 提示信息,展示在时间选择弹窗中 */
        rangeTip: PropTypes.node
    };
    static defaultProps = {
        onChange: () => {},
        onInitialChange: () => {},
        type: 'date',
        options: [],
        defaultOption: 'custom',
        onOptionChange: () => {},
        selectProps: {},
        popoverProps: {},
        datePickerProps: {},
        size: 'md',
        zIndex: 100
    };
    componentDidMount = () => {
        const { option, options, onInitialChange, value = cloneDateRange(this.defaultValue) } = this.props;
        if (option !== 'custom') {
            const optionInfo = _.find(options, _option => _option.value === option);
            if (optionInfo && optionInfo.range) {
                const range = optionInfo.range;
                onInitialChange([getDateFromOption(range.start), getDateFromOption(range.end)]);
            }
        } else {
            onInitialChange(value);
        }
    };
    componentWillReceiveProps(nextProps) {
        const { visible } = this.state;
        if (!visible) {
            this.updateCacheFromProps(nextProps);
        }
    }
    updateCacheFromProps = props => {
        const { value = cloneDateRange(this.defaultValue) } = props || this.props;
        this.setState({
            cache: value
        });
    };
    handleChange = (tag, value) => {
        const { cache } = this.state;
        const [start, end] = cache;
        if (tag === 'start') {
            let s = value,
                e = end;
            this.setState({
                cache: [moment(s), moment(e)]
            });
        } else if (tag === 'end') {
            let s = start,
                e = value;
            this.setState({
                cache: [moment(s), moment(e)]
            });
        }
    };
    handleOptionChange = option => {
        const { onOptionChange, options, onChange } = this.props;
        onOptionChange(option);

        if (option !== 'custom') {
            const optionInfo = _.find(options, _option => _option.value === option);
            if (optionInfo && optionInfo.range) {
                const range = optionInfo.range;
                onChange([getDateFromOption(range.start), getDateFromOption(range.end)]);
            }
        }
    };
    confirmChange = () => {
        const { onChange } = this.props;
        const { cache } = this.state;
        onChange([...cache]);
        this.setState({
            visible: false
        });
    };
    handleVisibleChange = visible => {
        this.setState({
            visible
        });
        if (!visible) {
            this.updateCacheFromProps();
        }
    };

    render() {
        const { visible, cache } = this.state;
        /* eslint-disable no-unused-vars */
        const {
            options: _options,
            option,
            defaultOption,
            onOptionChange,
            hideOptions,
            value = cloneDateRange(this.defaultValue),
            defaultValue,
            onChange,
            onInitialChange,
            size,
            display = {},
            rules = {},
            type,
            disabled,
            zIndex,
            locale,
            selectProps,
            datePickerProps,
            popoverProps,
            rangeTip,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const options = _options.concat({
            label: locale.custom,
            value: 'custom'
        });
        const { range, custom: _c } = rules;
        let readonly = option !== 'custom';
        let [start, end] = value;
        start = moment(+start);
        end = moment(+end);

        let [cStart, cEnd] = cache;
        cStart = moment(+cStart);
        cEnd = moment(+cEnd);

        const Picker = type === 'month' ? MonthPicker : DatePicker;
        const precision = type === 'month' ? 'month' : null;

        const { range: rangeDisplay = {}, ...pickerDisplay } = display;
        const { format: rangeFormat } = rangeDisplay;

        const rangeDateValidResult = isRangeDateValid(cStart, cEnd, rules, precision);
        const isValid = rangeDateValidResult === true;
        const errorTip = isValid === true ? null : locale[`${rangeDateValidResult}Tip`];

        return (
            <RangeContainer {...rest} disabled={disabled}>
                {!hideOptions && (
                    <RangeSelect
                        options={options.map(option => _.pick(option, ['label', 'value', 'disabled']))}
                        size={size}
                        value={option}
                        disabled={disabled}
                        onChange={this.handleOptionChange}
                        popoverProps={{ zIndex, ...selectProps.popoverProps }}
                    />
                )}
                <ConfigContext.Consumer>
                    {({ forwardPopupContainer } = {}) => {
                        return (
                            <Popover
                                visible={visible}
                                {...(forwardPopupContainer
                                    ? { forwardPopupContainer: triggerNode => triggerNode.parentNode }
                                    : { getPopupContainer: triggerNode => triggerNode.parentNode })}
                                zIndex={zIndex}
                                popup={
                                    <RangePopup>
                                        <RangePopupPickerContainer>
                                            <span>{locale.start}</span>
                                            <Picker
                                                value={cStart}
                                                rules={{
                                                    range: range,
                                                    custom: (date, value) =>
                                                        _c && _c(date, value, cStart, cEnd, 'start')
                                                }}
                                                display={pickerDisplay}
                                                onChange={v => this.handleChange('start', v)}
                                            />
                                        </RangePopupPickerContainer>
                                        <RangePopupPickerContainer>
                                            <span>{locale.end}</span>
                                            <Picker
                                                value={cEnd}
                                                rules={{
                                                    range: range,
                                                    custom: (date, value) => _c && _c(date, value, cStart, cEnd, 'end')
                                                }}
                                                display={pickerDisplay}
                                                onChange={v => this.handleChange('end', v)}
                                            />
                                        </RangePopupPickerContainer>
                                        <RangePopupFooter>
                                            <div>
                                                {isValid ? (
                                                    <RangePopupTip>{rangeTip}</RangePopupTip>
                                                ) : (
                                                    <RangePopupError>{errorTip}</RangePopupError>
                                                )}
                                                <RangePopupConfirmButton
                                                    styleType="primary"
                                                    onClick={this.confirmChange}
                                                    disabled={!isValid}
                                                >
                                                    {locale.rangeConfirm}
                                                </RangePopupConfirmButton>
                                            </div>
                                        </RangePopupFooter>
                                    </RangePopup>
                                }
                                onVisibleChange={this.handleVisibleChange}
                                trigger={['click']}
                                {..._.pick(popoverProps, ['getPopupContainer', 'forwardPopupContainer'])}
                            >
                                <RangeDateWrap size={size} readonly={readonly} disabled={disabled}>
                                    <span>{start.format(rangeFormat || formatString[type])}</span>
                                    <RangeDateSeparator />
                                    <span>{end.format(rangeFormat || formatString[type])}</span>
                                    <PickerIcon type="calendar" color="blue" />
                                </RangeDateWrap>
                            </Popover>
                        );
                    }}
                </ConfigContext.Consumer>
            </RangeContainer>
        );
    }
}

Range.Type = ['date', 'month'];

export default Range;
