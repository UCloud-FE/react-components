export default ({ colorMap }) => ({
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
    Border: {
        sm: 'none',
        md: `1px solid ${colorMap.default.border}`,
        lg: `1px solid ${colorMap.default.border}`
    },
    BtnSize: {
        sm: '22px',
        md: '20px',
        lg: '26px'
    },
    LineLeft: {
        sm: '13px',
        md: '13px',
        lg: '18px'
    },
    LineHeight: {
        sm: '12px',
        md: '10px',
        lg: '16px'
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
});
