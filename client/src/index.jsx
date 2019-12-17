let React = require('react');
let { hydrate } = require('react-dom');
let Test = require('./components/Test');
setTimeout(() => hydrate(<Test />, document.querySelector("#root")) ,1000)
