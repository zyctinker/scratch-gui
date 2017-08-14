import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import serialports from '../../detectSerialport.js';
import styles from './serialport-selector.css';

const SerialportSelector = ({
    currentSerialport,
    onChange,
    ...props
}) => (
    <Box {...props}>
        <span className={styles.serialportName}>串口</span>
        <div className={styles.group}>
            <select
                className={styles.serialportSelect}
                value={currentSerialport}
                onChange={onChange}
            >
                {serialports.map(singleSerialport => (
                    <option
                        key={singleSerialport.comName}
                        value={singleSerialport.comName}
                    >
                        {singleSerialport.comName}
                        {console.log(singleSerialport)}
                    </option>

                ))}
            </select>
        </div>
    </Box>
);


SerialportSelector.propTypes = {
    currentSerialport: PropTypes.object,
    onChange: PropTypes.func
};

export default SerialportSelector;
