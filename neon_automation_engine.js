/**
 * Neon Automation Engine
 * Handles the core logic for the Showcase & Automation Lab.
 * Manages dynamic scaling calculations, mock repository generations,
 * and the reactive state for the glassmorphism UI.
 */

class AutomationLabEngine {
    constructor() {
        this.state = {
            fileCount: 0,
            repoCount: 0,
            activeTasks: [],
            isProcessing: false,
            maxFiles: 100,
            maxRepos: 45
        };
        
        this.init();
    }

    init() {
        console.log('%c [Neon Engine] Initialized ', 'background: #000; color: #39FF14; border: 1px solid #39FF14;');
        this.setupObservers();
    }

    /**
     * Calculates the productivity score based on slider inputs
     * @param {number} files 
     * @param {number} repos 
     * @returns {string}
     */
    calculateEfficiency(files, repos) {
        const ratio = (files * repos) / (this.state.maxFiles * this.state.maxRepos);
        if (ratio > 0.8) return 'Elite';
        if (ratio > 0.5) return 'Optimal';
        return 'Stabilizing';
    }

    /**
     * Simulates a repository generation flow with visual updates
     */
    async simulateDeployment(repoName) {
        if (this.state.isProcessing) return;
        this.state.isProcessing = true;

        const steps = [
            `Initializing ${repoName}...`,
            'Injecting neon-grid protocols...',
            'Optimizing glassmorphism assets...',
            'Generating repository manifest...',
            'Deployment Complete.'
        ];

        for (const step of steps) {
            this.logToConsole(step);
            await new Promise(r => setTimeout(r, 600));
        }

        this.state.repoCount++;
        this.updateUI();
        this.state.isProcessing = false;
    }

    /**
     * Logs messages formatted for the custom neon console in the UI
     */
    logToConsole(msg) {
        const consoleElement = document.getElementById('neo-console-output');
        if (consoleElement) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.style.color = '#39FF14';
            line.style.fontFamily = 'monospace';
            line.innerHTML = `<span style="color: #fff">></span> ${msg}`;
            consoleElement.prepend(line);
        }
    }

    /**
     * Dynamically generates code snippets for the preview window
     */
    generateSnippet(language) {
        const snippets = {
            js: "const lab = () => { return 'Neon Active'; };",
            css: ".glass { backdrop-filter: blur(10px); border: 1px solid rgba(57, 255, 20, 0.3); }",
            python: "def activate_neon(): print('System Online')"
        };
        return snippets[language] || "System.out.println('Neon Lab');";
    }

    /**
     * Synchronizes internal state with the DOM
     */
    updateUI() {
        const repoCounter = document.getElementById('repo-count-display');
        const efficiencyTag = document.getElementById('efficiency-status');
        
        if (repoCounter) repoCounter.innerText = this.state.repoCount;
        if (efficiencyTag) {
            efficiencyTag.innerText = this.calculateEfficiency(this.state.fileCount, this.state.repoCount);
        }
    }

    setupObservers() {
        // Setup global event listeners for the dashboard sliders
        document.addEventListener('input', (e) => {
            if (e.target.id === 'file-slider') {
                this.state.fileCount = e.target.value;
                this.updateUI();
            }
            if (e.target.id === 'repo-slider') {
                this.state.repoCount = e.target.value;
                this.updateUI();
            }
        });
    }
}

// Instantiate the engine and expose it for specific window interactions
window.NeonEngine = new AutomationLabEngine();