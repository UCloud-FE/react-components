import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/Button';

import { SelectorWrap, tipCls } from './style';

/**
 * 文件选择控件
 */
export default class Selector extends PureComponent {
    static propTypes = {
        /** 选取文件回调函数 */
        onSelect: PropTypes.func,
        /** 自定义触发图片选择的选择控件 */
        selector: PropTypes.node,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 是否可以多选 */
        multiple: PropTypes.bool,
        /** 可接受的文件类型，MIME，见Upload */
        accept: PropTypes.string,
        /** 文件大小限制 */
        maxSize: PropTypes.number,
        /** @ignore */
        locale: PropTypes.object
    };
    /**
     * 触发选择操作
     * @public
     */
    trigger = () => {
        this._trigger && this._trigger.click();
    };
    /** 清空触发器 */
    cleanTrigger = () => {
        this._trigger && (this._trigger.value = '');
    };
    onChange = e => {
        const { onSelect } = this.props;
        onSelect?.(e.target.files);
        this.cleanTrigger();
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { disabled, multiple, accept, selector, locale, onSelect, ...rest } = this.props;
        return selector === null ? null : (
            <SelectorWrap onClick={this.trigger} disabled={disabled} {...rest}>
                <input
                    type="file"
                    hidden
                    ref={ref => (this._trigger = ref)}
                    onChange={this.onChange}
                    disabled={disabled}
                    multiple={multiple}
                    accept={accept}
                />
                {selector
                    ? selector
                    : [
                          <Button size="md" styleType="primary" disabled={disabled} key="button">
                              {locale.selectFile}
                          </Button>,
                          <span className={tipCls} key="tip">
                              {locale.selectFileTip}
                          </span>
                      ]}
            </SelectorWrap>
        );
    }
}
