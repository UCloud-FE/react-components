import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';

import {
    itemCls,
    itemErrorCls,
    nameCls,
    separatorCls,
    detailCls,
    actionCls,
    actionIconCls,
    errorCls,
    previewAbleCls,
    menuCls,
    fullThumbnailCls
} from './style';
import Thumbnail from './Thumbnail';
import Progress from './Progress';
import { getFileType } from './utils';

export class CardItem extends Component {
    static propTypes = {
        onRemove: PropTypes.func,
        onPreview: PropTypes.func,
        onReupload: PropTypes.func,
        locale: PropTypes.object.isRequired,
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
        const { file, onRemove } = this.props;
        onRemove(file);
    };
    renderThumbnail = isFullThumbnail => {
        const { file } = this.props;
        return <Thumbnail file={file} className={isFullThumbnail ? fullThumbnailCls : ''} />;
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
        const { onRemove, onPreview, locale, disabled, file } = this.props;
        const { status } = file;
        const removeBtn =
            !disabled && onRemove ? (
                <SvgIcon size="20px" className={actionIconCls} type="trash" onClick={this.onRemove} />
            ) : null;
        const retryBtn = !disabled ? (
            <SvgIcon size="20px" className={actionIconCls} type="refresh" onClick={this.onReupload} />
        ) : null;
        const previewBtn = onPreview ? (
            <SvgIcon size="20px" className={actionIconCls} type="eye" onClick={this.onPreview} />
        ) : null;
        const separator = <span className={separatorCls}></span>;

        switch (status) {
            case 'uploading': {
                return (
                    <div className={itemCls} key={file.uid}>
                        {this.renderThumbnail()}
                        <div className={detailCls}>
                            <Progress {...('progress' in file ? { percent: file.progress } : {})} />
                        </div>
                        {removeBtn && (
                            <div className={menuCls}>
                                <div className={actionCls}>{removeBtn}</div>
                                {this.renderName()}
                            </div>
                        )}
                    </div>
                );
            }
            case 'error': {
                return (
                    <div className={classnames(itemCls, itemErrorCls)} key={file.uid}>
                        {this.renderThumbnail()}
                        <div className={detailCls}>
                            <div className={errorCls} title={file.error + '' || locale.defaultUploadErrorTip}>
                                {file.error + '' || locale.defaultUploadErrorTip}
                            </div>
                        </div>
                        <div className={menuCls}>
                            <div className={actionCls}>
                                {retryBtn}
                                {retryBtn && removeBtn ? separator : null}
                                {removeBtn}
                            </div>
                            {this.renderName()}
                        </div>
                    </div>
                );
            }
            default: {
                const isFullThumbnail = file.thumbnailUrl || (file instanceof File && getFileType(file) === 'image');
                return (
                    <div className={classnames(itemCls, onPreview && previewAbleCls)} key={file.uid}>
                        {this.renderThumbnail(isFullThumbnail)}
                        {isFullThumbnail ? null : <div className={detailCls}>{this.renderName()}</div>}
                        {removeBtn && (
                            <div className={menuCls}>
                                <div className={actionCls}>
                                    {previewBtn}
                                    {previewBtn && removeBtn ? separator : null}
                                    {removeBtn}
                                </div>
                                {this.renderName()}
                            </div>
                        )}
                    </div>
                );
            }
        }
    }
}

export default CardItem;
