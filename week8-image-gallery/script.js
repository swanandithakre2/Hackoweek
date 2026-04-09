const images = [
    { url: 'https://picsum.photos/seed/mountain/1200/800', title: 'Mountain Sunrise' },
    { url: 'https://picsum.photos/seed/ocean/1200/800', title: 'Ocean Waves' },
    { url: 'https://picsum.photos/seed/city/1200/800', title: 'City Lights' },
    { url: 'https://picsum.photos/seed/forest/1200/800', title: 'Forest Path' },
    { url: 'https://picsum.photos/seed/desert/1200/800', title: 'Desert Dunes' },
    { url: 'https://picsum.photos/seed/autumn/1200/800', title: 'Autumn Leaves' },
    { url: 'https://picsum.photos/seed/clouds/1200/800', title: 'Sky Clouds' },
    { url: 'https://picsum.photos/seed/camping/1200/800', title: 'Camping Night' },
    { url: 'https://picsum.photos/seed/waterfall/1200/800', title: 'Waterfall' }
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    const image = images[currentIndex];
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.innerHTML = `<img src="${image.url}" alt="${image.title}">`;
    lightboxCaption.textContent = image.title;
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
}

document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});
