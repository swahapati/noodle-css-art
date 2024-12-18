// src/App.js
import React, { useRef, Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
// import styles from './App.css';

const NOODLES_MAP = {
  RICE: {
    colors: ['#deb887', '#cdaa7d'],
    thickness: 5,
  }
};

const Bowl = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  height: 75px;
  width: 150px;
  border-radius: 5px 5px 75px 75px;
  background: #CB2706   ;
  transform: translate(-50%, 0);
  z-index: 0;
`;

const getNoodleStyle = ({ thickness, colors }) => {
  return `background: repeating-radial-gradient(${colors[1]}, ${
    colors[1]
  } ${thickness}px, ${colors[0]} ${thickness}px, ${colors[0]} ${
    thickness * 2
  }px);`;
};

const BowlNoodles = styled.div`
  border-radius: 100%;
  ${p => getNoodleStyle(p.noodles)};
  position: absolute;
  top: 0%;
  height: 100px;
  width: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
  
  &:before,
  &:after {
    content: '';
    height: 100px;
    width: 100px;
    border-radius: 100%;
    position: absolute;
    ${p => getNoodleStyle(p.noodles)};
  }

  &:before {
    top: 25%;
    left: 18%;
  }
  &:after {
    top: 30%;
    left: -18%;
  }
`;

const Container = styled.div`
  height: 150px;
  width: 150px;
  position: absolute;
  background-color: rgb(6, 122, 83);
  bottom: calc(50vh + 20px);
  left: 50vw;
  transform: translate(-50%, 50%);
  overflow: visible; 
  &:after {
    content: '';
    height: 10%;
    width: 80%;
    position: absolute;
    bottom: 0;
    background: #6e1010;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 5px;
  }
`;

const steaming = keyframes`
  0% {
    opacity: 0.2;
    transform: translateY(0) scale(1);
    clip-path: ellipse(40% 60% at 50% 50%);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-70px) scale(1.2);
    clip-path: ellipse(50% 70% at 50% 50%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(1.5);
    clip-path: ellipse(60% 80% at 50% 50%);
  }
`;

const Steam = styled.div`
  position: absolute;
  top: ${p => p.top + 30}px;
  left: ${p => p.left}px;
  color: transparent;
  font-size: 20px;
  text-decoration-line: none;
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  opacity: 0.2;
  transform: scale(1);
  animation: ${steaming} 4s -${p => p.delay * 0.75}s infinite ease-in-out;
`;

const Noodles = styled.div`
  position: absolute; 
  left: 50%;
  top: -20%;
  height: 120px;
  width: 50px;
  border-radius: 5px 5px 0 0;
  transform: translate(-50%, 0);

  ${({ type: { thickness, colors } }) =>
    `background: repeating-linear-gradient(
      90deg, 
      ${colors[0]}, 
      ${colors[0]} ${thickness}px, 
      ${colors[1]} ${thickness}px, 
      ${colors[1]} ${2 * thickness}px
    )`
  };
`;

const ChopsticksFront = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: 120px;
  width: 120px;
  height: 10px;
  border-radius: 5px;
  background: ${props => props.color || '#8b4513'};
  transform-origin: bottom left;
  transform: rotate(-30deg) translate(-50%, 0);
`;

const ChopsticksBack = styled.div`
position: absolute;
top: ${props => props.top}px;
left: 120px;
width: 120px;
height: 10px;
border-radius: 5px;
background: ${props => props.color || '#8b4513'};
transform-origin: bottom left;
transform: rotate(2deg) translate(-50%, 0);
`;

const Egg = styled.div`
  aspect-ratio: 3 / 4;
  border-radius: 100% / 125% 125% 80% 80%;
  position: absolute;
  left:${props => props.left}px;
  bottom: ${props => props.top}px;
  height: 40px;
  background: #fff;
  transform-origin: bottom left;
  transform: rotate(0deg) translate(-50%, 0);
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    border-radius: 50%;
    background: #EAEA03;
    aspect-ratio:1;
  }
  
`;


const NarutomakiWrapper = styled.div`
  position: absolute;
  width:40px;
  aspect-ratio: 1;
  top: 45%;
  left: 55%;
  transform: translate(-50%, -50%);
  background:transparent;
`;

const NarutomakiSVG = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_2" data-name="Layer 2">
      <path
        d="m28.437 13.322a4.369 4.369 0 0 1 -.755-1.117 4.586 4.586 0 0 1 -.059-1.419 4.286 4.286 0 0 0 -.523-2.852 4.3 4.3 0 0 0 -2.568-1.385 4.485 4.485 0 0 1 -1.313-.485 4.4 4.4 0 0 1 -.85-1.085 4.319 4.319 0 0 0 -2.128-2.031 4.246 4.246 0 0 0 -2.844.384 4.636 4.636 0 0 1 -1.397.388 4.636 4.636 0 0 1 -1.4-.388 4.253 4.253 0 0 0 -2.844-.384 4.323 4.323 0 0 0 -2.125 2.031 4.423 4.423 0 0 1 -.849 1.085 4.493 4.493 0 0 1 -1.314.485 4.3 4.3 0 0 0 -2.568 1.385 4.286 4.286 0 0 0 -.523 2.852 4.58 4.58 0 0 1 -.059 1.414 4.381 4.381 0 0 1 -.755 1.118 4.341 4.341 0 0 0 -1.283 2.682 4.338 4.338 0 0 0 1.283 2.678 4.369 4.369 0 0 1 .755 1.122 4.588 4.588 0 0 1 .059 1.419 4.286 4.286 0 0 0 .523 2.847 4.3 4.3 0 0 0 2.568 1.385 4.485 4.485 0 0 1 1.313.485 4.4 4.4 0 0 1 .85 1.085 4.319 4.319 0 0 0 2.128 2.031 4.261 4.261 0 0 0 2.844-.384 4.636 4.636 0 0 1 1.397-.388 4.636 4.636 0 0 1 1.4.388 5.843 5.843 0 0 0 2.042.507 2.585 2.585 0 0 0 .8-.123 4.323 4.323 0 0 0 2.128-2.031 4.423 4.423 0 0 1 .849-1.085 4.493 4.493 0 0 1 1.314-.485 4.3 4.3 0 0 0 2.567-1.385 4.286 4.286 0 0 0 .523-2.852 4.58 4.58 0 0 1 .059-1.418 4.381 4.381 0 0 1 .755-1.118 4.341 4.341 0 0 0 1.283-2.678 4.338 4.338 0 0 0 -1.283-2.678z"
        fill="#eaf6ff"
      />
      <path
        d="m17.7 21.764a4.464 4.464 0 0 1 -4.135-2.464c-.738-1.667-.348-4.126 1.392-4.989a3.308 3.308 0 0 1 2.636-.041 1 1 0 1 1 -.7 1.875 1.466 1.466 0 0 0 -1.052-.042c-.6.3-.833 1.526-.451 2.387a2.613 2.613 0 0 0 2.642 1.258c1.619-.214 2.765-2.061 2.819-3.653.08-2.322-2.172-3.654-2.268-3.71a4.9 4.9 0 0 0 -5.156.3 5.705 5.705 0 0 0 -1.645 6.809 1 1 0 1 1 -1.857.744 7.715 7.715 0 0 1 2.355-9.191 6.93 6.93 0 0 1 7.306-.389c.347.2 3.382 2.062 3.264 5.509-.082 2.4-1.848 5.21-4.556 5.567a4.547 4.547 0 0 1 -.594.03z"
        fill="#ff5773"
      />
    </g>
  </svg>
);

