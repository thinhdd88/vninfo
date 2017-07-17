import React, {Component} from 'react';
import {Link } from 'react-router'; 

// class Destination extends Component {
// 	render() {
// 		return(
// 			<li className="col-md-4 hover-effect item">
// 				<figure className="effect-lily">
// 					<img src={this.props.data.acf.image} alt={this.props.data.name} />
// 					<figcaption>
// 						<div>
// 							<h2>{this.props.data.name}</h2>
// 							<p className="description" dangerouslySetInnerHTML={ {__html: this.props.data.description} } />
// 						</div>
//                         <Link className="nav-link" to={'/destination/' + this.props.data.slug} >View more</Link>
// 					</figcaption>			
// 				</figure>
// 			</li>
// 		); 
// 	}
// }

const GridItem = ({image, title, shortDescription, url, classNames, handleClick}) => (
	<li className={classNames} onClick={handleClick} >
		<figure className="effect-lily">
			<img className="img-responsive" src={image} alt={title} />
			<figcaption>
				<div>
					<h2>{title}</h2>
					{shortDescription && (<p className="description" dangerouslySetInnerHTML={ {__html: shortDescription} } />)}
				</div>
				{url && (<Link className="nav-link" to={url} >View more</Link>)}
			</figcaption>			
		</figure>
	</li>
)

export default GridItem;

