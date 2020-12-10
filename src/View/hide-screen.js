export const hideScreen = () => {
  const $allSection = document.body.querySelectorAll('section');
  $allSection.forEach((section) => (section.style.display = 'none'));
};
