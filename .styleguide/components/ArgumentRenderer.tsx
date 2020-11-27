import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import doctrine from 'doctrine';

export const styles = ({ space }) => ({
    block: {
        marginBottom: space[2]
    },
    desc: {
        marginBottom: '4px',
        whiteSpace: 'pre'
    },
    descItem: {
        marginRight: '6px'
    }
});

export interface ArgumentProps {
    name?: string;
    type?: any;
    default?: string;
    description?: string;
    returns?: boolean;
    block?: boolean;
}

type ArgumentPropsWithClasses = ArgumentProps & JssInjectedProps;

export const ArgumentRenderer: React.FunctionComponent<ArgumentPropsWithClasses> = ({
    classes,
    name,
    type,
    description,
    returns,
    block,
    ...props
}) => {
    const isOptional = type && type.type === 'OptionalType';
    const defaultValue = props.default;
    if (isOptional) {
        type = type.expression;
    }
    const typeName = type ? doctrine.type.stringify(type) : '';
    const content = (
        <div className={classes.desc}>
            {returns && 'Returns'}
            {name && (
                <span className={classes.descItem}>
                    <Name>{name}</Name>
                    {type && ':'}
                </span>
            )}
            {type && (
                <Type className={classes.descItem}>
                    {typeName}
                    {isOptional && '?'}
                    {!!defaultValue && `=${defaultValue}`}
                </Type>
            )}
            <span className={classes.descItem}>{type && description && `—`}</span>
            {description && <Markdown text={`${description}`} inline />}
        </div>
    );

    if (block) {
        return <div className={classes.block}>{content}</div>;
    }

    return content;
};

ArgumentRenderer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string,
    type: PropTypes.object,
    default: PropTypes.string,
    description: PropTypes.string,
    returns: PropTypes.bool,
    block: PropTypes.bool
};

export default Styled(styles)(ArgumentRenderer);
