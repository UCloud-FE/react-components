export interface ConfigInfo {
    type: string;
    desc?: string;
    options?: [];
    defaultValue?: any;
    optionToProps?: (option: any) => any;
}

export interface Config {
    [key: string]: string | [] | ConfigInfo;
}
