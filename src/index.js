import React from "react";
import ReactDOM from "react-dom";
import TagManager from 'react-gtm-module'
import NextApp from './NextApp';
import * as serviceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const tagManagerArgs = {
    gtmId: 'GTM-NQS8XXKH' //'G-K4Q0KRCMVX'
}
TagManager.initialize(tagManagerArgs);
ReactDOM.render(<NextApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
