// Queue Class for Print Jobs
class PrintQueue {
    constructor() {
        this.items = [];
    }

    // Enqueue - Add job to queue (FIFO)
    enqueue(job) {
        this.items.push(job);
    }

    // Dequeue - Remove first job
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    // Peek at first job
    peek() {
        if (this.isEmpty()) return null;
        return this.items[0];
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

    // Clear queue
    clear() {
        this.items = [];
    }
}

// Print Job Manager
class PrintJobManager {
    constructor() {
        this.printQueue = new PrintQueue();
        this.completedJobs = [];
        this.jobId = 1;
        this.totalPrintTime = 0;
        this.autoPrintInterval = null;
    }

    // Add new print job
    addJob(name, pages, priority = 'normal') {
        const job = {
            id: this.jobId++,
            name: name,
            pages: parseInt(pages),
            priority: priority,
            timestamp: new Date()
        };
        
        if (priority === 'high') {
            // High priority goes to front
            this.printQueue.items.unshift(job);
        } else {
            this.printQueue.enqueue(job);
        }
        
        this.updateUI();
        showMessage(`Job #${job.id} "${job.name}" added to queue`);
    }

    // Process (dequeue) next job
    processNext() {
        if (this.printQueue.isEmpty()) {
            showMessage('Queue is empty!');
            return null;
        }

        const job = this.printQueue.dequeue();
        const printTime = job.pages * 1000; // 1 second per page
        
        this.totalPrintTime += printTime;
        this.completedJobs.push({
            ...job,
            completedAt: new Date()
        });

        // Animate paper printing
        animatePrint(job);
        
        this.updateUI();
        showMessage(`Printed: "${job.name}" (${job.pages} pages)`);
        return job;
    }

    // Clear entire queue
    clearQueue() {
        this.printQueue.clear();
        this.updateUI();
        showMessage('Queue cleared!');
    }

    // Toggle auto print
    toggleAutoPrint() {
        if (this.autoPrintInterval) {
            clearInterval(this.autoPrintInterval);
            this.autoPrintInterval = null;
            return false;
        } else {
            this.autoPrintInterval = setInterval(() => {
                if (!this.printQueue.isEmpty()) {
                    this.processNext();
                } else {
                    this.toggleAutoPrint();
                }
            }, 2000);
            return true;
        }
    }

    // Get average print time
    getAvgTime() {
        if (this.completedJobs.length === 0) return 0;
        return Math.round(this.totalPrintTime / this.completedJobs.length / 1000);
    }

    // Update UI
    updateUI() {
        // Update stats
        document.getElementById('queueCount').textContent = this.printQueue.size();
        document.getElementById('completedCount').textContent = this.completedJobs.length;
        document.getElementById('avgTime').textContent = this.getAvgTime() + 's';
        
        // Update printer screen
        document.getElementById('printerScreenText').textContent = `QUEUE: ${this.printQueue.size()}`;

        // Update queue visual
        this.updateQueueVisual();
        
        // Update queue list
        this.updateQueueList();
        
        // Update completed list
        this.updateCompletedList();
        
        // Update buttons
        document.getElementById('printBtn').disabled = this.printQueue.isEmpty();
        document.getElementById('clearBtn').disabled = this.printQueue.isEmpty();
    }

    updateQueueVisual() {
        const container = document.getElementById('queueVisual');
        const items = this.printQueue.getAll();
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-queue">
                    <i class="fas fa-print"></i>
                    <p>No jobs in queue</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map((job, index) => `
            <div class="queue-item" style="${index === 0 ? 'border-color: var(--accent);' : ''}">
                <div class="job-info">
                    <i class="fas fa-file-alt"></i>
                    <span>${job.name}</span>
                    <span>(${job.pages}p)</span>
                </div>
                <span class="position ${index === 0 ? 'first' : ''}">
                    ${index === 0 ? 'NEXT' : '#' + (index + 1)}
                </span>
            </div>
        `).join('');
    }

    updateQueueList() {
        const list = document.getElementById('queueList');
        const items = this.printQueue.getAll();
        
        if (items.length === 0) {
            list.innerHTML = '<p class="empty-list">Queue is empty</p>';
            return;
        }

        list.innerHTML = items.map((job, index) => `
            <div class="queue-list-item" style="${index === 0 ? 'background: var(--primary);' : ''}">
                <span>${index + 1}. ${job.name}</span>
                <span>${job.pages}p</span>
            </div>
        `).join('');
    }

    updateCompletedList() {
        const list = document.getElementById('completedList');
        
        if (this.completedJobs.length === 0) {
            list.innerHTML = '<p class="empty-completed">No completed jobs yet</p>';
            return;
        }

        list.innerHTML = this.completedJobs.slice().reverse().slice(0, 10).map(job => `
            <div class="completed-item">
                <i class="fas fa-check-circle"></i>
                <span class="name">${job.name}</span>
                <span class="time">${formatTime(job.completedAt)}</span>
                <span class="badge">Done</span>
            </div>
        `).join('');
    }
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Animate printing
function animatePrint(job) {
    const paper = document.getElementById('currentPaper');
    paper.innerHTML = `<span>${job.name.substring(0, 15)}...</span>`;
    paper.style.animation = 'none';
    paper.offsetHeight;
    paper.style.animation = 'paperFeed 0.5s ease';
}

// Show message
function showMessage(text) {
    const toast = document.getElementById('messageToast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Process next job
function processNextJob() {
    printManager.processNext();
}

// Clear queue
function clearQueue() {
    printManager.clearQueue();
}

// Toggle auto print
let autoPrintActive = false;
function toggleAutoPrint() {
    autoPrintActive = printManager.toggleAutoPrint();
    const btn = document.getElementById('autoBtn');
    if (autoPrintActive) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto';
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-sync"></i> Auto Print';
    }
}

// Initialize
const printManager = new PrintJobManager();

// Form submission
document.getElementById('jobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('jobName').value.trim();
    const pages = document.getElementById('jobPages').value;
    const priority = document.getElementById('jobPriority').value;
    
    if (name) {
        printManager.addJob(name, pages, priority);
        document.getElementById('jobForm').reset();
    }
});

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    printManager.updateUI();
});
