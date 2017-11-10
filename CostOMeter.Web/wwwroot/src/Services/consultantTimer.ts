export interface IConsultantTimer {
    onTick : (elapsedHours : number) => void;
    start;
    stop;
}

export interface IConsultantTimerFactory {
    createTimer(timerInterval :number) : IConsultantTimer;
}

export class ConsultantTimerFactory implements IConsultantTimerFactory {
    createTimer(timerInterval :number) :IConsultantTimer {
        return new ConsultantTimer(timerInterval);
    }
}

export class ConsultantTimer implements IConsultantTimer {
    private timer;
    private timerInterval :number;
    private lastStarted: number;

    public onTick : (elapsedHours : number) => void;
    
    constructor(timerInterval: number) {
        this.timerInterval = timerInterval;
    }

    public start() {
        this.timer = setInterval(() =>  {
            this.ticking();
        }, this.timerInterval);
    }

    public stop() {
        clearInterval(this.timer);
    }

    private ticking() {
        let elapsed = (new Date().getTime() - this.lastStarted);
        let elapsedHours = (elapsed / 1000) / 3600;
        this.onTick(elapsedHours);
    }
}