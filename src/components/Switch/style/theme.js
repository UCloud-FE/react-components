import _ from 'lodash';

export default ({ colorMap, Height }) => {
    const switchTheme = {
        Width: {
            sm: '45px',
            md: '80px',
            lg: '100px'
        },
        Padding: {
            sm: '1px',
            md: '4px',
            lg: '4px'
        },
        BorderWidth: {
            sm: '0',
            md: '1px',
            lg: '1px'
        },
        LineLeft: {
            sm: '13px',
            md: '13px',
            lg: '18px'
        },
        Inner: {
            background: '#ebedf0',
            text: colorMap.default.text,
            border: colorMap.default.border
        },
        'Inner:checked': {
            background: '#c3f3d8',
            text: '#5cd78e',
            border: '#9fecc0'
        },
        'Inner:disabled': {
            background: '#f7f7f7',
            border: '#f7f7f7'
        },
        Line: {
            background: '#e69b9b'
        },
        'Line:checked': {
            background: '#9fecc0'
        },
        'Line:disabled': {
            background: '#f7f7f7'
        }
    };
    switchTheme.BtnSize = {};
    switchTheme.LineHeight = {};
    _.each(['sm', 'md', 'lg'], size => {
        const height = +Height[size].replace('px', '');
        const padding = +switchTheme.Padding[size].replace('px', '');
        const borderWidth = +switchTheme.BorderWidth[size].replace('px', '');
        const btnSize = height - padding * 2 - borderWidth * 2 + 2;
        const lineHeight = btnSize - 10;
        switchTheme.BtnSize[size] = btnSize + 'px';
        switchTheme.LineHeight[size] = lineHeight + 'px';
    });
    return switchTheme;
};
