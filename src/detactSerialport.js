import {list} from 'browser-serialport';

window.count = false;

const getPortList = function () {
    var portList = new Array();
    var p = new Promise(function (resolve, reject) {
        list((err,ports) => {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                portList = ports.slice();
                resolve(portList);
            }
        });
    });
    return p;
};
export {
    getPortList as default
};
