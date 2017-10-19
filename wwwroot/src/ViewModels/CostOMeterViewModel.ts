///<reference path="../Models/Consultant.ts" />
namespace ViewModels {
    export class CostOMeterViewModel {
        consultants: Models.Consultant[] = [];
        timePassed: number;
        isRunning: boolean;
        timeInterval: number;
        debugText: string;
        timer;

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

        private totalHourlyCost() :number {
            let totalCost = 0;
            for (let cons of this.consultants) {
                totalCost += cons.hourlyCost;
            }
            return totalCost;
        }

        private currentCost() :number {
            let hours = (this.timePassed / 1000) / 3600;
            return hours * this.totalHourlyCost();
        }

        public printStats()
        {
            let logLine = 'time passed: ' + (this.timePassed / 1000) + " | current cost: " + this.currentCost() + " | total hourly cost: " + this.totalHourlyCost();
            console.log(logLine);
        }
        
    }
}
