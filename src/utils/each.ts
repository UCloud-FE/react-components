export default function <T>(arr: T[], func: (item: T) => void) {
    const l = arr.length;
    for (let i = 0; i < l; i++) {
        const item = arr[i];
        func(item);
    }
}
