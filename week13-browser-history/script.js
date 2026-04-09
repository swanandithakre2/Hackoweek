// Stack Class for Browser History
class BrowserStack {
    constructor() {
        this.items = [];
    }

    // Push URL to stack (visit page)
    push(url) {
        this.items.push(url);
    }

    // Pop from stack (go back)
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    // Peek at top item (current page)
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    // Check if empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get size
    size() {
        return this.items.length;
    }

    // Get all items
    getAll() {
        return [...this.items];
    }

    // Clear stack
    clear() {
        this.items = [];
    }
}

// Browser History Simulator
class BrowserHistory {
    constructor() {
        this.backStack = new BrowserStack();  // Main history stack
        this.forwardStack = new BrowserStack(); // Forward stack
        this.currentPage = null;
        this.visitHistory = [];
    }

    // Visit a new page
    visit(url, icon = 'fa-globe') {
        if (this.currentPage) {
            this.backStack.push({ url: this.currentPage.url, icon: this.currentPage.icon });
        }
        
        this.currentPage = { url, icon, timestamp: new Date() };
        this.forwardStack.clear();
        this.visitHistory.push({ url, icon, timestamp: new Date() });
        
        this.updateUI();
    }

    // Go back
    goBack() {
        if (!this.canGoBack()) return null;
        
        const page = this.backStack.pop();
        this.forwardStack.push(this.currentPage);
        this.currentPage = page;
        this.updateUI();
        return page;
    }

    // Go forward
    goForward() {
        if (!this.canGoForward()) return null;
        
        const page = this.forwardStack.pop();
        this.backStack.push(this.currentPage);
        this.currentPage = page;
        this.updateUI();
        return page;
    }

    // Can go back?
    canGoBack() {
        return !this.backStack.isEmpty();
    }

    // Can go forward?
    canGoForward() {
        return !this.forwardStack.isEmpty();
    }

    // Get current page
    getCurrentPage() {
        return this.currentPage;
    }

    // Update UI
    updateUI() {
        // Update current page display
        const urlBar = document.getElementById('currentUrl');
        const browserContent = document.getElementById('browserContent');
        const current = this.getCurrentPage();
        
        if (current) {
            urlBar.textContent = current.url;
            browserContent.innerHTML = `
                <div class="welcome-page">
                    <i class="fas ${current.icon} globe-icon"></i>
                    <h2>${current.url}</h2>
                    <p>Page loaded successfully</p>
                </div>
            `;
        } else {
            urlBar.textContent = 'about:blank';
            browserContent.innerHTML = `
                <div class="welcome-page">
                    <i class="fas fa-globe globe-icon"></i>
                    <h2>Welcome to BrowserSim</h2>
                    <p>Visit pages and navigate back/forward using the stack</p>
                </div>
            `;
        }

        // Update navigation buttons
        document.getElementById('backBtn').disabled = !this.canGoBack();
        document.getElementById('forwardBtn').disabled = !this.canGoForward();

        // Update stack visualization
        this.updateStackVisualization();
        
        // Update history
        this.updateHistory();

        // Update stack info
        document.getElementById('stackSize').textContent = this.backStack.size();
    }

    updateStackVisualization() {
        const container = document.getElementById('stackContainer');
        const items = this.backStack.getAll().reverse();
        
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-stack">Stack is empty</div>';
        } else {
            container.innerHTML = items.map((item, index) => `
                <div class="stack-item ${index === items.length - 1 ? 'top-item' : ''}">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.url}</span>
                    <span class="index">#${items.length - 1 - index}</span>
                </div>
            `).join('');
        }

        const top = this.backStack.peek();
        document.getElementById('stackTop').textContent = top ? top.url : 'NULL';
        document.getElementById('stackSizeDisplay').textContent = this.backStack.size();
    }

    updateHistory() {
        const list = document.getElementById('historyList');
        
        if (this.visitHistory.length === 0) {
            list.innerHTML = '<p class="empty-history">No pages visited yet</p>';
            return;
        }

        list.innerHTML = this.visitHistory.map((item, index) => `
            <div class="history-item">
                <i class="fas ${item.icon}"></i>
                <span>${item.url}</span>
                <span class="time">${formatTime(item.timestamp)}</span>
            </div>
        `).join('');
    }
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Quick pages data
const quickPages = [
    { url: 'google.com', icon: 'fa-google' },
    { url: 'github.com', icon: 'fa-github' },
    { url: 'youtube.com', icon: 'fa-youtube' },
    { url: 'wikipedia.org', icon: 'fa-wikipedia-w' },
    { url: 'twitter.com', icon: 'fa-twitter' },
    { url: 'stackoverflow.com', icon: 'fa-stack-overflow' },
    { url: 'linkedin.com', icon: 'fa-linkedin' },
    { url: 'amazon.com', icon: 'fa-amazon' }
];

// Initialize browser
const browser = new BrowserHistory();

// Render quick pages
function renderQuickPages() {
    const list = document.getElementById('pagesList');
    list.innerHTML = quickPages.map(page => `
        <div class="page-item" onclick="visitPage('${page.url}', '${page.icon}')">
            <i class="fab ${page.icon}"></i>
            <span>${page.url}</span>
        </div>
    `).join('');
}

// Visit page
function visitPage(url, icon) {
    browser.visit(url, icon);
    showMessage(`Visited: ${url}`);
}

// Go back
function goBack() {
    const page = browser.goBack();
    if (page) {
        showMessage(`Navigated back to: ${page.url}`);
    }
}

// Go forward
function goForward() {
    const page = browser.goForward();
    if (page) {
        showMessage(`Navigated forward to: ${page.url}`);
    }
}

// Go home
function goHome() {
    browser.visit('home.com', 'fa-home');
    showMessage('Navigated to home');
}

// Show message
function showMessage(text) {
    const toast = document.getElementById('messageToast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuickPages();
    browser.updateUI();
});
