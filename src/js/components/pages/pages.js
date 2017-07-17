import React from 'react';
import {Link } from 'react-router'; 
import config from '../../config';

class PageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pageContent: []
    }
  }

  getPages(pageName){
    $('.ts-spinner').fadeIn(300);
  	var url = `${config.apiURL}/pages/?slug=${pageName}`;
  	fetch(url)
  		.then((res) => res.json())
  		.then((data) => {
  		    this.setState({
  		      pageContent: data
  		    })
  		})
  }

  componentWillMount() {
    this.getPages(this.props.params.pageName);
  }

  componentWillReceiveProps(nextProps) {
    this.getPages(nextProps.params.pageName);
  }

  componentDidUpdate() {
      setTimeout(() => {$('.ts-spinner').fadeOut(300)}, 800); 
  }

  render() {
      return (
        <div className="container cms-page-content">
          {
            this.state.pageContent.map(function(item, key){
              return (
                  <div key={key} className="description" dangerouslySetInnerHTML={ {__html: item.content.rendered} } />
              )
            })
          }
        </div>
      );
  }
}

export default PageDetail;
