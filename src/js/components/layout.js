import React, {Component} from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Spinner = () => (
<div className="ts-spinner">
	<div className="ts-spinner-wrapper">
        <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
        </div>
    </div>
</div>);

class Layout extends Component {
	render() {
	    return (
	      <div>
	        <Header />
          	{this.props.children}
	        <Footer />
	        <Spinner />
	      </div>
	    )
  	}
}

export default Layout;