import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListWrap, listCls, cardListCls } from './style';
import Item from './Item';
import CardItem from './CardItem';
import { readFile, getFileType, openLink } from './utils';

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
        /** 自定义文件是否可以预览 */
        getPreviewableOfItem: PropTypes.func,
        /** 自定义文件是否可删除 */
        getRemovableOfItem: PropTypes.func,
        /** 重新上传文件 */
        handleReupload: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 是否展示缩略图 */
        thumbnail: PropTypes.bool,
        /** 卡片列表 */
        card: PropTypes.bool,
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        getRemovableOfItem: file => file?.status !== 'uploading'
    };
    onPreview = (file, index) => {
        const { onPreview } = this.props;
        if (onPreview) {
            onPreview(file, index);
        } else if (file.url) {
            openLink(file.url);
        } else {
            const w = openLink('');
            readFile(file).then(url => {
                const doc = w.document;
                const img = doc.createElement('img');
                img.src = url;
                img.style.margin = 'auto';
                img.style.display = 'block';
                doc.write(img.outerHTML);
            });
        }
    };
    /** 渲染列表项 */
    renderFileItem = (file = {}, index) => {
        const {
            getRemovableOfItem,
            onRemove,
            onPreview,
            getPreviewableOfItem,
            handleReupload,
            locale,
            thumbnail,
            disabled,
            card
        } = this.props;

        const removable = getRemovableOfItem?.(file);
        let previewable = false;
        if (file.status === 'uploading' || file.status === 'error') {
            // empty
        } else if (onPreview) {
            if (getPreviewableOfItem) {
                previewable = getPreviewableOfItem(file);
            } else {
                previewable = true;
            }
        } else if (onPreview === null) {
            previewable = false;
        } else if (file.url || (file instanceof File && getFileType(file) === 'image')) {
            previewable = true;
        }
        const itemProps = {
            onRemove: removable ? onRemove : null,
            onPreview: previewable ? this.onPreview : null,
            onReupload: handleReupload,
            locale,
            disabled,
            file,
            index
        };
        if (!card) itemProps.thumbnail = thumbnail;
        const ItemComp = card ? CardItem : Item;
        return <ItemComp key={file.uid} {...itemProps} />;
    };

    render() {
        const { fileList, card } = this.props;
        return fileList.length ? (
            <ListWrap>
                <div>
                    <div className={card ? cardListCls : listCls}>
                        {fileList.map((file, index) => this.renderFileItem(file, index))}
                    </div>
                </div>
            </ListWrap>
        ) : null;
    }
}
