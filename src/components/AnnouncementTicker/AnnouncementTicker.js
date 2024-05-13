window.onload = function() {
    const ticker = document.getElementById('ticker');
    let position = ticker.clientWidth; // Initial position is at the right end of the ticker
  
    function moveTicker() {
      position--;
      ticker.style.transform = `translateX(${position}px)`;
  
      // Reset position to the right end when ticker moves out of view
      if (position < -ticker.scrollWidth) {
        position = ticker.clientWidth;
      }
  
      requestAnimationFrame(moveTicker);
    }
  
    moveTicker();
  };
  