import {Container, Row, Col, Carousel} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import '../App.css';



// images
import firstSlideImage from '../images/herskin.jpg';
import secondSlideImage from '../images/7days.jpg';




export default function Banner() {
  return (
    <div className="banner-wrapper">
      <Container>
        <Row className="align-items-center banner-row">
          <Col xs={12} md={6} className="order-md-2 order-first">
            <div className="carousel-wrapper">
              <Carousel nextIcon={null} prevIcon={null} indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100 carousel-image "
                    src={firstSlideImage}
                    alt="Herskin"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 carousel-image"
                    src={secondSlideImage}
                    alt="Second slide"
                  />
                </Carousel.Item>
                
              </Carousel>
            </div>
          </Col>
          <Col xs={12} md={6} className="order-md-1">
            <div className="banner-content">
              <h1 className="banner-title text-center text-md-start mt-5">WELCOME TO ALAPAAP_</h1>
              <p className="banner-paragraph mt-3 text-center text-md-start">
                We offer different kinds of beauty products, slimming, and many more.
              </p>
              <p className="banner-paragraph text-center text-md-start">
                Follow us and get a P10 discount!!
              </p>
              <p className="banner-paragraph text-center text-md-start">HAPPY SHOPPING!!</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}