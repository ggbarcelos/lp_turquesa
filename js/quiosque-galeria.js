(() => {
  const view = document.getElementById("quiosqueView");
  const buttons = [...document.querySelectorAll(".q-explore__view")];
  const status = document.querySelector(".q-explore__status");
  if (!view || !buttons.length) return;
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      view.src = button.dataset.image;
      view.alt = button.dataset.alt;
      status.textContent = `Imagem selecionada: ${button.textContent.trim()}.`;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && view.animate) {
        view.getAnimations().forEach(animation => animation.cancel());
        view.animate([{ opacity: 0.55, transform: "scale(1.025)" }, { opacity: 1, transform: "scale(1)" }], { duration: 380, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    });
  });
})();
