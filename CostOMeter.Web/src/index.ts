import './styles/main.css';

interface CostConfiguration {
    hourlyRate: number;
    currency: string;
}

class CostOMeter {
    private config: CostConfiguration;
    private startTime: Date | null = null;
    private intervalId: number | null = null;
    private totalCost: number = 0;

    constructor() {
        this.config = {
            hourlyRate: 100,
            currency: 'USD'
        };
        this.init();
    }

    private init(): void {
        this.renderApp();
        this.bindEvents();
    }

    private renderApp(): void {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="cost-meter">
                <div class="config-section">
                    <h2>Configuration</h2>
                    <div class="form-group">
                        <label for="hourlyRate">Hourly Rate:</label>
                        <input type="number" id="hourlyRate" value="${this.config.hourlyRate}" min="0" step="0.01">
                        <select id="currency">
                            <option value="USD" ${this.config.currency === 'USD' ? 'selected' : ''}>USD</option>
                            <option value="EUR" ${this.config.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                            <option value="SEK" ${this.config.currency === 'SEK' ? 'selected' : ''}>SEK</option>
                        </select>
                    </div>
                </div>
                
                <div class="meter-section">
                    <h2>Cost Meter</h2>
                    <div class="cost-display">
                        <span class="cost-amount" id="costAmount">${this.config.currency} 0.00</span>
                    </div>
                    <div class="controls">
                        <button id="startBtn" class="btn btn-primary">Start</button>
                        <button id="stopBtn" class="btn btn-secondary" disabled>Stop</button>
                        <button id="resetBtn" class="btn btn-warning">Reset</button>
                    </div>
                    <div class="status" id="status">Ready to start</div>
                </div>
            </div>
        `;
    }

    private bindEvents(): void {
        const hourlyRateInput = document.getElementById('hourlyRate') as HTMLInputElement;
        const currencySelect = document.getElementById('currency') as HTMLSelectElement;
        const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
        const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
        const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

        hourlyRateInput?.addEventListener('change', () => {
            this.config.hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        });

        currencySelect?.addEventListener('change', () => {
            this.config.currency = currencySelect.value;
            this.updateDisplay();
        });

        startBtn?.addEventListener('click', () => this.start());
        stopBtn?.addEventListener('click', () => this.stop());
        resetBtn?.addEventListener('click', () => this.reset());
    }

    private start(): void {
        if (this.startTime) return;

        this.startTime = new Date();
        this.intervalId = window.setInterval(() => {
            this.updateCost();
        }, 1000);

        this.updateButtons(true);
        this.updateStatus('Running...');
    }

    private stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.startTime = null;
        this.updateButtons(false);
        this.updateStatus('Stopped');
    }

    private reset(): void {
        this.stop();
        this.totalCost = 0;
        this.updateDisplay();
        this.updateStatus('Ready to start');
    }

    private updateCost(): void {
        if (!this.startTime) return;

        const now = new Date();
        const elapsedHours = (now.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
        this.totalCost = elapsedHours * this.config.hourlyRate;
        this.updateDisplay();
    }

    private updateDisplay(): void {
        const costElement = document.getElementById('costAmount');
        if (costElement) {
            costElement.textContent = `${this.config.currency} ${this.totalCost.toFixed(2)}`;
        }
    }

    private updateButtons(isRunning: boolean): void {
        const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
        const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;

        if (startBtn) startBtn.disabled = isRunning;
        if (stopBtn) stopBtn.disabled = !isRunning;
    }

    private updateStatus(status: string): void {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('CostOMeter application started');
    new CostOMeter();
}); 