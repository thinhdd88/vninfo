import React, {Component} from 'react';
import Navigation from '../nav/navigation';
import Register from '../modules/user/register';
import Login from '../modules/user/login';

class Header extends Component {
	render() {
		return(
			<header className="header">
				<nav className="navbar navbar-default">
					<div className="container">
			            <Navigation />
			            <ul className="pull-right nav navbar-nav">
				            <Register />
			            	<Login />
			            </ul>
					</div>
				</nav>
	        </header>
		); 
	}
}

export default Header;