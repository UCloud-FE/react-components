import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { transform } from 'buble';
import Wrapper from 'rsg-components/Wrapper';
import splitExampleCode from 'react-styleguidist/lib/utils/splitExampleCode';

import ThemeProvider from 'src/components/ThemeProvider';
import greenTheme from 'src/components/ThemeProvider/green';
import oceanTheme from 'src/components/ThemeProvider/ocean';
import darkTheme from 'src/components/ThemeProvider/dark';

/* eslint-disable no-invalid-this, react/no-multi-comp */

const FragmentTag = React.Fragment ? 'React.Fragment' : 'div';

const compileCode = (code, config) => transform(code, config).code;
const wrapCodeInFragment = code => `<${FragmentTag}>${code}</${FragmentTag}>;`;

// Wrap everything in a React component to leverage the state management
// of this component
class StateHolder extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        initialState: PropTypes.object.isRequired
    };

    state = this.props.initialState;
    setStateBinded = this.setState.bind(this);

    render() {
        return this.props.component(this.state, this.setStateBinded);
    }
}

export const themeList = {
    blue: {},
    green: greenTheme,
    ocean: oceanTheme,
    dark: darkTheme
};

export const themeColor = {
    blue: '#3555f6',
    green: greenTheme.colorList.primary,
    ocean: oceanTheme.colorList.primary,
    dark: '#111727'
};

let defaultThemeType = 'blue';
export const changeTheme = themeType => {
    defaultThemeType = themeType;
    _.each(themeListeners, listener => {
        listener(themeType);
    });
};
let themeListeners = [];

export default class ReactExample extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        evalInContext: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        compilerConfig: PropTypes.object
    };
    static contextTypes = {};
    state = {
        theme: defaultThemeType
    };
    componentDidMount() {
        const listener = themeType => {
            this.setState({
                theme: themeType
            });
        };
        this.removeListener = () => (themeListeners = _.filter(themeListeners, _listener => listener !== _listener));
        themeListeners.push(listener);
    }
    componentWillUnmount = () => {
        this.removeListener && this.removeListener();
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.code !== nextProps.code || this.state.theme !== nextState.theme;
    }

    // Eval the code to extract the value of the initial state
    getExampleInitialState(compiledCode) {
        if (compiledCode.indexOf('initialState') === -1) {
            return {};
        }

        return this.props.evalInContext(`
			var state = {}, initialState = {};
			try {
				${compiledCode};
			} catch (err) {}
			return initialState;
		`)();
    }

    // Run example code and return the last top-level expression
    getExampleComponent(compiledCode) {
        return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`);
    }

    compileCode(code) {
        try {
            const wrappedCode = code.trim().match(/^</) ? wrapCodeInFragment(code) : code;
            return compileCode(wrappedCode, this.props.compilerConfig);
        } catch (err) {
            if (this.props.onError) {
                this.props.onError(err);
            }
        }
        return false;
    }

    render() {
        const { theme } = this.state;
        const compiledCode = this.compileCode(this.props.code);
        if (!compiledCode) {
            return null;
        }
        const { head, example } = splitExampleCode(compiledCode);
        const initialState = this.getExampleInitialState(head);
        const exampleComponent = this.getExampleComponent(example);
        const wrappedComponent = (
            <ThemeProvider theme={themeList[theme]}>
                <Wrapper onError={this.props.onError}>
                    <StateHolder component={exampleComponent} initialState={initialState} />
                </Wrapper>
            </ThemeProvider>
        );
        return wrappedComponent;
    }
}
