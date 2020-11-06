import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';
import Button from 'src/components/Button';

import {
    itemCls,
    itemErrorCls,
    nameCls,
    removeCls,
    detailCls,
    actionCls,
    errorCls,
    errorIconCls,
    uploadingTipCLs,
    uploadingIconCLs,
    previewAbleCls
} from './style';
import Thumbnail from './Thumbnail';
import Progress from './Progress';

export class Item extends Component {
    static propTypes = {
        onRemove: PropTypes.func,
        onPreview: PropTypes.func,
        onReupload: PropTypes.func,
        locale: PropTypes.object.isRequired,
        thumbnail: PropTypes.bool,
        disabled: PropTypes.bool,
        file: PropTypes.object,
        index: PropTypes.number
    };
    static defaultProps = {
        removable: true
    };
    onPreview = () => {
        const { file, index, onPreview } = this.props;
        onPreview?.(file, index);
    };
    onReupload = () => {
        const { file, onReupload } = this.props;
        onReupload(file);
    };
    onRemove = () => {
        const { file, index, onRemove } = this.props;
        onRemove(file, index);
    };
    renderThumbnail = () => {
        const { file, thumbnail } = this.props;
        return thumbnail ? <Thumbnail file={file} /> : null;
    };
    renderName = () => {
        const { file } = this.props;
        return (
            <span className={nameCls} title={file.name}>
                {file.name}
            </span>
        );
    };
    render() {
        const { onRemove, onPreview, locale, thumbnail, disabled, file } = this.props;
        const { status } = file;
        const removeBtn =
            !disabled && onRemove ? (
                <SvgIcon size="14px" className={removeCls} type="cross" onClick={this.onRemove} />
            ) : null;
        const retryBtn = !disabled ? (
            <Button key="reload" size="sm" onClick={this.onReupload}>
                <SvgIcon type="refresh" /> {locale.retry}
            </Button>
        ) : null;
        switch (status) {
            case 'uploading': {
                return (
                    <div className={itemCls}>
                        {this.renderThumbnail()}
                        <div className={detailCls}>
                            {thumbnail ? (
                                <div>
                                    {this.renderName()}
                                    <Progress {...('progress' in file ? { percent: file.progress } : {})} />
                                </div>
                            ) : (
                                <div className={uploadingTipCLs}>
                                    <SvgIcon className={uploadingIconCLs} type="ringLoading" spin />
                                    {locale.uploading}
                                </div>
                            )}
                        </div>
                        <div className={actionCls}>{removeBtn}</div>
                    </div>
                );
            }
            case 'error': {
                return (
                    <div className={classnames(itemCls, itemErrorCls)}>
                        {this.renderThumbnail()}
                        <div className={detailCls}>
                            {this.renderName()}
                            <div className={errorCls} title={file.error + '' || locale.defaultUploadErrorTip}>
                                <SvgIcon className={errorIconCls} size="12px" type="circleExclamation" />
                                {file.error + '' || locale.defaultUploadErrorTip}
                            </div>
                        </div>
                        <div className={actionCls}>
                            {retryBtn}
                            {removeBtn}
                        </div>
                    </div>
                );
            }
            default: {
                return (
                    <div className={classnames(itemCls, onPreview && previewAbleCls)}>
                        {this.renderThumbnail()}
                        <div className={detailCls} onClick={this.onPreview}>
                            {this.renderName()}
                        </div>
                        <div className={actionCls}>{removeBtn}</div>
                    </div>
                );
            }
        }
    }
}

export default Item;
