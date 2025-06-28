import React, { useState, useEffect, useRef } from 'react';

interface Coordinate {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const SNAKE_START: Coordinate[] = [{ x: 8, y: 8 }];
const FOOD_START: Coordinate = { x: 12, y: 12 };
const GAME_SPEED = 150;

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
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(GAME_SPEED);
  const gameCanvas = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<Coordinate | null>(null);

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Wall collision
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x * GRID_SIZE >= (gameCanvas.current?.width ?? 0) ||
      head.y * GRID_SIZE >= (gameCanvas.current?.height ?? 0)
    ) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(prev => prev + 1);
      setSpeed(prev => Math.max(prev - 5, 50));
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const generateFood = (): Coordinate => {
    let newFood: Coordinate;
    do {
      newFood = {
        x: Math.floor(Math.random() * ((gameCanvas.current?.width ?? 0) / GRID_SIZE)),
        y: Math.floor(Math.random() * ((gameCanvas.current?.height ?? 0) / GRID_SIZE)),
      };
    } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(GAME_SPEED);
  };

  useInterval(moveSnake, gameOver ? null : speed);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
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

  // Touch controls & scroll lock
  useEffect(() => {
    const canvas = gameCanvas.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // lock scroll
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const t = e.changedTouches[0];
      const diffX = touchStartRef.current.x - t.clientX;
      const diffY = touchStartRef.current.y - t.clientY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction !== 'RIGHT') setDirection('LEFT');
        else if (diffX < 0 && direction !== 'LEFT') setDirection('RIGHT');
      } else {
        if (diffY > 0 && direction !== 'DOWN') setDirection('UP');
        else if (diffY < 0 && direction !== 'UP') setDirection('DOWN');
      }
      touchStartRef.current = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [direction]);

  // Draw
  useEffect(() => {
    const ctx = gameCanvas.current?.getContext('2d');
    if (!ctx) return;
    const width = gameCanvas.current!.width;
    const height = gameCanvas.current!.height;
    ctx.clearRect(0, 0, width, height);

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#6EE7B7' : '#34D399';
      ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      ctx.strokeStyle = '#065F46';
      ctx.strokeRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    ctx.fillStyle = '#F43F5E';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }, [snake, food]);

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body flex flex-col items-center">
        <div className="bg-white border border-base-300 rounded-lg p-4 w-full flex flex-col items-center">
          <div className="w-full flex justify-between mb-2 items-center">
            <span className="text-sm font-medium">🐍 {score}</span>
            <div className="flex items-center space-x-2">
              <button
                className="bg-green-700 hover:bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded"
                onClick={startGame}
              >
                {gameOver ? 'Restart' : 'Start'}
              </button>
              <img
                src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
                alt="React Badge"
                className="h-6"
              />
            </div>
          </div>
          <canvas
            ref={gameCanvas}
            width={400}
            height={400}
            className="bg-gray-200 border border-gray-400 rounded-sm"
            style={{ touchAction: 'none' }}
          />
          {gameOver && (
            <div className="mt-3 text-red-600 font-bold text-base">Game Over</div>
          )}
        </div>
        <div className="text-xs text-base-content opacity-40 mt-3">
          W A S D on Keyboard to move the snake
        </div>
        <div className="text-xs text-base-content opacity-40 mt-1">
          swipe anywhere on the game area on mobile device
        </div>
      </div>
    </div>
  );
};

export default GithubSnakeGame;
