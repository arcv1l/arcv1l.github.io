// Small extras: cards slide in on scroll, and clicking the name replays the typing.
document.documentElement.classList.add('js');

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// scroll-in reveal for project cards
var cards = document.querySelectorAll('.card');
if (!reduce && 'IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  cards.forEach(function (card, i) {
    card.classList.add('reveal');
    card.style.transitionDelay = (i % 3) * 0.08 + 's';
    io.observe(card);
  });
}

// click (or tap) the name to type it again
function bindReplay(el) {
  el.addEventListener('click', function () {
    if (reduce) return;
    var fresh = el.cloneNode(true);
    el.replaceWith(fresh);
    bindReplay(fresh);
  });
}
var nameEl = document.querySelector('.name');
if (nameEl) bindReplay(nameEl);
