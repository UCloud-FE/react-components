import React from 'react';
import PropTypes from 'prop-types';
import Pathline from 'rsg-components/Pathline';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = ({ color, fontSize, space }) => ({
    root: {
        marginBottom: space[6]
    },
    header: {
        marginBottom: space[3]
    },
    tabs: {
        marginBottom: space[3]
    },
    tabButtons: {
        marginBottom: space[1]
    },
    tabBody: {
        overflowX: 'auto',
        maxWidth: '100%',
        WebkitOverflowScrolling: 'touch'
    },
    docs: {
        color: color.base,
        fontSize: fontSize.text
    }
});

export const ReactComponentRenderer = ({
    classes,
    name,
    heading,
    pathLine,
    description,
    docs,
    examples,
    tabButtons,
    tabBody,
    filepath
}) => {
    return (
        <div className={classes.root} data-testid={`${name}-container`}>
            <header className={classes.header}>
                {heading}
                {pathLine && <Pathline>{pathLine}</Pathline>}
            </header>
            {(description || docs) && (
                <div className={classes.docs}>
                    {description}
                    {docs}
                </div>
            )}
            {tabButtons && (
                <div className={classes.tabs}>
                    <div className={classes.tabButtons}>{tabButtons}</div>
                    <div className={classes.tabBody}>{tabBody}</div>
                </div>
            )}
            {React.cloneElement(examples, {
                filepath
            })}
        </div>
    );
};

ReactComponentRenderer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    heading: PropTypes.node.isRequired,
    filepath: PropTypes.string,
    pathLine: PropTypes.string,
    tabButtons: PropTypes.node,
    tabBody: PropTypes.node,
    description: PropTypes.node,
    docs: PropTypes.node,
    examples: PropTypes.node,
    isolated: PropTypes.bool
};

export default Styled(styles)(ReactComponentRenderer);
