import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4 from '../img/4.png';
import logo from '../img/logo2.png';

class MyCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <a href='https://www.bcb.gob.bo'>
                        <img 
                            className="d-block w-50; align-center"
                            src={logo}
                            alt=''
                        />
                       
                    </a>
                </Carousel.Item>
            </Carousel>

        );
    }
}

export default MyCarousel;
