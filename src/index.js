import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import reducer from './reducer';
import AppContainer from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);


ReactDOM.render(
	<Provider store={store} >
		<AppContainer /> 
 	</Provider>, 
 document.getElementById('root'));
registerServiceWorker();
