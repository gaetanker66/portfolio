// Skills toggle functionality
(function() {
  'use strict';

  const toggleButtons = document.querySelectorAll('.skills__toggle-btn');
  const softSkillsList = document.getElementById('softSkills');
  const hardSkillsList = document.getElementById('hardSkills');

  function switchSkills(type) {
    // Remove active class from all buttons
    toggleButtons.forEach(btn => {
      btn.classList.remove('skills__toggle-btn--active');
    });

    // Hide all lists
    softSkillsList.classList.remove('skills__list--active');
    hardSkillsList.classList.remove('skills__list--active');

    // Show selected list and activate button
    if (type === 'soft') {
      softSkillsList.classList.add('skills__list--active');
      toggleButtons[1].classList.add('skills__toggle-btn--active');
    } else {
      hardSkillsList.classList.add('skills__list--active');
      toggleButtons[0].classList.add('skills__toggle-btn--active');
    }
  }

  // Event listeners
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      switchSkills(type);
    });
  });
})();

