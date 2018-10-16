import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import generateError from 'utils/generateError';
import Button from 'components/Button';

import { SelectorWrap, TipWrap } from './style';

/** 检查文件类型和大小 */
const checkFile = (file, accept = '*', maxSize) => {
    const types = accept.split(/\s*,\s*/);
    let typeCheckPass = false;
    for (let index in types) {
        const type = types[index];
        let regexp, pass;
        if (/^\./.test(type)) {
            regexp = new RegExp(type.replace('.', '\\.') + '$');
            pass = regexp.test(file.name);
        } else {
            regexp = new RegExp(type.replace('*', '.*').replace('.', '\\.'));
            pass = regexp.test(file.type);
        }
        if (pass) {
            typeCheckPass = true;
            break;
        }
    }
    const sizeCheckPass = maxSize === undefined || file.size <= maxSize;
    if (!typeCheckPass) {
        return generateError(`file ${file.name} type is not accepted`, 'FileTypeError');
    }
    if (!sizeCheckPass) {
        return generateError(`file ${file.name} size is to big`, 'FileSizeError');
    }
    return true;
};

/**
 * 文件选择控件
 */
export default class Selector extends PureComponent {
    static propTypes = {
        /** 选取文件回调函数 */
        onSelect: PropTypes.func,
        /** 选中或读取文件错误回调 */
        onError: PropTypes.func,
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
    static defaultProps = {
        onSelect: () => {},
        onError: () => {}
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
        const { onSelect, onError, accept, maxSize } = this.props;
        const files = [].slice.call(e.target.files);
        this.cleanTrigger();
        for (let index in files) {
            const file = files[index];
            const checkResult = checkFile(file, accept, maxSize);
            if (checkResult !== true) {
                onError(checkResult);
                return;
            }
            file.uid = _.uniqueId('__file_uid_for_upload_components__');
        }
        onSelect(files);
    };
    render() {
        const { disabled, multiple, accept, selector, locale, ...rest } = this.props;
        return (
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
                          <TipWrap key="tip">{locale.selectFileTip}</TipWrap>
                      ]}
            </SelectorWrap>
        );
    }
}
