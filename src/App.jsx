import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform  } from "framer-motion";

const colors = ['#FFBE00', '#FA6922', '#00C2B6', '#FFFFFF', '#FF608C', '#E30512', '#1939BE'];

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`${id}.png`} alt="jj" />
      </div>
      <h6>book {id}</h6>
    </section>
  );
}

export default function App() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const nextColorIndex = Math.floor(scrollYProgress.get() * colors.length);
      setCurrentColorIndex(nextColorIndex);
      document.body.style.backgroundColor = colors[nextColorIndex];
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress]);

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((image) => (
        <Image id={image} key={image} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
