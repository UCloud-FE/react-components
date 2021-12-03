import once from './once';

const warning = (msg: string) => {
    console.error(`URC Warning: ${msg}`);
};
export default warning;

const onceWarning = (msg: string) => once(() => warning(msg));
export { onceWarning };
