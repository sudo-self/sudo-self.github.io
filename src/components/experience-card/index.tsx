import React, { useState, useEffect, useRef } from 'react';

interface Coordinate {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const SNAKE_START = [{ x: 8, y: 8 }];
const FOOD_START = { x: 12, y: 12 };
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

const GithubSnakeGame = () => {
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

    if (
      head.x * GRID_SIZE >= gameCanvas.current!.width || head.x < 0 ||
      head.y * GRID_SIZE >= gameCanvas.current!.height || head.y < 0
    ) {
      setGameOver(true);
      return;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
      if (speed > 50) setSpeed(speed - 5);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const checkCollision = (head: Coordinate) => {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  };

  const checkFoodCollision = (foodPos: Coordinate) => {
    return snake.some(segment => segment.x === foodPos.x && segment.y === foodPos.y);
  };

  const generateFood = () => {
    let newFood: Coordinate;
    do {
      newFood = {
        x: Math.floor(Math.random() * (gameCanvas.current!.width / GRID_SIZE)),
        y: Math.floor(Math.random() * (gameCanvas.current!.height / GRID_SIZE)),
      };
    } while (checkFoodCollision(newFood));
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

  useInterval(() => {
    moveSnake();
  }, gameOver ? null : speed);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Prevent page scroll for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (key) {
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

  // Add touch controls
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      
      const startX = touchStartRef.current.x;
      const startY = touchStartRef.current.y;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Determine the primary direction of the swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0 && direction !== 'RIGHT') {
          setDirection('LEFT');
        } else if (diffX < 0 && direction !== 'LEFT') {
          setDirection('RIGHT');
        }
      } else {
        // Vertical swipe
        if (diffY > 0 && direction !== 'DOWN') {
          setDirection('UP');
        } else if (diffY < 0 && direction !== 'UP') {
          setDirection('DOWN');
        }
      }
      
      touchStartRef.current = null;
    };

    const canvas = gameCanvas.current;
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [direction]);

  useEffect(() => {
    const ctx = gameCanvas.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, gameCanvas.current!.width, gameCanvas.current!.height);

    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? '#6EE7B7' : '#34D399';
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      ctx.strokeStyle = '#065F46';
      ctx.strokeRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    ctx.fillStyle = '#F43F5E';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }, [snake, food, gameOver]);

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body flex flex-col items-center">
        <div className="bg-white border border-base-300 rounded-lg p-4 w-full flex flex-col items-center">
          <div className="w-full flex justify-between mb-2">
            <span className="text-sm font-medium text-base-content">🐍 {score}</span>
            <button
              className="bg-green-700 hover:bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded"
              onClick={startGame}
            >
              {gameOver ? 'Restart' : 'Start'}
            </button>
          </div>
          <canvas
            ref={gameCanvas}
            width={400}
            height={400}
            className="bg-gray-200 border border-gray-400 rounded-sm"
          />
          {gameOver && (
            <div className="mt-3 text-red-600 font-bold text-base">Game Over!</div>
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



