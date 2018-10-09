import SimpleStore from '../SimpleStore';

test('SimpleStore', () => {
    const initialState = {
        state1: 1,
        state2: 2
    };
    const store = new SimpleStore(initialState);

    expect(store.getState()).toBe(initialState);

    store.setState({
        state1: 'new 1',
        state3: 3
    });
    expect(store.getState()).toEqual({
        state1: 'new 1',
        state2: 2,
        state3: 3
    });
    expect(initialState).toEqual({
        state1: 1,
        state2: 2
    });

    let triggerStack = [];
    const listener1 = () => {
        triggerStack.push(1);
    };
    const listener2 = () => {
        triggerStack.push(2);
    };
    const listener3 = () => {
        triggerStack.push(3);
    };

    store.subscribe(listener2);
    store.subscribe(listener1);
    store.dispatch();
    expect(triggerStack).toEqual([2, 1]);

    triggerStack = [];
    var ref3 = store.subscribe(listener3);
    store.dispatch();
    expect(triggerStack).toEqual([2, 1, 3]);

    triggerStack = [];
    store.unsubscribe(listener1);
    store.dispatch();
    expect(triggerStack).toEqual([2, 3]);

    triggerStack = [];
    ref3.unsubscribe();
    store.dispatch();
    expect(triggerStack).toEqual([2]);
});
