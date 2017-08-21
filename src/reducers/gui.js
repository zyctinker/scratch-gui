import {combineReducers} from 'redux';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import targetReducer from './targets';
import vmReducer from './vm';
import serialportReducer from './serialport';


export default combineReducers({
    intl: intlReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    targets: targetReducer,
    vm: vmReducer,
    serialport: serialportReducer
});
