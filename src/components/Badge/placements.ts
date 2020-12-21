const placements = {
    topRight: {
        points: ['cc', 'tr']
    },
    topLeft: {
        points: ['cc', 'tl']
    },
    bottomRight: {
        points: ['cc', 'br']
    },
    bottomLeft: {
        points: ['cc', 'bl']
    },
    top: {
        points: ['cc', 'tc']
    },
    bottom: {
        points: ['cc', 'bc']
    },
    left: {
        points: ['cc', 'cl']
    },
    right: {
        points: ['cc', 'cr']
    }
};

export default placements;

export const bubblePlacement = {
    points: ['bl', 'tr'],
    overflow: {
        adjustX: 1,
        adjustY: 1
    },
    offset: [0, -5]
};
