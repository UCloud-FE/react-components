import _ from 'lodash';

export const getColumnConfigFromLocalStorage = (columnConfigKey, defaultConfig) => {
    if (typeof localStorage === 'undefined' || localStorage === null) {
        return defaultConfig;
    }
    const localConfig = JSON.parse(localStorage.getItem(columnConfigKey));
    if (localConfig) {
        return _.merge({}, defaultConfig, localConfig);
    } else {
        return defaultConfig;
    }
};

export const setColumnConfigToLocalStorage = (columnConfigKey, config) => {
    if (typeof localStorage === 'undefined' || localStorage === null) {
        return;
    }
    localStorage.setItem(
        columnConfigKey,
        JSON.stringify(
            _.mapValues(config, v => ({
                hidden: v.hidden
            }))
        )
    );
};
