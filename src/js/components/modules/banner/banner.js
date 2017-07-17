import React, {Component} from 'react';
import $ from 'jquery';
import slick from 'slick-carousel';

const banners = [
  {"image":"banner1.jpg"},
  {"image":"banner2.jpg"},
  {"image":"banner3.jpg"}
]

class Banner extends Component {

  componentDidMount() {
    //this.$el = $(this.el);
    $(this.el).slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false
    });
  }

  componentWillUnmount() {
    $(this.el).slick('unslick');
    console.log(1);
  }

  render() {
    return (
      <div id="home-banner" className="slick" ref={el => this.el = el} >
        { 
          banners.map((val, key) => {
            return (
              <div data-depth="0.20" key={key} ><img alt="" src={"/images/banner/" + val.image} /></div>
            )
          })
        }
      </div>
    )
  }
}

export default Banner;