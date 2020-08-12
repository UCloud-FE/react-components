import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

const ContainerContext = createReactContext();

export default ContainerContext;

export const { Consumer, Provider } = ContainerContext;

export class InhertProvider extends PureComponent {
    static propTypes = {
        value: PropTypes.object
    };
    render() {
        const { value, ...rest } = this.props;
        return (
            <Consumer>
                {context => {
                    return <Provider value={{ ...value, ...context }} {...rest} />;
                }}
            </Consumer>
        );
    }
}
