import React,{PropTypes} from 'react';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
// import axios from 'axios';
// import {login,signup} from '../actions'

var sha1 = require('sha1');
class NavLink extends React.Component {
   constructor(props, context) {
    super(props, context);
   };

   render() {
      return (
          <div onClick={this.props.handleClick}>
            {this.props.children}
          </div>
      );
   }
}


export default NavLink;
