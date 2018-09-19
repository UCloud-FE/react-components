const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];

export const getPlacements = (offset = 5) => {
    return {
        topLeft: {
            points: ['bl', 'tl'],
            overflow: autoAdjustOverflow,
            offset: [0, -offset],
            targetOffset
        },
        top: {
            points: ['bc', 'tc'],
            overflow: autoAdjustOverflow,
            offset: [0, -offset],
            targetOffset
        },
        topRight: {
            points: ['br', 'tr'],
            overflow: autoAdjustOverflow,
            offset: [0, -offset],
            targetOffset
        },
        bottomLeft: {
            points: ['tl', 'bl'],
            overflow: autoAdjustOverflow,
            offset: [0, offset],
            targetOffset
        },
        bottom: {
            points: ['tc', 'bc'],
            overflow: autoAdjustOverflow,
            offset: [0, offset],
            targetOffset
        },
        bottomRight: {
            points: ['tr', 'br'],
            overflow: autoAdjustOverflow,
            offset: [0, offset],
            targetOffset
        },
        leftTop: {
            points: ['tr', 'tl'],
            overflow: autoAdjustOverflow,
            offset: [-offset, 0],
            targetOffset
        },
        left: {
            points: ['cr', 'cl'],
            overflow: autoAdjustOverflow,
            offset: [-offset, 0],
            targetOffset
        },
        leftBottom: {
            points: ['br', 'bl'],
            overflow: autoAdjustOverflow,
            offset: [-offset, 0],
            targetOffset
        },
        rightTop: {
            points: ['tl', 'tr'],
            overflow: autoAdjustOverflow,
            offset: [offset, 0],
            targetOffset
        },
        right: {
            points: ['cl', 'cr'],
            overflow: autoAdjustOverflow,
            offset: [offset, 0],
            targetOffset
        },
        rightBottom: {
            points: ['bl', 'br'],
            overflow: autoAdjustOverflow,
            offset: [offset, 0],
            targetOffset
        }
    };
};

export default getPlacements();
