import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import classnames from 'classnames';

export const styles = ({ space, color, fontFamily }) => ({
    para: {
        marginTop: 0,
        marginBottom: space[2],
        color: color.base,
        fontFamily: fontFamily.base,
        fontSize: 'inherit',
        lineHeight: 1.5,
        whiteSpace: 'pre-line'
    }
});

interface ParaProps extends JssInjectedProps {
    semantic?: 'p';
    children: React.ReactNode;
}

export const ParaRenderer: React.FunctionComponent<ParaProps> = ({ classes, semantic, children }) => {
    const Tag = semantic || 'div';

    return <Tag className={classnames(classes.para, 'sc-para')}>{children}</Tag>;
};

ParaRenderer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    semantic: PropTypes.oneOf(['p']),
    children: PropTypes.node.isRequired
};

export default Styled(styles)(ParaRenderer);
