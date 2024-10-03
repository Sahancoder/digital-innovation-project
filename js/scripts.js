document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is working!');
});


// card content loading

/***********************
 *    Helper Functions   *
 ***********************/

function mapNumberRange(n, a, b, c, d) {
    return ((n - a) * (d - c)) / (b - a) + c
  }
  
  /***********************
   *        Setup        *
   ***********************/
  
  function setup() {
    Array.from(document.querySelectorAll('.card')).map((cardEl) =>
      initCard(cardEl)
    )
  }
  
  /***********************
   *      initCard       *
   ***********************/
  
  function initCard(card) {
    const cardContent = card.querySelector('.card__content')
    const gloss = card.querySelector('.card__gloss')
  
    requestAnimationFrame(() => {
      gloss.classList.add('card__gloss--animatable')
    })
  
    card.addEventListener('mousemove', (e) => {
      const pointerX = e.clientX
      const pointerY = e.clientY
  
      const cardRect = card.getBoundingClientRect()
  
      const halfWidth = cardRect.width / 2
      const halfHeight = cardRect.height / 2
  
      const cardCenterX = cardRect.left + halfWidth
      const cardCenterY = cardRect.top + halfHeight
  
      const deltaX = pointerX - cardCenterX
      const deltaY = pointerY - cardCenterY
  
      const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  
      const maxDistance = Math.max(halfWidth, halfHeight)
  
      const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10)
  
      const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1)
      const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1)
  
      cardContent.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`
  
      gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`
  
      gloss.style.opacity = `${mapNumberRange(
        distanceToCenter,
        0,
        maxDistance,
        0,
        0.6
      )}`
    })
  
    card.addEventListener('mouseleave', () => {
      cardContent.style = null
      gloss.style.opacity = 0
    })
  }
  
  /***********************
   *      Start Here     *
   ***********************/
  
  setup()

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100); // Delay each card's appearance
    });
});

// customer reviews tab 

document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.review-tile');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1
  });

  tiles.forEach(tile => {
      observer.observe(tile);
  });
});
