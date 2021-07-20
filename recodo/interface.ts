export interface ConfigInfo {
    type: string;
    options?: [];
    optionToProps?: (option: any) => any;
}

export interface Config {
    [key: string]: string | [] | ConfigInfo;
}
