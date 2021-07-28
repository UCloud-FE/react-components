const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];

export const getPlacements = (offset = 5, adjust = true) => {
    return {
        topLeft: {
            points: ['bl', 'tl'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, -offset],
            targetOffset
        },
        top: {
            points: ['bc', 'tc'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, -offset],
            targetOffset
        },
        topRight: {
            points: ['br', 'tr'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, -offset],
            targetOffset
        },
        bottomLeft: {
            points: ['tl', 'bl'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, offset],
            targetOffset
        },
        bottom: {
            points: ['tc', 'bc'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, offset],
            targetOffset
        },
        bottomRight: {
            points: ['tr', 'br'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [0, offset],
            targetOffset
        },
        leftTop: {
            points: ['tr', 'tl'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [-offset, 0],
            targetOffset
        },
        left: {
            points: ['cr', 'cl'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [-offset, 0],
            targetOffset
        },
        leftBottom: {
            points: ['br', 'bl'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [-offset, 0],
            targetOffset
        },
        rightTop: {
            points: ['tl', 'tr'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [offset, 0],
            targetOffset
        },
        right: {
            points: ['cl', 'cr'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [offset, 0],
            targetOffset
        },
        rightBottom: {
            points: ['bl', 'br'],
            overflow: adjust ? autoAdjustOverflow : {},
            offset: [offset, 0],
            targetOffset
        }
    };
};

export default getPlacements();
