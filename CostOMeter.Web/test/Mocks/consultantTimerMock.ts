import * as Services from "../../wwwroot/src/Services/services"

export class ConsultantTimerMock implements Services.IConsultantTimer {
    public onTick : (elapsedHours : number) => void;
    
    constructor() {
    }

    public start() {

    }

    public stop() {
        
    }
}

export class TimerMockFactory implements Services.IConsultantTimerFactory {
    public createTimer() : Services.IConsultantTimer {
        return new ConsultantTimerMock();
    }
}