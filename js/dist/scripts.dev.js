"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('JavaScript is working!');
}); // card content loading

/***********************
 *    Helper Functions   *
 ***********************/

function mapNumberRange(n, a, b, c, d) {
  return (n - a) * (d - c) / (b - a) + c;
}
/***********************
 *        Setup        *
 ***********************/


function setup() {
  Array.from(document.querySelectorAll('.card')).map(function (cardEl) {
    return initCard(cardEl);
  });
}
/***********************
 *      initCard       *
 ***********************/


function initCard(card) {
  var cardContent = card.querySelector('.card__content');
  var gloss = card.querySelector('.card__gloss');
  requestAnimationFrame(function () {
    gloss.classList.add('card__gloss--animatable');
  });
  card.addEventListener('mousemove', function (e) {
    var pointerX = e.clientX;
    var pointerY = e.clientY;
    var cardRect = card.getBoundingClientRect();
    var halfWidth = cardRect.width / 2;
    var halfHeight = cardRect.height / 2;
    var cardCenterX = cardRect.left + halfWidth;
    var cardCenterY = cardRect.top + halfHeight;
    var deltaX = pointerX - cardCenterX;
    var deltaY = pointerY - cardCenterY;
    var distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    var maxDistance = Math.max(halfWidth, halfHeight);
    var degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10);
    var rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1);
    var ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1);
    cardContent.style.transform = "perspective(400px) rotate3d(".concat(-rx, ", ").concat(ry, ", 0, ").concat(degree, "deg)");
    gloss.style.transform = "translate(".concat(-ry * 100, "%, ").concat(-rx * 100, "%) scale(2.4)");
    gloss.style.opacity = "".concat(mapNumberRange(distanceToCenter, 0, maxDistance, 0, 0.6));
  });
  card.addEventListener('mouseleave', function () {
    cardContent.style = null;
    gloss.style.opacity = 0;
  });
}
/***********************
 *      Start Here     *
 ***********************/


setup();
document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.product-card');
  cards.forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('visible');
    }, index * 100); // Delay each card's appearance
  });
}); // customer reviews tab 

document.addEventListener('DOMContentLoaded', function () {
  var tiles = document.querySelectorAll('.review-tile');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  tiles.forEach(function (tile) {
    observer.observe(tile);
  });
});
//# sourceMappingURL=scripts.dev.js.map
