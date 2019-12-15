let React = require('react');
let { hydrate } = require('react-dom');
let App = require('./components/App');
setTimeout(() => hydrate(<App />, document.querySelector("#app")) ,1000)
// timeout because the #app selector is not created until the first call is made from the server
