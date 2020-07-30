import React from 'react';
import { useSpring, animated } from 'react-spring';

function Transictions({ children }) {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });
  return <animated.div style={fade}>{children}</animated.div>;
}

export { Transictions };
