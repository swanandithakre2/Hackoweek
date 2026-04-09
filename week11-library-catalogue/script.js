const MAX_CAPACITY = 10;
let books = [];
let currentEditId = null;

function init() {
    books = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction", color: "#e74c3c" },
        { id: 2, title: "1984", author: "George Orwell", year: 1949, genre: "Fiction", color: "#3498db" },
        { id: 3, title: "Sapiens", author: "Yuval Noah Harari", year: 2011, genre: "History", color: "#2ecc71" },
        { id: 4, title: "Atomic Habits", author: "James Clear", year: 2018, genre: "Self-Help", color: "#9b59b6" }
    ];
    renderBooks();
    updateStats();
}

function renderBooks(searchTerm = '') {
    const grid = document.getElementById('booksGrid');
    const emptyState = document.getElementById('emptyState');
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredBooks.length === 0 && books.length === 0) {
        grid.innerHTML = `
            <div class="empty-library" id="emptyState">
                <i class="fas fa-book-reader"></i>
                <h3>Your library is empty</h3>
                <p>Add your first book to get started</p>
            </div>
        `;
        return;
    }

    if (filteredBooks.length === 0) {
        grid.innerHTML = `
            <div class="empty-library" id="emptyState">
                <i class="fas fa-search"></i>
                <h3>No books found</h3>
                <p>Try a different search term</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card">
            <div class="book-cover" style="background: ${book.color}">
                <span class="book-badge">#${book.id}</span>
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-meta">
                    <span>${book.year}</span>
                    <span class="book-genre">${book.genre}</span>
                </div>
                <div class="book-actions">
                    <button class="delete-btn" onclick="removeBook(${book.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('capacity').textContent = MAX_CAPACITY;
    document.getElementById('currentCount').textContent = books.length;
    document.getElementById('availableSlots').textContent = MAX_CAPACITY - books.length;
}

function addBook(title, author, year, genre, color) {
    if (books.length >= MAX_CAPACITY) {
        showMessage('Library is full! Remove a book first.', 'error');
        return false;
    }

    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        year: parseInt(year),
        genre: genre,
        color: color
    };

    books.push(newBook);
    renderBooks(document.getElementById('searchInput').value);
    updateStats();
    showMessage('Book added successfully!', 'success');
    return true;
}

function removeBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        const removedBook = books.splice(index, 1)[0];
        renderBooks(document.getElementById('searchInput').value);
        updateStats();
        showMessage(`"${removedBook.title}" removed from library`, 'success');
    }
}

function searchBooks(term) {
    renderBooks(term);
}

function showMessage(text, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
    
    setTimeout(() => {
        messageBox.className = 'message-box';
    }, 3000);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    searchBooks(e.target.value);
});

document.getElementById('addBookBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add New Book';
    document.getElementById('bookForm').reset();
    currentEditId = null;
    document.getElementById('bookModal').classList.add('show');
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('bookModal').classList.remove('show');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('bookModal').classList.remove('show');
});

document.getElementById('bookModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('bookModal')) {
        document.getElementById('bookModal').classList.remove('show');
    }
});

document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const year = document.getElementById('bookYear').value;
    const genre = document.getElementById('bookGenre').value;
    const color = document.querySelector('input[name="coverColor"]:checked').value;

    if (!title || !author || !year || !genre) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    const success = addBook(title, author, year, genre, color);
    
    if (success) {
        document.getElementById('bookModal').classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', init);
