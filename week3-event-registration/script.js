document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const college = document.getElementById('college');
    const eventSelect = document.getElementById('event');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const collegeError = document.getElementById('collegeError');
    const eventError = document.getElementById('eventError');
    
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    collegeError.textContent = '';
    eventError.textContent = '';
    
    fullName.classList.remove('error');
    email.classList.remove('error');
    phone.classList.remove('error');
    college.classList.remove('error');
    eventSelect.classList.remove('error');
    
    if (!fullName.value.trim()) {
        nameError.textContent = 'Please enter your full name';
        fullName.classList.add('error');
        isValid = false;
    } else if (fullName.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        fullName.classList.add('error');
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Please enter your email address';
        email.classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('error');
        isValid = false;
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!phone.value.trim()) {
        phoneError.textContent = 'Please enter your phone number';
        phone.classList.add('error');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phone.classList.add('error');
        isValid = false;
    }
    
    if (!college.value.trim()) {
        collegeError.textContent = 'Please enter your college name';
        college.classList.add('error');
        isValid = false;
    }
    
    if (!eventSelect.value) {
        eventError.textContent = 'Please select an event';
        eventSelect.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        const regId = 'TF' + Date.now().toString().slice(-6);
        document.getElementById('regId').textContent = regId;
        document.getElementById('successModal').classList.add('show');
        
        this.reset();
    }
});

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
