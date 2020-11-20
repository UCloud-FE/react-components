import memo from './memo';

export const camel2Kebab = memo((s: string = ''): string => {
    return s.replace(/([A-Z])/g, (v, n, i) => {
        const r = v.toLowerCase() || '';
        return i === 0 ? r : '-' + r;
    });
});
