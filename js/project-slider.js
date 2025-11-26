// Project slider modal functionality
(function() {
  'use strict';

  // Données des projets avec leurs images et liens
  const projectsData = {
    1: {
      title: 'Application E-Commerce',
      images: [
        'images/1.jpg',
        'images/2.jpg'
      ],
      siteUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project1'
    },
    2: {
      title: 'Dashboard Analytics',
      images: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg'
      ],
      siteUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project2'
    },
    3: {
      title: 'Site WordPress Custom',
      images: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.webp'
      ],
      siteUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project3'
    },
    4: {
      title: 'API RESTful',
      images: [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.webp'
      ],
      siteUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project4'
    }
  };

  const modal = document.getElementById('projectModal');
  const overlay = modal.querySelector('.project-modal__overlay');
  const closeBtn = document.getElementById('closeModal');
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const currentSlideSpan = document.getElementById('currentSlide');
  const totalSlidesSpan = document.getElementById('totalSlides');

  let currentProject = null;
  let currentSlideIndex = 0;
  let totalSlides = 0;

  // Ouvrir le modal
  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    currentProject = projectId;
    currentSlideIndex = 0;
    totalSlides = project.images.length;
    
    // Remplir le slider avec les images
    sliderTrack.innerHTML = '';
    
    project.images.forEach((imageSrc, index) => {
      const slide = document.createElement('div');
      slide.className = 'project-slider__slide';
      slide.innerHTML = `<img src="${imageSrc}" alt="${project.title} - Image ${index + 1}">`;
      sliderTrack.appendChild(slide);
    });

    // Mettre à jour le compteur
    updateCounter();
    
    // Attendre que le modal soit rendu avant de calculer les dimensions
    requestAnimationFrame(() => {
      updateSliderDimensions();
      updateSliderPosition();
    });

    // Afficher le modal
    modal.classList.add('project-modal--active');
    document.body.style.overflow = 'hidden';
    
    // Recalculer après l'affichage du modal
    setTimeout(() => {
      updateSliderDimensions();
      updateSliderPosition();
    }, 50);
  }

  // Fermer le modal
  function closeModal() {
    modal.classList.remove('project-modal--active');
    document.body.style.overflow = '';
    currentProject = null;
    currentSlideIndex = 0;
  }

  // Mettre à jour les dimensions du slider
  function updateSliderDimensions() {
    if (!currentProject) return;
    const container = sliderTrack.parentElement;
    const containerWidth = container.clientWidth;
    sliderTrack.style.width = `${totalSlides * containerWidth}px`;
    
    sliderTrack.querySelectorAll('.project-slider__slide').forEach(slide => {
      slide.style.width = `${containerWidth}px`;
    });
  }

  // Mettre à jour la position du slider
  function updateSliderPosition() {
    if (!currentProject) return;
    const container = sliderTrack.parentElement;
    const containerWidth = container.clientWidth;
    const translate = currentSlideIndex * containerWidth;
    sliderTrack.style.transform = `translateX(-${translate}px)`;
  }

  // Mettre à jour le compteur
  function updateCounter() {
    currentSlideSpan.textContent = currentSlideIndex + 1;
    totalSlidesSpan.textContent = totalSlides;
  }

  // Slide précédent
  function prevSlide() {
    if (!currentProject) return;
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
    updateCounter();
  }

  // Slide suivant
  function nextSlide() {
    if (!currentProject) return;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSliderPosition();
    updateCounter();
  }

  // Initialiser les liens des projets
  function initProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const photosButton = card.querySelector('.project-card__link--photos');
      const siteLink = card.querySelector('.project-card__link--site');
      const githubLink = card.querySelector('.project-card__link--github');
      
      if (photosButton) {
        const projectId = photosButton.getAttribute('data-project');
        photosButton.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(projectId);
        });
        
        // Mettre à jour les liens site et GitHub si disponibles
        const project = projectsData[projectId];
        if (project) {
          if (siteLink && project.siteUrl) {
            siteLink.href = project.siteUrl;
          }
          if (githubLink && project.githubUrl) {
            githubLink.href = project.githubUrl;
          }
        }
      }
    });
  }

  // Initialiser au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectLinks);
  } else {
    initProjectLinks();
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Fermer avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('project-modal--active')) {
      closeModal();
    }
    if (e.key === 'ArrowLeft' && modal.classList.contains('project-modal--active')) {
      prevSlide();
    }
    if (e.key === 'ArrowRight' && modal.classList.contains('project-modal--active')) {
      nextSlide();
    }
  });

  // Mettre à jour lors du redimensionnement
  window.addEventListener('resize', () => {
    if (currentProject) {
      updateSliderDimensions();
      updateSliderPosition();
    }
  });
})();

