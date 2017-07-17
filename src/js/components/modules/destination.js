import React, {Component} from 'react'
import CommentForm from './commentForm'
import Attractions from './attractions'
import Destinations from './destinations'

const Destination = ({detail}) => {
	const geocoder = detail.metadata.martygeocoderlatlng && detail.metadata.martygeocoderlatlng[0].slice(1, -1).split(',');

	const position = geocoder && { 
		lat: parseFloat(geocoder[0]), 
		lng: parseFloat(geocoder[1])
	}

	return (
		<div className="destination-detail">
			<div style={{ backgroundImage: `url(${detail.acf.main_image})` }} className="destination-banner">
				<img src={detail.acf.main_image} alt={detail.title.redered} />
				<div className="destination-title">
					<h1 className="container">{detail.title.rendered}</h1>
				</div>
			</div> 

			<div className="container">
				<div className="row">
					<div className="col-sm-9 pull-right">
						<div className="description" 
							 dangerouslySetInnerHTML={ {__html: detail.content.rendered} } />
						<Attractions 
							destination={detail.title.rendered} 
							attractions={detail.attractions} 
							center={position} />
					</div>
					<div className="col-sm-3 pull-left">
						<Destinations showAsMenu={true} />
						<CommentForm postId={detail.id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Destination;