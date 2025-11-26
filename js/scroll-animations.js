// Scroll animations avec Intersection Observer
(function() {
  'use strict';

  // Configuration
  const ANIMATION_DELAY = 50; // Délai entre chaque élément (ms)
  const ROOT_MARGIN = '0px 0px -100px 0px'; // Déclenche l'animation un peu avant que l'élément soit visible

  // Initialiser les animations
  function initScrollAnimations() {
    // Observer pour les sections principales
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: ROOT_MARGIN,
      threshold: 0.1
    });

    // Observer pour les cartes de projets avec délai
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, index * ANIMATION_DELAY);
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: ROOT_MARGIN,
      threshold: 0.1
    });

    // Observer pour les éléments de compétences
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animated-fade');
          }, index * 30); // Délai plus court pour les compétences
          skillObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: ROOT_MARGIN,
      threshold: 0.1
    });

    // Observer pour les items de timeline avec délai
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, index * ANIMATION_DELAY);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: ROOT_MARGIN,
      threshold: 0.1
    });

    // Appliquer les animations aux sections
    const heroSection = document.querySelector('.hero');
    const skillsSection = document.querySelector('.skills');
    const projectsSection = document.querySelector('.projects');
    const journeySection = document.querySelector('.journey');

    if (heroSection) {
      heroSection.classList.add('animate-on-scroll', 'fade-in-up');
      sectionObserver.observe(heroSection);
    }

    if (skillsSection) {
      skillsSection.classList.add('animate-on-scroll', 'fade-in-up');
      sectionObserver.observe(skillsSection);
    }

    if (projectsSection) {
      projectsSection.classList.add('animate-on-scroll', 'fade-in-up');
      sectionObserver.observe(projectsSection);
    }

    if (journeySection) {
      journeySection.classList.add('animate-on-scroll', 'fade-in-up');
      sectionObserver.observe(journeySection);
    }

    // Appliquer les animations aux cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.classList.add('animate-on-scroll', 'fade-in-up');
      cardObserver.observe(card);
    });

    // Appliquer les animations aux éléments de compétences
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.classList.add('animate-on-scroll', 'fade-in');
      skillObserver.observe(item);
    });

    // Appliquer les animations aux items de timeline
    const journeyItems = document.querySelectorAll('.journey__item');
    journeyItems.forEach(item => {
      item.classList.add('animate-on-scroll', 'fade-in-up');
      timelineObserver.observe(item);
    });
  }

  // Initialiser au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();

