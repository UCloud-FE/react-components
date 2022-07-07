const config = {
    prefixCls: 'uc-fe',
    actionListAutoAdjustment: false
};

export default config;

/** 只能在组件初始化时使用，否则会导致意外的问题 */
export const setConfig = _config => {
    Object.assign(config, _config);
};
