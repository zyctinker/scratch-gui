import {connect} from 'react-redux';
import SerialportSelectorComponent from '../components/serialport-selector/serialport-selector.jsx';
import {updateCurrentPort} from '../reducers/serialport.js';

const mapStateToProps = state => ({
    currentPort: state.serialport.currentPort,
    portList: state.serialport.portList
});

const mapDispatchToProps = dispatch => ({
    onChange: e => {
        e.preventDefault();
        dispatch(updateCurrentPort(e.target.value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SerialportSelectorComponent);
