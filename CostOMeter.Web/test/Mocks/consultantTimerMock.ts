import * as Services from "../../wwwroot/src/Services/services"
import * as ViewModels from "../../wwwroot/src/ViewModels/viewModels"

export class ConsultantTimerMock implements Services.IConsultantTimer {
    public onTick : (elapsedHours : number) => void;
    public vmInstance : ViewModels.ConsultantViewModel;
    
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