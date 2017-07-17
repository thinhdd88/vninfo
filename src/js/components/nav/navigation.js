import React from 'react'
import { Link } from 'react-router'
import config from '../../config'

class Navigation extends React.Component {
   render() {
      return (
          <Link activeClassName="active" onlyActiveOnIndex={true} className="nav-link" to="/">
          	<img alt="" src={config.logo} />
          </Link>
      );
   }
}

export default Navigation;
