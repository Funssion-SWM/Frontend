import CherryFlake from './CherryFlake';
import SnowFlake from './SnowFlake';

const FLAKE_NUM = 100;

export default function SnowContainer() {
  const arr = Array(FLAKE_NUM).fill('');
  return (
    <div className="fixed z-10 flex justify-between w-screen h-screen pointer-events-none">
      {arr.map((el, i) => {
        const animationDelay = `${Math.ceil(Math.random() * 30000)}ms`;
        const fontSize = `${Math.floor(Math.random() * 10) + 10}px`;
        const colorDepth = Math.floor(Math.random() * 3);

        return (
          <CherryFlake
            key={i}
            animationDelay={animationDelay}
            fontSize={fontSize}
            colorDepth={colorDepth}
          />
        );
      })}
    </div>
  );
}
