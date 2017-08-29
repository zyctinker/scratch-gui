import {list} from 'browser-serialport';
import {SerialPort} from 'browser-serialport';
window.count = false;

const getPortList = function () {
    let portList = new Array();
    const p = new Promise((resolve, reject) => {
        list((err, ports) => {
            if (err){
                console.log(err);
                reject(err);
            } else {
                portList = ports.slice();
                resolve(portList);
            }
        });
    });
    return p;
};

const praseData = data => {
    let firstByteInt = 0, secondByteInt = 0;
    let firstByte = new Array();
    let secondByte = new Array();
    for (let i = 0; i < data.length; i++) { // 解析UInt8Array
        firstByteInt = Number(data[i]);
        firstByte = firstByteInt.toString(2);
        if (firstByteInt >= 128){ // 第一个字节开头为1才能继续进行
            i++;
            if (data[i] >= 128) continue; // 第二个字节开头为1应该丢弃
            secondByteInt = Number(data[i]);
            secondByte = secondByteInt.toString(2);
            if (secondByte.length < 8){
                const initLength = secondByte.length;
                for (let j = 1; j + initLength <= 8; j++) {
                    secondByte = `0${secondByte}`;
                }
            }
            const pin = firstByte.slice(0, 5);
            switch (pin){
            case '10000':
                window.pinValue[0] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10001':
                window.pinValue[1] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10010':
                window.pinValue[2] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10011':
                window.pinValue[3] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10100':
                window.pinValue[4] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10101':
                window.pinValue[5] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10110':
                window.pinValue[6] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            case '10111':
                window.pinValue[7] = parseInt(firstByte.slice(6) + secondByte.slice(-7), 2);
                break;
            }
        } else {
            continue;
        }
    }
};
const connect = portName => {
    window.serialPort = new SerialPort(portName, {
        baudrate: 38400
    }, false);
    window.serialPort.open(error => {
        if (error) {
            console.log('failed to open: ');
            console.log(error);
        } else {
            console.log('open');
            window.serialPort.on('data', data => {
                praseData(data);
            });
        }
    });
};
const disconnect = portName => {
    window.serialPort.close(err => {
        console.log('fail to close'); console.log(err);
    });
    window.serialPort = null;
};
export {
    getPortList as default,
    connect,
    disconnect
};