const NarutomakiComponent = () => (
  <NarutomakiWrapper>
    <NarutomakiSVG />
  </NarutomakiWrapper>
);

const BowlComponent = ({ noodles, chopsticksRef }) => (
  <Container>
   <ChopsticksBack ref={chopsticksRef.back} top={-28} left={80} zIndex={1} color="#a0522d" />
        

          <AnimatedNoodles type={NOODLES_MAP.RICE} />
          <ChopsticksFront ref={chopsticksRef.front} top={-40} left={40} zIndex={2} color="#8b4513" />
         
    <BowlNoodles noodles={noodles} />
    <Egg top={65} left={55}/>
    <Egg top={65} left={35} />
    <NarutomakiComponent />

    <Bowl>
      <Steam delay={1} top={-65} left={55} />
      <Steam delay={2} top={-90} left={20} />
      <Steam delay={3} top={-55} left={-5} />

    </Bowl>
  </Container>
);


BowlComponent.propTypes = {
  noodles: PropTypes.shape({
    thickness: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  chopsticksRef: PropTypes.shape({
    front: PropTypes.object.isRequired,
    back: PropTypes.object.isRequired,
  }).isRequired,
};

const AnimatedNoodles = ({ type }) => {
  const noodlesRef = useRef(null);

  useEffect(() => {
    gsap.to(noodlesRef.current, {
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 2,
    });
  }, []);

  return <Noodles ref={noodlesRef} type={type} />;
};

const Scene = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: rgb(6, 122, 83);
`;

const App = () => {
  const chopsticksRef = {
    front: useRef(null),
    back: useRef(null),
  };

  

  useEffect(() => {
    gsap.to(chopsticksRef.front.current, {
      y: 0,
      repeat: -1,
      yoyo: true,
      rotate: -20,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'power1.inOut',
    });

    gsap.to(chopsticksRef.back.current, {
      y: 0,
      repeat: -1,
      yoyo: true,
      rotate: -20,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <Fragment>
      <Scene>
        <BowlComponent noodles={NOODLES_MAP.RICE} chopsticksRef={chopsticksRef} />
      </Scene>
    </Fragment>
  );
};

export default App;
