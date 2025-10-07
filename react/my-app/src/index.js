import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Lifecycle from './component/Classcomponent';
import Functioncomponent from './component/Functioncomponent';
import Props from './component/Propes';
import Propsclass from './component/Propesinclass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
    <Lifecycle/>
    <Functioncomponent/>
    <Props name="kishor" age="20"/>
    <Propsclass a={10} b={20}/>
  </React.StrictMode>
);

