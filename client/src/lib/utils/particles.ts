export const createSparkles = (element: HTMLElement, count: number) => {
  // Remove any existing particles first
  const existingParticles = element.querySelectorAll('.particle');
  existingParticles.forEach(particle => particle.remove());
  
  // Create new sparkle particles
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Styles
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      particle.style.background = 'radial-gradient(circle, #FFD700 20%, transparent 70%)';
      
      // Random size
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Position randomly
      let x, y;
      
      if (element.classList.contains('sparkles')) {
        // For victory sparkles, position around the center
        x = Math.random() * 300 - 150;
        y = Math.random() * 100 - 50;
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
      } else {
        // For hover sparkles, position within the element
        x = Math.random() * 100;
        y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
      }
      
      // Add animation
      particle.style.animation = `sparkle ${Math.random() * 0.5 + 1}s forwards`;
      
      element.appendChild(particle);
      
      // Remove after animation completes
      setTimeout(() => {
        if (element.contains(particle)) {
          particle.remove();
        }
      }, 1500);
    }, i * (count > 10 ? 100 : 0)); // Add delay for victory sparkles
  }
};
