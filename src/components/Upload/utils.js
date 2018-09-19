const readFile = file => {
    const _reader = new FileReader();
    return new Promise((resolve, reject) => {
        _reader.onload = e => {
            resolve(e.target.result);
        };
        _reader.onerror = e => {
            reject(e);
        };
        _reader.readAsDataURL(file);
    });
};
export { readFile };
