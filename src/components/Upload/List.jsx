import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import { UploadIcon, UploadNotice, ListWrap } from './style';

const getIconName = status => {
    return {
        uploading: 'loading',
        success: 'circle-check',
        error: 'circle-mark'
    }[status];
};

/**
 * 文件列表控件
 */
export default class List extends PureComponent {
    static propTypes = {
        /** 文件列表 */
        fileList: PropTypes.array,
        /** 渲染文件列表项 */
        renderFileItem: PropTypes.func,
        /** 删除文件 */
        onRemove: PropTypes.func,
        /** 自定义预览文件 */
        onPreview: PropTypes.func,
        /** 重新上传文件 */
        handleReupload: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        onError: () => {},
        onRemove: () => {}
    };
    /** 渲染列表项 */
    renderFileItem = (file, index, disabled) => {
        const { onRemove, onPreview, handleReupload } = this.props;
        const action = [
            disabled || file.status !== 'error' || !handleReupload ? null : (
                <UploadIcon key="reload" type="reload" onClick={() => handleReupload(file)} />
            ),
            disabled || file.status === 'uploading' ? null : (
                <UploadIcon key="remove" type="cross" onClick={() => onRemove(file, index)} />
            )
        ];
        const icon = file.status ? <Icon type={getIconName(file.status)} spin={file.status === 'uploading'} /> : null;
        return (
            <UploadNotice key={file.uid} icon={icon} onPreview={onPreview} action={action} closable={false}>
                <a onClick={() => onPreview && onPreview(file, index)}>{file.name}</a>
            </UploadNotice>
        );
    };
    render() {
        const { fileList, renderFileItem = this.renderFileItem, disabled, locale } = this.props;
        return (
            <ListWrap>
                {fileList.length ? (
                    fileList.map((file, index) => renderFileItem(file, index, disabled))
                ) : (
                    <UploadNotice closable={false} icon={null}>
                        {locale.emptyTip}
                    </UploadNotice>
                )}
            </ListWrap>
        );
    }
}
