"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { mapLandingPageImages } from "../utils/image-mapper";

export const HeroParallax = ({
  images,
}: {
  images: string[];
}) => {
  const rows = mapLandingPageImages(images);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="py-[50dvh] overflow-hidden antialiased relative flex flex-col  [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        {rows.splice(0, 5).map((row, i) => (
          <motion.div className={
            `flex space-x-20 mb-20 ${ i%2===0 ? 'flex-row-reverse space-x-reverse' : 'flex-row' }`
          }>
            {row.map((image) => (
              <ProductCard
                image={image}
                translate={ i%2===0 ? translateX : translateXReverse }
                key={image}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="text-black absolute px-6 md:px-32 flex flex-col items-start justify-center w-full h-[100dvh] left-0 top-0 z-50">
      <h1 className="text-8xl md:text-9xl font-bold">
        Nina <br />
        Ritter
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure officia libero enim aut veritatis soluta omnis, perferendis beatae eius voluptatibus ullam aperiam ab. Inventore suscipit explicabo magnam voluptatibus incidunt facere.
      </p>
    </div>
  );
};

export const ProductCard = ({
  image,
  translate,
}: {
  image: string,
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={image}
      className="group/image h-96 w-[30rem] relative flex-shrink-0"
    >
      <div
        className="block group-hover/image:shadow-2xl "
      >
        <img
          src={image}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={image}
        />
      </div>
    </motion.div>
  );
};
