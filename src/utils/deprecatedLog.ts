import once from './once';

const deprecatedLog = (name: string, insteadName: string) =>
    once(() => {
        console.error(`URC Deprecated: ${name} will be deprecated, please use ${insteadName} to replace`);
    });

export default deprecatedLog;
