import React from 'react';

import Tabs from 'src/components/Tabs';
import Button from 'src/components/Button';

// demo start
const steps = [
    { type: 'styleType', value: 'ink' },
    { type: 'paneCount', value: 3 },
    { type: 'paneCount', value: 100 },
    { type: 'activeKey', value: '40' },
    { type: 'position', value: 'left' },
    { type: 'position', value: 'bottom' },
    { type: 'activeKey', value: '1' },
    { type: 'paneCount', value: 3 },
    { type: 'paneCount', value: 100 },
    { type: 'activeKey', value: '40' },
    { type: 'position', value: 'right' }
];
const reducer = (state, action) => {
    switch (action.type) {
        case 'position': {
            return {
                ...state,
                position: action.value
            };
        }
        case 'paneCount': {
            return {
                ...state,
                paneCount: action.value
            };
        }
        case 'activeKey': {
            return {
                ...state,
                activeKey: action.value
            };
        }
        case 'styleType': {
            return {
                ...state,
                styleType: action.value
            };
        }
        default: {
            return state;
        }
    }
};
const Demo = () => {
    const [state, dispatch] = React.useReducer(reducer, {
        position: 'top',
        paneCount: 10,
        styleType: 'default',
        activeKey: '0'
    });
    const [stepIndex, setStepIndex] = React.useState(0);

    const start = React.useCallback(() => {
        const stepInfo = steps[stepIndex];
        if (!stepInfo) return;
        dispatch(stepInfo);
        setStepIndex(stepIndex + 1);
        console.log(`dispatch ${stepInfo.type}: ${stepInfo.value}`);
    }, [stepIndex]);

    const panes = new Array(state.paneCount).fill(null).map((v, i) => {
        return {
            tab: `tab - ${i}`,
            key: i + ''
        };
    });
    const props = {
        tabBarPosition: state.position,
        activeKey: state.activeKey,
        styleType: state.styleType
    };
    return (
        <div className="demo-wrap">
            <Button onClick={start} disabled={stepIndex >= steps.length}>
                Next
            </Button>
            <Tabs
                onChange={activeKey => dispatch({ type: 'activeKey', value: activeKey })}
                style={{ height: 300, marginTop: 10 }}
                {...props}
            >
                {panes.map(pane => (
                    <Tabs.Pane key={pane.key} tab={pane.tab} style={{ padding: 16 }}>
                        Pane {pane.tab}
                    </Tabs.Pane>
                ))}
            </Tabs>
        </div>
    );
};
// demo end

export default Demo;
