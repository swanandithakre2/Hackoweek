document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '80px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');
    const name = inputs[0].value;
    
    alert(`Thanks ${name}! We'll contact you soon with more information.`);
    this.reset();
});
