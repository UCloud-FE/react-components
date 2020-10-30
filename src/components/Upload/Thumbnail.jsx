import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
    thumbnailCls,
    archiveIconCls,
    docsIconCls,
    imageIconCls,
    unknownIconCls,
    imageCls,
    iconWrapCls,
    iconCls
} from './style';
import { readFile, getFileType } from './utils';

import Archive from './icons/Archive';
import Docs from './icons/Docs';
import Image from './icons/Image';
import Unknown from './icons/Unknown';

const IconMap = {
    archive: Archive,
    docs: Docs,
    image: Image,
    unknown: Unknown
};

const iconClassNameMap = {
    archive: archiveIconCls,
    docs: docsIconCls,
    image: imageIconCls,
    unknown: unknownIconCls
};

const getFileIcon = (file = {}) => {
    const type = getFileType(file);
    const Icon = IconMap[type];
    const className = iconClassNameMap[type];
    return <Icon size="20px" className={classnames(iconCls, className)} />;
};

function Thumbnail({ file, className }) {
    const [thumbnailUrl, setThumbnailUrl] = useState(file.thumbnailUrl);
    useEffect(() => {
        if (file.thumbnailUrl) {
            setThumbnailUrl(file.thumbnailUrl);
        } else if (file instanceof File && getFileType(file) === 'image') {
            readFile(file).then(dataUrl => setThumbnailUrl(dataUrl));
        } else {
            setThumbnailUrl(null);
        }
        return () => {};
    }, [file]);
    return (
        <div className={classnames(thumbnailCls, className)}>
            {thumbnailUrl ? (
                <div className={imageCls} style={{ backgroundImage: `url(${thumbnailUrl})` }} />
            ) : (
                <div className={iconWrapCls}>{getFileIcon(file)}</div>
            )}
        </div>
    );
}

Thumbnail.propTypes = {
    file: PropTypes.object,
    className: PropTypes.string
};

export default Thumbnail;
