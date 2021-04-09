import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  SimpleGrid,
  Circle,
  useEventListener,
} from "@chakra-ui/react";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import styled from "@emotion/styled";
// import "./App.css";
import { boolean } from "yargs";
import { useState } from "react";

const AnimationBox: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);
  return (
    <Box
      onMouseOver={() => {
        setAnimate(true);
      }}
      h="400px"
      w="400px"
      animation={animate ? "roll 2s" : undefined}
      onAnimationEnd={() => {
        setAnimate(false);
      }}
      css={{
        "backdrop-filter":
          "blur(10px) saturate(100%) contrast(45%) brightness(130%)",
      }}
      backgroundColor="rgba(255, 255, 255, 0.3)"
      borderRadius="30px"
      backgroundBlendMode="hard-light"
    ></Box>
  );
};

const AnimatedCircle: React.FC<{ duration: number; scale: number }> = ({
  duration,
  scale,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [offsetY, setOffSetY] = useState(0);
  const [offsetX, setOffSetX] = useState(0);
  const [initialMouseDownY, setInitialMouseDownY] = useState(0);
  const [initialMouseDownX, setInitialMouseDownX] = useState(0);
  useEventListener("mouseup", () => {
    setClicked(false);
  });
  useEventListener("mousemove", ({ clientX, clientY }) => {
    if (clicked) {
      console.log({ x: clientX, y: clientY });
      setOffSetX(clientX);
      setOffSetY(clientY);
    }
  });

  return (
    <Circle
      draggable={true}
      css={{ animationPlayState: clicked ? "paused" : "initial" }}
      animation={`orbit ${duration}s linear infinite`}
      background="linear-gradient(to top right, #01110A, #52FFB6)"
      h={100 * scale}
      w={100 * scale}
      top={`"50%" + ${offsetY}px`}
      left={`"50%" + ${offsetX}px`}
      position="absolute"
      onMouseDown={({ clientX, clientY }) => {
        setInitialMouseDownX(clientX);
        setInitialMouseDownY(clientY);
        setClicked(true);
      }}
      onMouseUp={() => setClicked(false)}
    ></Circle>
  );
};
export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        //keyframes can be added inline
        css={`
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(200px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(200px) rotate(-360deg);
            }
          }
          @keyframes roll {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(90deg);
            }
          }
        `}
        justify="center"
        align="center"
        background="#12141d"
        h="100vh"
        w="100vw"
        position="relative"
      >
        <AnimatedCircle duration={5} scale={1} />
        <AnimatedCircle duration={10} scale={1.2} />
        <AnimatedCircle duration={15} scale={1.5} />

        <SimpleGrid columns={2} gap={6}>
          <AnimationBox />
          <AnimationBox />
          <AnimationBox />
          <AnimationBox />
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
};
