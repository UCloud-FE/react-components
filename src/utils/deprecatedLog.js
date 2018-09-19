const deprecatedLog = (name, insteadName) => {
    console.error(`Deprecated: ${name} will be deprecated, please use ${insteadName} to replace`);
};

export default deprecatedLog;
