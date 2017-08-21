import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './serialport-selector.css';

const SerialportSelector = ({
    onChange,
    currentPort,
    portList,
    ...props
}) => (
    <Box {...props}>
        <span className={styles.serialportName}>串口</span>
        <div className={styles.group}>
            <select
                className={styles.serialportSelect}
                value={currentPort}
                onChange={onChange}
            >
                {console.log('---rendering----')}
                {portList.map(singleSerialport => (
                    <option
                        key={singleSerialport.comName}
                        value={singleSerialport.comName}
                    >
                        {singleSerialport.comName}
                    </option>

                ))}
            </select>
        </div>
    </Box>
);


SerialportSelector.propTypes = {
    onChange: PropTypes.func,
    currentPort: PropTypes.string,
    portList: PropTypes.array
};

export default SerialportSelector;
