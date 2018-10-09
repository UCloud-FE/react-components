export default class SimpleStore {
    constructor(initialState) {
        return createStore(initialState);
    }
}

const createStore = initialState => {
    let state = initialState;
    const listeners = [];

    function setState(partial) {
        state = { ...state, ...partial };
    }

    function getState() {
        return state;
    }

    function dispatch() {
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    function subscribe(listener) {
        listeners.push(listener);

        return {
            unsubscribe: () => unsubscribe(listener)
        };
    }
    function unsubscribe(listener) {
        const index = listeners.indexOf(listener);
        index >= 0 && listeners.splice(index, 1);
    }

    return {
        setState,
        getState,
        subscribe,
        unsubscribe,
        dispatch
    };
};
