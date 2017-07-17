import React, { Component } from 'react';
import Destination from '../modules/destination';
import config from '../../config';

class DestinationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            destination: []
        }
    }

    getDestination(slug) {
        $('.ts-spinner').fadeIn(300);
        var url = `${config.apiURL}/destinations/?slug=${slug}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    destination: data
                })
            })
    }

    componentWillMount() {
        this.getDestination(this.props.params.slug);
    }

    componentWillReceiveProps(nextProps) {
        this.getDestination(nextProps.params.slug);
    }

    componentDidUpdate() {
        setTimeout(() => { $('.ts-spinner').fadeOut(300) }, 800);
    }

    render() {
        console.log(this.state.destination);
        if(this.state.destination[0]){
            return ( 
                <Destination detail={this.state.destination[0]} /> 
            );
        } 
        else{
            return false;
        }
        
    }
}

export default DestinationPage;