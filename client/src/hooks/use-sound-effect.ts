import { useCallback } from 'react';

export function useSoundEffect() {
  const playClickSound = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1418/1418-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(error => console.error('Error playing sound:', error));
  }, []);
  
  const playWinSound = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1191/1191-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(error => console.error('Error playing sound:', error));
  }, []);
  
  return {
    playClickSound,
    playWinSound
  };
}
