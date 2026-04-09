// Contact Book Class with Array and Binary Search
class ContactBook {
    constructor() {
        this.contacts = [];
    }

    // Add contact to array
    add(contact) {
        this.contacts.push(contact);
        this.sortContacts();
    }

    // Remove contact by name
    remove(name) {
        const index = this.contacts.findIndex(c => 
            c.name.toLowerCase() === name.toLowerCase()
        );
        if (index !== -1) {
            return this.contacts.splice(index, 1)[0];
        }
        return null;
    }

    // Sort contacts alphabetically
    sortContacts() {
        this.contacts.sort((a, b) => 
            a.name.localeCompare(b.name)
        );
    }

    // Binary Search implementation
    binarySearch(name) {
        const searchName = name.toLowerCase();
        let left = 0;
        let right = this.contacts.length - 1;
        const steps = [];

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midName = this.contacts[mid].name.toLowerCase();

            steps.push({
                type: 'checking',
                left: left,
                right: right,
                mid: mid,
                midName: midName,
                message: `Checking middle: "${this.contacts[mid].name}" at index ${mid}`
            });

            if (midName === searchName) {
                steps.push({
                    type: 'found',
                    index: mid,
                    contact: this.contacts[mid],
                    message: `Found "${this.contacts[mid].name}" at index ${mid}!`
                });
                return { found: true, index: mid, contact: this.contacts[mid], steps };
            }

            if (midName < searchName) {
                steps.push({
                    type: 'eliminated',
                    range: [left, mid],
                    message: `"${this.contacts[mid].name}" < "${name}" - Eliminating left half`
                });
                left = mid + 1;
            } else {
                steps.push({
                    type: 'eliminated',
                    range: [mid, right],
                    message: `"${this.contacts[mid].name}" > "${name}" - Eliminating right half`
                });
                right = mid - 1;
            }
        }

        steps.push({
            type: 'not_found',
            message: `"${name}" not found in contacts`
        });

        return { found: false, steps };
    }

    // Get all contacts
    getAll() {
        return [...this.contacts];
    }

    // Get contact by index
    getByIndex(index) {
        return this.contacts[index] || null;
    }

    // Get size
    size() {
        return this.contacts.length;
    }
}

// Initialize contact book
const contactBook = new ContactBook();

// Avatar colors
const avatarColors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
    '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
    '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'
];

// Get random avatar color
function getAvatarColor(name) {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        'Friend': '#22c55e',
        'Family': '#f59e0b',
        'Work': '#3b82f6',
        'Other': '#8b5cf6'
    };
    return colors[category] || '#8b5cf6';
}

// Show message
function showMessage(text) {
    const toast = document.getElementById('messageToast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Add contact
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const category = document.getElementById('contactCategory').value;

    if (name && phone) {
        contactBook.add({
            name,
            phone,
            email,
            category
        });
        
        document.getElementById('contactForm').reset();
        renderContacts();
        showMessage(`Contact "${name}" added!`);
    }
});

// Render contacts
function renderContacts(highlightIndex = -1) {
    const grid = document.getElementById('contactsGrid');
    const contacts = contactBook.getAll();
    
    document.getElementById('contactCount').textContent = contacts.length;

    if (contacts.length === 0) {
        grid.innerHTML = `
            <div class="empty-contacts">
                <i class="fas fa-user-friends"></i>
                <h4>No contacts yet</h4>
                <p>Add your first contact above</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = contacts.map((contact, index) => `
        <div class="contact-card ${index === highlightIndex ? 'found' : ''}" id="contact-${index}">
            <div class="contact-avatar" style="background: ${getAvatarColor(contact.name)}">
                ${contact.name.charAt(0).toUpperCase()}
            </div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-phone">
                    <i class="fas fa-phone"></i> ${contact.phone}
                </div>
                ${contact.email ? `<div class="contact-email"><i class="fas fa-envelope"></i> ${contact.email}</div>` : ''}
            </div>
            <div class="contact-actions">
                <button class="delete-btn" onclick="deleteContact('${contact.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Delete contact
function deleteContact(name) {
    const removed = contactBook.remove(name);
    if (removed) {
        renderContacts();
        showMessage(`Contact "${removed.name}" deleted`);
    }
}

// Sort contacts
function sortContacts() {
    contactBook.sortContacts();
    renderContacts();
    showMessage('Contacts sorted alphabetically');
}

// Perform binary search
function performBinarySearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    
    if (!searchInput) {
        showMessage('Please enter a name to search');
        return;
    }

    if (contactBook.size() === 0) {
        showMessage('No contacts to search');
        return;
    }

    const result = contactBook.binarySearch(searchInput);
    displaySearchSteps(result.steps, result.found ? result.index : -1);
    
    if (result.found) {
        showMessage(`Found "${result.contact.name}"!`);
        renderContacts(result.index);
        
        // Scroll to contact
        setTimeout(() => {
            const element = document.getElementById(`contact-${result.index}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, result.steps.length * 500);
    } else {
        showMessage(`"${searchInput}" not found`);
        renderContacts();
    }
}

// Display search steps
function displaySearchSteps(steps, foundIndex) {
    const container = document.getElementById('searchSteps');
    container.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `search-step ${step.type}`;
            
            let icon = 'fa-arrows-alt-h';
            if (step.type === 'checking') icon = 'fa-search';
            if (step.type === 'found') icon = 'fa-check-circle';
            if (step.type === 'eliminated') icon = 'fa-times';
            
            stepDiv.innerHTML = `
                <div class="step-icon"><i class="fas ${icon}"></i></div>
                <div class="step-content">
                    <div class="action">${step.message}</div>
                    ${step.index !== undefined ? `<div class="details">Index: ${step.index} | Name: "${step.contact.name}"</div>` : ''}
                </div>
            `;
            
            container.appendChild(stepDiv);
            container.scrollTop = container.scrollHeight;
        }, index * 800);
    });
}

// Scroll to letter
function scrollToLetter(letter) {
    const contacts = contactBook.getAll();
    const index = contacts.findIndex(c => 
        c.name.toUpperCase().startsWith(letter)
    );
    
    if (index !== -1) {
        const element = document.getElementById(`contact-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        showMessage(`No contacts starting with "${letter}"`);
    }
}

// Initialize with sample contacts
function initSampleContacts() {
    const samples = [
        { name: 'Amit Sharma', phone: '9876543210', email: 'amit@email.com', category: 'Friend' },
        { name: 'Priya Patel', phone: '9876543211', email: 'priya@email.com', category: 'Work' },
        { name: 'Rahul Gupta', phone: '9876543212', email: 'rahul@email.com', category: 'Family' },
        { name: 'Sneha Reddy', phone: '9876543213', email: 'sneha@email.com', category: 'Friend' },
        { name: 'Vikram Singh', phone: '9876543214', email: 'vikram@email.com', category: 'Work' },
        { name: 'Ananya Das', phone: '9876543215', email: 'ananya@email.com', category: 'Friend' },
        { name: 'Karan Mehta', phone: '9876543216', email: 'karan@email.com', category: 'Family' },
        { name: 'Neha Kapoor', phone: '9876543217', email: 'neha@email.com', category: 'Other' }
    ];
    
    samples.forEach(contact => contactBook.add(contact));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSampleContacts();
    renderContacts();
});
