import getPortList from '../detactSerialport.js';

let portList = new Array();
const updateCurrentPort = newCurrentPort => {
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
    if (typeof state === 'undefined') state = serialportInitialState;
    console.log('----action----');
    console.log(action);
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
