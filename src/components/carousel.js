/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';

const width = '300px';
const height = '150px';
const Container = styled.div`
  border: 1px solid red;
  position: relative;
  overflow: hidden;
  width: ${width};
  height: ${height};
`;
const Arrow = styled.div`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.right
      ? css`
          left: 90%;
        `
      : css`
          left: 0%;
        `}
`;
class CarouselBuilder extends React.Component {}
const CarouselUI = ({ position, handleClick, children }) => (
  <Container>
    {children}
    <Arrow onClick={handleClick} data-position={position - 1}>
      {'<'}
    </Arrow>
    <Arrow right onClick={handleClick} data-position={position + 1}>
      {'>'}
    </Arrow>
  </Container>
);
const Carousel = makeCarousel(CarouselUI);

render(
  return(

  <div>
    <Carousel>
      <Slide right>
        <div>
          <h1>Slide 1</h1>
          <p>Slide Description</p>
        </div>
      </Slide>
      <Slide right>
        <div>
          <h1>Slide 2</h1>
          <p>Slide Description</p>
        </div>
      </Slide>
      <Slide right>
        <div>
          <h1>Slide 3</h1>
          <p>Slide Description</p>
        </div>
      </Slide>
    </Carousel>
  </div>
  )
);

export default CarouselBuilder;
