import {$sectionContainer} from './input.js';

export const hideScreen = () => {
  const $allSection = document.body.querySelectorAll('section');
  $allSection.forEach((section) => (section.style.display = 'none'));
};

export const hideSectionLine = () => {
  const $sectionLines = $sectionContainer.querySelectorAll('tr');
  for (let i = 1; i < $sectionLines.length; i++) {
    $sectionLines[i].style.display = 'none';
  }
};
