(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const image = document.getElementById("heroImage");
  const images = [1, 2, 3, 4].map(number => `img/quiosque/quiosque-${number}.jpg`);
  let index = 0;
  window.setInterval(() => {
    if (document.hidden) return;
    index = (index + 1) % images.length;
    image.src = images[index];
  }, 5000);
})();
