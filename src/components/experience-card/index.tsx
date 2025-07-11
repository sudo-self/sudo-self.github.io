import React, { useState, useEffect, useRef } from 'react';
import EmojioneV1Snake from './EmojioneV1Snake';

interface Coordinate {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const SNAKE_START: Coordinate[] = [{ x: 8, y: 8 }];
const FOOD_START: Coordinate = { x: 12, y: 12 };
const GAME_SPEED = 150;
const FOOD_COLORS = ['#F43F5E', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

const GithubSnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_START);
  const [food, setFood] = useState<Coordinate>(FOOD_START);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(GAME_SPEED);
  const [flashSegments, setFlashSegments] = useState<boolean[]>([]);
  const [foodColorIndex, setFoodColorIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [codeText, setCodeText] = useState('');
  const gameCanvas = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<Coordinate | null>(null);

  // --- Swipe Threshold (minimum distance to count as swipe) ---
  const SWIPE_THRESHOLD = 30;

  const handleShowCode = () => {
    fetch('/GithubSnakeGame.txt')
      .then((res) => res.text())
      .then((text) => setCodeText(text))
      .catch(() => setCodeText('// Failed to load code.'));
    setShowCode(true);
  };

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x * GRID_SIZE >= (gameCanvas.current?.width ?? 0) ||
      head.y * GRID_SIZE >= (gameCanvas.current?.height ?? 0) ||
      snake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore % 3 === 0) {
        triggerFlash(newSnake.length);
        setFoodColorIndex((prev) => (prev + 1) % FOOD_COLORS.length);
      }
      setFood(generateFood());
      setSpeed((prev) => Math.max(prev - 5, 50));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const triggerFlash = (length: number) => {
    setFlashSegments(Array(length).fill(true));
    setTimeout(() => setFlashSegments([]), 300);
  };

  const generateFood = (): Coordinate => {
    let newFood: Coordinate;
    do {
      newFood = {
        x: Math.floor(
          Math.random() * ((gameCanvas.current?.width ?? 0) / GRID_SIZE)
        ),
        y: Math.floor(
          Math.random() * ((gameCanvas.current?.height ?? 0) / GRID_SIZE)
        ),
      };
    } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(GAME_SPEED);
    setFlashSegments([]);
    setFoodColorIndex(0);
    setHasStarted(true);
  };

  useInterval(moveSnake, hasStarted && !gameOver && !showCode ? speed : null);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key))
        e.preventDefault();
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'arrowdown':
        case 's':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'arrowleft':
        case 'a':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'arrowright':
        case 'd':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Touch swipe handling (updated per your request)
  useEffect(() => {
    const canvas = gameCanvas.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.pageX, y: touch.pageY };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.pageX - touchStartRef.current.x;
      const deltaY = touch.pageY - touchStartRef.current.y;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD && Math.abs(deltaY) < SWIPE_THRESHOLD) return;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== 'LEFT') setDirection('RIGHT');
        else if (deltaX < 0 && direction !== 'RIGHT') setDirection('LEFT');
      } else {
        if (deltaY > 0 && direction !== 'UP') setDirection('DOWN');
        else if (deltaY < 0 && direction !== 'DOWN') setDirection('UP');
      }

      touchStartRef.current = null; // reset after swipe
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [direction]);

  useEffect(() => {
    const canvas = gameCanvas.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const bgImage = new Image();
    bgImage.src = '/snakeBG.png';

    bgImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      snake.forEach((seg, i) => {
        ctx.fillStyle = flashSegments[i] ? '#FFEB3B' : i === 0 ? '#6EE7B7' : '#34D399';
        ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        ctx.strokeStyle = '#065F46';
        ctx.lineWidth = 2;
        ctx.strokeRect(seg.x * GRID_SIZE + 1, seg.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
      });

      ctx.fillStyle = FOOD_COLORS[foodColorIndex];
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    };
  }, [snake, food, flashSegments, foodColorIndex]);

  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      <div
        className={`relative w-full h-[540px] duration-700 transition-transform transform-style-preserve-3d ${
          showCode ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face */}
        <div
          className="absolute w-full h-full card bg-base-100 shadow-lg p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            display: !showCode ? 'flex' : 'none',
          }}
        >
          {!hasStarted ? (
            <div className="flex flex-col items-center justify-center flex-grow">
              <EmojioneV1Snake className="w-28 h-28 mb-4" />
              <h2 className="text-xl font-bold mb-2">Welcome to Snake</h2>
              <p className="mb-4 text-sm opacity-70">move the snake with the arrow keys or swipe gestures</p>
              <button className="btn btn-primary btn-lg" onClick={startGame}>
                Start Game
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center w-full">
                <EmojioneV1Snake className="h-6 w-24" />
                <span className="text-indigo-500 font-semibold text-lg select-none">🟥 {score}</span>
                <div className="flex gap-2">
                  <button
                    className={`btn btn-xs ${gameOver ? 'btn-error' : 'btn-success'}`}
                    onClick={startGame}
                  >
                    {gameOver ? 'Restart' : 'Restart'}
                  </button>
                  <button className="btn btn-xs btn-primary" onClick={handleShowCode}>
                    View Code
                  </button>
                </div>
              </div>

              <canvas
                ref={gameCanvas}
                width={400}
                height={400}
                className={`bg-gray-200 rounded border border-gray-400 shadow-inner ${
                  gameOver ? 'animate-[rumble_0.3s_infinite]' : ''
                }`}
                style={{ touchAction: 'none' }}
              />

              {gameOver && (
                <div className="text-error font-bold text-lg mt-2 select-none text-center">
                  Game Over!
                </div>
              )}
              <p className="text-xs text-base-content opacity-50 mt-4 select-none text-center">
                Use W A S D or Arrow keys to move the snake
              </p>
              <p className="text-xs text-base-content opacity-40 select-none text-center">
                GithubSnakeGame.tsx
              </p>
            </>
          )}
        </div>

        {/* Back Face (Code Viewer) */}
        <div
          className="absolute w-full h-full card bg-base-900 text-indigo-700 p-4 overflow-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: showCode ? 'block' : 'none',
          }}
        >
          <pre className="whitespace-pre-wrap font-mono text-xs max-h-[480px] overflow-auto">
            {codeText || '// Loading...'}
          </pre>
          <button
            className="btn btn-sm btn-secondary mt-4"
            onClick={() => setShowCode(false)}
          >
            Back to Game
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes rumble {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 1px) rotate(1deg); }
          75% { transform: translate(1px, 1px) rotate(0deg); }
        }
        .animate-[rumble_0.3s_infinite] {
          animation: rumble 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default GithubSnakeGame;


