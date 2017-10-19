///<reference path="../Models/Consultant.ts" />
namespace ViewModels {
    export class CostOMeterViewModel {
        consultants: Models.Consultant[] = [];
        timePassed: number;
        isRunning: boolean;
        timeInterval: number;
        debugText: string;
        totalCost: number;
        totalHourlyCost: number;
        timer;        
        updated;

        constructor(timeInterval: number) {
            this.timeInterval = timeInterval;
            this.timePassed = 0;

            this.debugText = "Hi from vm!";
        }

        public run() {
            console.log('Starting calculator');
            this.isRunning = true;

            let startTime = new Date().getTime();
            let prevElapsed = this.timePassed;
            this.timer = setInterval(() => {
                this.timePassed = new Date().getTime() - startTime + prevElapsed;                
                this.totalCost = this.calculateCurrentCost();
                this.updated();
            }, this.timeInterval);
        }

        public stop() {
            console.log("Stopping calculator");
            this.isRunning = false;
            clearInterval(this.timer);
        }

        public addConsultant(name :string, cost :number) {
            this.consultants.push(new Models.Consultant(cost, name));
        }

        private calculateTotalHourlyCost() :number {
            let totalHourlyCostNow = 0;
            for (let cons of this.consultants) {
                totalHourlyCostNow = totalHourlyCostNow + cons.hourlyCost;
            }
            this.totalHourlyCost = totalHourlyCostNow;
            return totalHourlyCostNow;
        }

        private calculateCurrentCost() :number {
            let hours = (this.timePassed / 1000) / 3600;
            return hours * this.calculateTotalHourlyCost();
        }

        public printStats()
        {
            let logLine = 'time passed: ' + (this.timePassed / 1000) + " | current cost: " + this.totalCost + " | total hourly cost: " + this.totalHourlyCost;
            console.log(logLine);
        }
        
    }
}
