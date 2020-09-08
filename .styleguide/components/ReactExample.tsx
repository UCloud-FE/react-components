import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransformOptions } from 'buble';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from 'react-styleguidist/lib/client/utils/compileCode';
import splitExampleCode from 'react-styleguidist/lib/client/utils/splitExampleCode';

import ThemeProvider from 'src/components/ThemeProvider';
import darkTheme from 'src/components/ThemeProvider/dark';

export let isDarkTheme = false;
let themeListeners = [];
export const toggleDarkTheme = isDark => {
    isDarkTheme = isDark;
    themeListeners.forEach(listener => {
        listener(isDarkTheme);
    });
};

interface ReactExampleProps {
    code: string;
    evalInContext(code: string): () => any;
    onError(err: Error): void;
    compilerConfig?: TransformOptions;
}

export default class ReactExample extends Component<ReactExampleProps> {
    public static propTypes = {
        code: PropTypes.string.isRequired,
        evalInContext: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        compilerConfig: PropTypes.object
    };

    state = {
        dark: isDarkTheme
    };

    constructor(props) {
        super(props);
        const listener = dark => {
            this.setState({
                dark
            });
        };
        this.removeListener = () => (themeListeners = themeListeners.filter(_listener => listener !== _listener));
        themeListeners.push(listener);
    }
    componentWillUnmount() {
        this.removeListener();
    }

    public shouldComponentUpdate(nextProps: ReactExampleProps, nextState) {
        return this.props.code !== nextProps.code || this.state.dark !== nextState.dark;
    }

    // Run example code and return the last top-level expression
    private getExampleComponent(compiledCode: string): () => any {
        return this.props.evalInContext(`
            return (function() {
                ${compiledCode}
            })();
		`);
    }

    public render() {
        const { code, compilerConfig = {}, onError } = this.props;
        const { dark } = this.state;
        const compiledCode = compileCode(code, compilerConfig, onError);
        if (!compiledCode) {
            return null;
        }

        const { example } = splitExampleCode(compiledCode);
        const ExampleComponent = this.getExampleComponent(example);
        let wrappedComponent = (
            <Wrapper onError={onError}>
                <ExampleComponent />
            </Wrapper>
        );
        if (dark) {
            wrappedComponent = <ThemeProvider theme={darkTheme}>{wrappedComponent}</ThemeProvider>;
        }
        return wrappedComponent;
    }
}
