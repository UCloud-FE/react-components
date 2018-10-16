import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import generateError from 'utils/generateError';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import Selector from './Selector';
import List from './List';
import LOCALE from './locale/zh_CN';

const fileShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    size: PropTypes.number,
    type: PropTypes.string,
    status: PropTypes.string
});

/**
 * 文件上传控件
 */
@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Upload' })
export default class Upload extends PureComponent {
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
        this.state = {
            fileList: props.fileList || props.defaultFileList || []
        };
    }
    static propTypes = {
        /**
         * 文件列表变化时的回调，如新增、删除等操作
         * @param {Object[]} fileList - 文件列表
         * @param {string} fileList[].name - 文件名称
         * @param {string} fileList[].uid - 文件uid
         * @param {number} fileList[].size - 文件的大小
         * @param {string} fileList[].type - 文件的类型，MIME
         * @param {string} fileList[].status - 文件的上传状态，只有传入handleUpload时才有的属性[uploading,success,error]
         */
        onChange: PropTypes.func,
        /**
         * 正在添加文件时的回调
         * @param {Object[]} fileList - 文件列表
         * @returns 是否应用添加操作，返回false时不触发添加
         */
        onAdd: PropTypes.func,
        /**
         * 正在删除文件时的回调
         * @param {Object} file - 删除的文件
         * @param {number} index - 删除文件的索引
         * @returns 是否应用删除操作，返回false时不触发删除
         */
        onRemove: PropTypes.func,
        /**
         * 选中或读取文件错误回调
         * @param {Object} error - 错误信息
         * @param {string} error.message - 错误的具体信息
         * @param {string} error.name - 错误的类型，包括FileTypeError-文件类型错误、FileSizeError-文件大小错误、FileMaxCountError-文件数量错误，以及其他可能出现的原生错误
         */
        onError: PropTypes.func,
        /**
         * 预览操作
         * @param {Object} file - 预览的文件
         * @param {number} index - 预览文件的索引
         */
        onPreview: PropTypes.func,
        /**
         * 定义上传操作，受控组件中不起作用请自行处理
         * @param {Object} file - 上传的文件
         */
        handleUpload: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 是否可以多选 */
        multiple: PropTypes.bool,
        /**
         * 可接受的文件类型, MIME
         * [input accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
         */
        accept: PropTypes.string,
        /** 文件大小限制 */
        maxSize: PropTypes.number,
        /** 文件数量限制 */
        maxCount: PropTypes.number,
        /** 自定义选择控件 */
        selector: PropTypes.node,
        /**
         * 文件列表展示类型
         *
         * none - 隐藏文件列表
         * text - 展示文件名称列表
         */
        listType: PropTypes.oneOf(['none', 'text']),
        /** 默认文件列表，非受控组件使用，初始化时才有效 */
        defaultFileList: PropTypes.arrayOf(fileShape),
        /** 文件列表，传入后变为受控组件 */
        fileList: PropTypes.arrayOf(fileShape),
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        onChange: () => {},
        onAdd: () => {},
        onRemove: () => {},
        onError: () => {},
        listType: 'text'
    };
    componentWillReceiveProps = nextProps => {
        /** 检查props是否更改了controlled类型 */
        /* eslint-disable no-console */
        if (!this.IS_CONTROLLED && nextProps.fileList !== undefined) {
            console.error('You are changing a uncontrolled Upload to be controlled, which may cause a lot of problem');
        } else if (this.IS_CONTROLLED && nextProps.fileList === undefined) {
            console.error('You are changing a controlled Upload to be uncontrolled, which may cause a lot of problem');
        }
        /* eslint-enable no-console */
    };

    /** 处理添加文件 */
    onAdd = files => {
        const { maxCount, onAdd } = this.props;
        if (onAdd(files) === false) {
            return;
        }
        let fileList = this.getFileList();
        if (fileList.length + files.length > maxCount) {
            this.onError(generateError(`max file count is ${maxCount}`, 'FileMaxCountError'));
            return;
        }
        fileList = fileList.concat(files);
        this.onChange(fileList, () => this.handleFilesUpload(files));
    };
    /** 处理文件上传 */
    handleFilesUpload = files => {
        const { handleUpload } = this.props;
        if (!handleUpload) return;
        files.forEach(file => {
            file.status = 'uploading';
            handleUpload(file)
                .then(() => {
                    file.status = 'success';
                })
                .catch(() => {
                    file.status = 'error';
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
        onError(error);
    };
    /** 获取文件列表 */
    getFileList = () => {
        return (this.props.fileList || this.state.fileList).slice();
    };
    render() {
        const { disabled, multiple, accept, maxSize, selector, listType, onPreview, locale, ...rest } = this.props;
        /** clean unused rest props for div */
        ['maxCount', 'onChange', 'onAdd', 'onRemove', 'handleUpload', 'onError', 'defaultFileList', 'fileList'].forEach(
            key => {
                delete rest[key];
            }
        );
        const fileList = this.getFileList();
        return (
            <div {...rest}>
                <Selector
                    onSelect={this.onAdd}
                    onError={this.onError}
                    disabled={disabled}
                    multiple={multiple}
                    accept={accept}
                    maxSize={maxSize}
                    selector={selector}
                    locale={locale}
                />
                {listType !== 'none' && (
                    <List
                        fileList={fileList}
                        onRemove={this.onRemove}
                        onPreview={onPreview}
                        handleReupload={file => this.handleFilesUpload([file])}
                        disabled={disabled}
                        locale={locale}
                    />
                )}
            </div>
        );
    }
}

export { Selector, List };
