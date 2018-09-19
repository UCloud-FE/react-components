import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from '!url-loader!./logo.svg';

const styles = ({ fontFamily, color, fontSize }) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        fontFamily: fontFamily.base,
        fontSize: fontSize.h4,
        fontWeight: 'normal',
        color: color.baseBackground
    },
    image: {
        height: '2em',
        marginLeft: '-0.5em'
    }
});

export function LogoRenderer({ show, classes, children }) {
    return show ? (
        <h1 className={classes.logo}>
            <img className={classes.image} src={logo} />
            {children}
        </h1>
    ) : null;
}

LogoRenderer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    show: PropTypes.bool
};

export default Styled(styles)(LogoRenderer);
