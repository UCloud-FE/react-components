import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import generateError from 'utils/generateError';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import Modal from 'src/components/Modal';
import deprecatedLog from 'src/utils/deprecatedLog';

import Selector from './Selector';
import List from './List';
import Dropzone from './Dropzone';
import LOCALE from './locale/zh_CN';
import { checkFile } from './utils';
import { UploadWrap, ErrorTipWrap } from './style';

const fileShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    size: PropTypes.number,
    type: PropTypes.string,
    status: PropTypes.string,
    previewUrl: PropTypes.string,
    thumbnailUrl: PropTypes.string
});

/**
 * 文件上传控件
 */
@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Upload' })
class Upload extends PureComponent {
    constructor(props) {
        super(props);
        /** 判定组件是否为controlled */
        if (props.fileList !== undefined) {
            if (props.defaultFileList !== undefined) {
                // eslint-disable-next-line no-console
                console.error('You can only use one of fileList and defaultFileList');
            }
            this.IS_CONTROLLED = true;
        }
        if (props.listType === 'text') {
            deprecatedLog('listType text', 'list');
        }
        this.state = {
            fileList: props.fileList || props.defaultFileList || []
        };
    }
    static propTypes = {
        /**
         * 文件列表变化时的回调，如新增、删除、上传、上传完成、进度更新等操作
         * @param {Object[]} fileList - 文件列表
         * @param {string} fileList[].name - 文件名称
         * @param {string} fileList[].uid - 文件 uid
         * @param {number} fileList[].size - 文件的大小
         * @param {string} fileList[].type - 文件的类型，MIME
         * @param {string} fileList[].status - 文件的上传状态，只有传入 handleUpload 时才有的属性 [uploading,success,error]
         * @param {number} fileList[].progress - 文件的上传进度，只有 handleUpload 中上报了 progress 才会有
         */
        onChange: PropTypes.func,
        /**
         * 正在添加文件时的回调，可通过返回值控制添加行为
         * @param {Object[]} fileList - 文件列表
         * @returns 是否应用添加操作，返回 false 时不触发添加
         */
        onAdd: PropTypes.func,
        /**
         * 正在删除文件时的回调，可通过返回值控制添加行为
         * @param {Object} file - 删除的文件
         * @param {number} index - 删除文件的索引
         * @returns 是否应用删除操作，返回 false 时不触发删除
         */
        onRemove: PropTypes.func,
        /** 自定义文件是否可删除，默认为 loading 时不可删除，如果需要都可删除可直接传入 () => true */
        getRemovableOfItem: PropTypes.func,
        /**
         * 选中或读取文件错误回调，自定义错误处理，不传时默认行为会在报错时拦截文件进入列表并弹窗提示用户
         * @param {Object} error - 错误信息
         * @param {string} error.message - 错误的具体信息
         * @param {string} error.name - 错误的类型，包括 FileTypeError - 文件类型错误、FileSizeError - 文件大小错误、FileMaxCountError - 文件数量错误，以及其他可能出现的原生错误
         */
        onError: PropTypes.func,
        /**
         * 预览操作，自定义预览操作，不传时默认为对图片可进行预览，点击会在新窗口打开图片，需要关闭默认行为可使用 null
         * @param {Object} file - 预览的文件
         * @param {number} index - 预览文件的索引
         */
        onPreview: PropTypes.func,
        /**
         * 自定义预览操作时每个文件都会调用预览，可以使用这个函数来过滤不想出现预览的文件
         * @param {Object} file - 检测的文件
         */
        getPreviewableOfItem: PropTypes.func,
        /**
         * 定义上传操作，受控组件中不起作用请自行处理
         * 应交互需求，上传中某些样式下会有进度条，需要调用 handleProgress 来更新进度，如果不调用，将会出现一个假的进度条，😂
         * @param {Object} file - 上传的文件
         * @param {function} handleProgress - 上报上传的进度，(progress) => void，在上传过程中调用 handleProgress(progress) 来更新文件进度
         */
        handleUpload: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 是否可以多选 */
        multiple: PropTypes.bool,
        /**
         * 可接受的文件类型, MIME
         * [input accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
         */
        accept: PropTypes.string,
        /** 文件大小限制 */
        maxSize: PropTypes.number,
        /** 文件数量限制 */
        maxCount: PropTypes.number,
        /** 自定义选择控件，为 null 时隐藏*/
        selector: PropTypes.node,
        /**
         * 文件列表展示类型，格式为 'list' | ['list', 'card'] | ['dropzone', 'thumbnail']
         * none - 隐藏文件列表
         * text - 展示文件名称列表
         * list - 普通列表形式，可通过第二个参数设置 thumbnail 和 card
         * dropzone - 拖拽上传区域，可通过第二个参数设置 thumbnail 和 card
         */
        listType: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        /** 默认文件列表，非受控组件使用，初始化时才有效 */
        defaultFileList: PropTypes.arrayOf(fileShape),
        /** 文件列表，传入后变为受控组件 */
        fileList: PropTypes.arrayOf(fileShape),
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            /** 列表的最大高度 */
            listMaxHeight: PropTypes.string
        }),
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        onChange: () => {},
        onAdd: () => {},
        onRemove: () => {},
        listType: 'list'
    };
    componentDidUpdate = () => {
        /** 检查props是否更改了controlled类型 */
        /* eslint-disable no-console */
        if (!this.IS_CONTROLLED && this.props.fileList !== undefined) {
            console.error('You are changing a uncontrolled Upload to be controlled, which may cause a lot of problem');
        } else if (this.IS_CONTROLLED && this.props.fileList === undefined) {
            console.error('You are changing a controlled Upload to be uncontrolled, which may cause a lot of problem');
        }
        /* eslint-enable no-console */
    };

    /** 单选 */
    onSingleSelect = files => {
        const { onAdd, onRemove } = this.props;
        if (!files.length) return;

        let fileList = this.getFileList();
        if (fileList.length) {
            const file = fileList[0];
            if (onRemove(file, 0) === false) {
                return;
            }
        }

        fileList = [files[0]];
        if (onAdd(fileList) === false) {
            return;
        }

        this.onChange(fileList, () => this.handleFilesUpload(fileList));
    };
    /** 处理添加文件 */
    onAdd = files => {
        const { maxCount, onAdd } = this.props;
        if (onAdd(files) === false) {
            return;
        }
        let fileList = this.getFileList();
        if (fileList.length + files.length > maxCount) {
            this.onMaxCountError();
        }
        fileList = fileList.concat(files);
        if (maxCount > 0) fileList = fileList.slice(0, maxCount);
        this.onChange(fileList, () => this.handleFilesUpload(files));
    };
    /** 处理文件上传 */
    handleFilesUpload = files => {
        const { handleUpload } = this.props;
        if (!handleUpload) return;
        files.forEach(file => {
            file.status = 'uploading';
            handleUpload(file, progress => {
                file.progress = progress;
                this.onChange(this.getFileList());
            })
                .then(() => {
                    file.status = 'success';
                })
                .catch(e => {
                    file.status = 'error';
                    file.error = e;
                })
                .then(() => {
                    this.onChange(this.getFileList());
                });
        });
        this.onChange(this.getFileList());
    };
    /** 处理删除文件 */
    onRemove = (file, index) => {
        const { onRemove } = this.props;
        if (onRemove(file, index) === false) {
            return;
        }
        const fileList = this.getFileList();
        fileList.splice(index, 1);
        this.onChange(fileList);
    };
    /** 处理change */
    onChange = (fileList, cb) => {
        if (!this.IS_CONTROLLED) {
            this.onUnControlledChange(fileList, cb);
        } else {
            this.onControlledChange(fileList, cb);
        }
    };
    /** 非受控处理change */
    onUnControlledChange = (fileList, cb) => {
        const { onChange } = this.props;
        this.setState(
            {
                fileList
            },
            () => {
                onChange(fileList);
                cb && cb();
            }
        );
    };
    /** 受控组件处理change */
    onControlledChange = fileList => {
        const { onChange } = this.props;
        onChange(fileList);
    };
    /** 处理错误 */
    onError = error => {
        const { onError } = this.props;

        if (onError) {
            onError(error);
        } else {
            this.onDefaultError(error);
        }
    };
    onDefaultError = Error => {
        const { locale } = this.props;
        Modal.alert(
            {
                title: locale.defaultErrorTipTitle
            },
            <ErrorTipWrap>{Error?.message}</ErrorTipWrap>
        );
    };
    onMaxCountError = () => {
        const { maxCount, locale } = this.props;
        this.onError(generateError(locale.maxCountErrorTip.replace('{maxCount}', maxCount), 'FileMaxCountError'));
    };
    onFileError = e => {
        this.onError(e);
    };
    onFileSelect = files => {
        if (!files || !files.length) return;
        const { accept, maxSize, multiple, locale } = this.props;
        files = [].slice.call(files);
        for (let index in files) {
            const file = files[index];
            const checkResult = checkFile(file, accept, maxSize, locale);
            if (checkResult !== true) {
                this.onFileError(checkResult);
                return;
            }
            file.uid = _.uniqueId('__file_uid_for_upload_components__');
        }
        if (multiple) {
            this.onAdd(files);
        } else {
            this.onSingleSelect(files);
        }
    };
    /** 获取文件列表 */
    getFileList = () => {
        return (this.props.fileList || this.state.fileList).slice();
    };
    renderList = () => {
        const { disabled, onPreview, getPreviewableOfItem, locale } = this.props;
        let { listType } = this.props;
        const fileList = this.getFileList();
        const listProps = {
            fileList,
            onRemove: this.onRemove,
            onPreview: onPreview,
            getPreviewableOfItem: getPreviewableOfItem,
            handleReupload: file => this.handleFilesUpload([file]),
            disabled,
            locale
        };
        if (!_.isArray(listType)) {
            listType = [listType];
        }
        const [type, option] = listType;
        switch (type) {
            case 'list':
                return <List {...listProps} card={option === 'card'} thumbnail={option === 'thumbnail'} />;
            case 'dropzone':
                return (
                    <Dropzone
                        {...listProps}
                        card={option === 'card'}
                        thumbnail={option === 'thumbnail'}
                        onSelect={this.onFileSelect}
                    />
                );
            case 'none':
                return null;
            case 'text':
            default:
                return <List {...listProps} />;
        }
    };
    render() {
        const { disabled, multiple, accept, maxSize, selector, locale, ...rest } = this.props;
        /** clean unused rest props for div */
        [
            'maxCount',
            'onChange',
            'onAdd',
            'onRemove',
            'handleUpload',
            'onError',
            'defaultFileList',
            'fileList',
            'listType',
            'onPreview'
        ].forEach(key => {
            delete rest[key];
        });
        return (
            <UploadWrap {...rest}>
                <Selector
                    onSelect={this.onFileSelect}
                    disabled={disabled}
                    multiple={multiple}
                    accept={accept}
                    maxSize={maxSize}
                    selector={selector}
                    locale={locale}
                />
                {this.renderList()}
            </UploadWrap>
        );
    }
}

export default Upload;
