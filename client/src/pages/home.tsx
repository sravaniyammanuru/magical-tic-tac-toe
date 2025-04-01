import React from 'react';
import GameContainer from '@/components/ui/game-container';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-x-hidden py-8">
      <GameContainer />
    </div>
  );
};

export default Home;
