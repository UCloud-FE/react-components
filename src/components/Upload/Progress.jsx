import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RProgress from 'src/components/Progress';
import { progressWrapCls, progressCls } from './style';

export class Progress extends Component {
    constructor(props) {
        super(props);
        if (!('percent' in props)) {
            this.seed = Math.random() * 10 + 1;
            this.simulatePercent();
        }
    }
    static propTypes = {
        file: PropTypes.object,
        percent: PropTypes.number
    };
    state = {
        percent: 0
    };
    simulatePercent = () => {
        this.timer = setTimeout(() => {
            let newPercent = this.state.percent + Math.random() * this.seed;
            if (newPercent > 99) newPercent = 99;
            this.setState(
                {
                    percent: newPercent
                },
                () => {
                    newPercent < 99 && this.simulatePercent();
                }
            );
        }, Math.random() * 1000 + 100);
    };
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const { percent: propsPercent } = this.props;
        const { percent } = this.state;
        return (
            <div className={progressWrapCls}>
                <RProgress
                    className={progressCls}
                    percent={'percent' in this.props ? propsPercent : percent}
                    format={null}
                />
            </div>
        );
    }
}

export default Progress;
