import {connect, disconnect} from '../detactSerialport';
import getPortList from '../detactSerialport';

let portList = new Array();

const updateCurrentPort = newCurrentPort => {
    if (typeof (window.serialPort) !== 'undefined'){
        disconnect();
    }
    connect(newCurrentPort);
    var action = {
        type: 'UPDATE_CURRENTPORT',
        currentPort: newCurrentPort
    };
    return action;
};

const updatePortList = newPortList => {
    var action = {
        type: 'UPDATE_PORTLIST',
        portList: newPortList
    };
    return action;
};

const serialportInitialState = {
    currentPort: portList[0] ? portList[0].comName : 'err',
    portList: portList
};
const reducer = function (state, action) {
    if (typeof state === 'undefined'){//初始化串口
        state = serialportInitialState;
    }
    switch (action.type) {
    case 'UPDATE_PORTLIST':
        return Object.assign({}, state, {portList: action.portList});
    case 'UPDATE_CURRENTPORT':
        return Object.assign({}, state, {currentPort: action.currentPort});
    default:
        return state;
    }
};



export {
    reducer as default,
    updateCurrentPort,
    updatePortList
};
