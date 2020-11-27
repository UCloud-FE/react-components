import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import List from './List';
import DropzoneIcon from './icons/Dropzone';
import UploadIcon from './icons/Upload';
import {
    DropZoneWrap,
    dropzoneTipCls,
    dropzoneMaskTipCls,
    dropzoneTipMainCls,
    dropzoneTipSubCls,
    iconCls,
    dragingCls
} from './style';

export default class DropZone extends PureComponent {
    static propTypes = {
        fileList: PropTypes.array,
        locale: PropTypes.object,
        onSelect: PropTypes.func,
        disabled: PropTypes.bool
    };

    state = {
        draging: false
    };
    renderList = () => {
        return (
            <>
                <List {...this.props} />
                <div className={dropzoneMaskTipCls}>{this.renderTip()}</div>
            </>
        );
    };
    renderTip = () => {
        const { locale } = this.props;
        const { draging } = this.state;
        return (
            <div className={dropzoneTipCls}>
                {draging ? (
                    <UploadIcon size="52px" className={iconCls} />
                ) : (
                    <DropzoneIcon size="52px" className={iconCls} />
                )}
                <div className={dropzoneTipMainCls}>{locale.dropzoneMainTip}</div>
                <div className={dropzoneTipSubCls}>{locale.dropzoneSubTip}</div>
            </div>
        );
    };
    dragPath = [];
    onDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        const { onSelect, disabled } = this.props;
        if (disabled) return;
        onSelect(e.dataTransfer.files);
        this.dragPath = [];
        this.setState({
            draging: false
        });
    };
    onDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    onDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        const { disabled } = this.props;
        if (disabled) return;
        this.dragPath.push(e.target);
        if (!this.state.draging) {
            this.setState({
                draging: true
            });
        }
    };
    onDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragPath = this.dragPath.filter(p => p !== e.target);
        if (this.state.draging && !this.dragPath.length) {
            this.setState({
                draging: false
            });
        }
    };
    onDragEnd = () => {
        this.dragPath = [];
        this.setState({
            draging: false
        });
    };
    render() {
        const { fileList } = this.props;
        const { draging } = this.state;

        return (
            <DropZoneWrap
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
                className={classnames(draging && dragingCls)}
            >
                {fileList.length > 0 ? this.renderList() : this.renderTip()}
            </DropZoneWrap>
        );
    }
}
