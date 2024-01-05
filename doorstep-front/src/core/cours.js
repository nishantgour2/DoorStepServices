import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import './Card.css'
const CarouselPage = () => {
  return (

    <div >
    <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
      className="z-depth-1 couru"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100 "
              src="https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">DoorStep Services</h3>
            <p>Providing The Best Service To You</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              src="https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              
              className="d-block w-100"
              alt="Second slide"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">We are Here!</h3>
            <p>Best Service, Right Time, Right People</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1545262716-31d3f7881ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1078&q=80"
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">At Your DoorStep</h3>
            <p>We feeling the joy of Serving you Best</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
    </div>
  );
}

export default CarouselPage;