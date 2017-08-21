import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';
import {intlInitialState, IntlProvider} from './reducers/intl.js';

import GUI from './containers/gui.jsx';
import log from './lib/log';
import ProjectLoader from './lib/project-loader';
import reducer from './reducers/gui';

import getPortList from './detactSerialport';
import {updatePortList} from './reducers/serialport';
import styles from './index.css';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.fetchProjectId = this.fetchProjectId.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.state = {
            projectId: null,
            projectData: this.fetchProjectId().length ? null : JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
        };
    }
    componentDidMount () {
        window.addEventListener('hashchange', this.updateProject);
        this.updateProject();
        window.TimerId = setInterval(wrappersetInterval, 100);//定时器的id
        console.log(window.TimerId);
    }
    componentWillUnmount () {
        window.removeEventListener('hashchange', this.updateProject);
        clearInterval(window.TimerId);
        console.log('cleared!');
    }
    fetchProjectId () {
        return window.location.hash.substring(1);
    }
    updateProject () {
        const projectId = this.fetchProjectId();
        if (projectId !== this.state.projectId) {
            if (projectId.length < 1) {
                return this.setState({
                    projectId: projectId,
                    projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
                });
            }
            ProjectLoader.load(projectId, (err, body) => {
                if (err) return log.error(err);
                this.setState({projectData: body});
            });
            this.setState({projectId: projectId});
        }
    }
    render () {
        if (this.state.projectData === null) return null;
        return (
            <GUI
                projectData={this.state.projectData}
            />
        );
    }
}

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        throttle(300, {leading: true, trailing: true})
    )
);
const store = createStore(reducer, intlInitialState, enhancer);

var portList;
//包裹放在setInterval中的函数
const wrappersetInterval = function ()
{
    console.log('wrapper begins!');
    getPortList().then(
    portlist => {
        portList = portlist.slice();
        store.dispatch(updatePortList(portlist));
        console.log('dispatched!');
    },
    err => {
        portList = [];
    });
}

ReactDOM.render((
    <Provider store={store}>
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>
), appTarget);
