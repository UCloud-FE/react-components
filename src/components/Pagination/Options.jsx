import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import Button from 'components/Button';
import KEYCODE from 'interfaces/KeyCode';

import NumberInput from 'components/NumberInput';

class Options extends React.Component {
    static propTypes = {
        changeSize: PropTypes.func,
        quickGo: PropTypes.func,
        current: PropTypes.number,
        pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        pageSize: PropTypes.number,
        buildOptionText: PropTypes.func,
        locale: PropTypes.object,
        size: PropTypes.string,
        allPages: PropTypes.number,
        select: PropTypes.object
    };

    static defaultProps = {
        pageSizeOptions: ['10', '20', '30', '40']
    };

    constructor(props) {
        super(props);

        this.state = {
            goInputText: ''
        };
    }

    buildOptionText = value => {
        return `${value} ${this.props.locale.itemsPerPage}`;
    };

    changeSize = value => {
        this.props.changeSize(Number(value));
    };

    handleChange = v => {
        this.setState({
            goInputText: v
        });
    };

    go = e => {
        let val = this.state.goInputText;
        if (val === '') {
            return;
        }
        val = isNaN(val) ? this.props.current : Number(val);
        if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
            this.setState({
                goInputText: ''
            });
            this.props.quickGo(val);
        }
    };

    render() {
        const props = this.props;
        const state = this.state;
        const locale = props.locale;
        const { size, allPages, select } = props;
        const prefixCls = `${props.rootPrefixCls}-options`;
        const changeSize = props.changeSize;
        const quickGo = props.quickGo;
        const goButton = props.goButton;
        const buildOptionText = props.buildOptionText || this.buildOptionText;
        let changeSelect = null;
        let goInput = null;
        let gotoButton = null;

        if (!(changeSize || quickGo)) {
            return null;
        }

        if (changeSize && Select) {
            const Option = Select.Option;
            const pageSize = props.pageSize || props.pageSizeOptions[0];
            const options = props.pageSizeOptions.map((opt, i) => (
                <Option key={i} value={opt}>
                    {buildOptionText(opt)}
                </Option>
            ));

            changeSelect = (
                <Select
                    className={`${prefixCls}-size-changer`}
                    value={pageSize.toString()}
                    onChange={this.changeSize}
                    size={size}
                    popover={{ getPopupContainer: triggerNode => triggerNode.parentNode }}
                    {...select}
                >
                    {options}
                </Select>
            );
        }

        if (quickGo) {
            if (goButton) {
                if (typeof goButton === 'boolean') {
                    gotoButton = (
                        <Button
                            onClick={this.go}
                            styleType="primary"
                            className={`${prefixCls}-gobutton`}
                            onKeyUp={this.go}
                            size={size}
                        >
                            {locale.jumpToConfirm}
                        </Button>
                    );
                } else {
                    gotoButton = (
                        <span className={`${prefixCls}-gobutton`} onClick={this.go} onKeyUp={this.go}>
                            {goButton}
                        </span>
                    );
                }
            }
            goInput = (
                <div className={`${prefixCls}-quick-jumper`}>
                    <NumberInput
                        size={size}
                        min={1}
                        max={allPages}
                        value={state.goInputText}
                        onChange={this.handleChange}
                        parser={input => input.replace(/[^\d]+/g, '')}
                        onKeyUp={this.go}
                        hideHandler
                        styleType="pagination"
                        suffix={<span className={`${prefixCls}-quick-jumper-text`}>{`/${allPages}`}</span>}
                    />
                    {gotoButton}
                </div>
            );
        }

        return (
            <li className={`${prefixCls}`}>
                {changeSelect}
                {goInput}
            </li>
        );
    }
}

export default Options;
