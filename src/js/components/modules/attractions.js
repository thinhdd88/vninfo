import React, {Component} from 'react'
import LocationGoogleMap from './googleMap'
import config from '../../config';

import _ from 'lodash'

class Attractions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			markers: [],
			center: this.props.center,
			zoom: 11
		}
	}

	fetchApi(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data});
                _.forEach(data, (value) => {
				   this.getLatLng(value.name);
				});
        	})
    }

    getAttractions() {
	    var url = `${config.apiURL}/attractions/?fields=id,slug,name,acf`;
	    this.fetchApi(url);
	}

	componentWillMount() {
        this.getAttractions();
    }

	// Not need function if have Lat Lng on API data
    getLatLng(name, updateMapCenter = false, index){
		const geocoder = new google.maps.Geocoder();
		var marker = '';
        geocoder.geocode( { 'address': name + ', ' + this.props.destination }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                var latlng = results[0].geometry.location;
                marker = latlng.toJSON();
                if(!updateMapCenter) {
                	// Update map center when click attracton
                	this.setState(function(prevState, props) {
	                	prevState.markers.push(marker);
					});
                } else {
            	// Update map center, map zoom
            	// Show marker Info box
            	this.setState({
            		center: {lat: marker.lat, lng: marker.lng},
            		zoom: 13,
            		markers: this.state.markers.map( (marker, key) => {
				        if (key == index) {
				        	marker.showInfo = true;
				        }
				        return marker;
			      	}),
            	});
                }
            }
            else {
                console.log("Geocode was not successful: " + name);
            }
        });
    }

	render() {
		return(
			<div>
				<LocationGoogleMap
			        containerElement={
			          <div className="attraction-map" style={{ height: `400px` }} />
			        }
			        mapElement={
			          <div style={{ height: `400px` }} />
			        }
			        center={this.state.center}
			        markers={this.state.markers}
			        zoom={this.state.zoom}
		    	/>	
				<ul className="list-attraction row list-unstyled">
					{	
						this.state.data.map( (item, key) => {
							return (
								<li key={key} className="col-md-2 col-xs-3 item" onClick={this.getLatLng.bind(this, item.name, true, key)} >
									<div className="content">
										{item.acf.image && (<img 
											className="img-responsive"
											width={item.acf.image.sizes.thumbnail} height={item.acf.image.sizes.thumbnail}
											src={item.acf.image.sizes.thumbnail} alt={item.name} />)}
										<h3>{item.name}</h3>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default Attractions;


