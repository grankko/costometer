///<reference path="../Models/Consultant.ts" />
namespace ViewModels {
    export class CostOMeterViewModel {

        public consultants: Models.Consultant[] = [];
        public onTick;

        private timerInterval: number;
        private lastId: number;
        
        constructor(newTimerInterval: number) {
            this.timerInterval = newTimerInterval;
            this.lastId = 0;
        }

        public getTotalHourlyCost(): string {            
            let totalHourlySummed: number = 0;
            for (let cons of this.consultants) {
                totalHourlySummed = Number(totalHourlySummed) + Number(cons.hourlyCost);
            }

            return totalHourlySummed.toFixed(2);
        }

        public getTotalCost(): string {
            let totalCostSummed: number = 0;
            for (let cons of this.consultants) {
                totalCostSummed = Number(totalCostSummed) + Number(cons.getTotalCost());
            }

            return totalCostSummed.toFixed(2);
        }

        public getIsRunnable(): boolean {            
            if (this.consultants.length === 0)
                return false;

            return ! this.getIsRunning();            
        }

        public getIsPausable(): boolean {            
            if (this.consultants.length === 0)
                return false;

            return this.getIsRunning();            
        }

        private getIsRunning(): boolean {
            let isRunning = false;
            for (let cons of this.consultants) {
                if (cons.isRunning) {
                    isRunning = true;
                    break;
                }
            }
            return isRunning;
        }

        public startCalculator() {
            console.log('Starting calculator.');

            for (let cons of this.consultants) {
                cons.start();
            }
        }

        public stopCalculator() {
            console.log('Stopping calculator.');

            for (let cons of this.consultants) {
                cons.pause();
            }
        }

        public addConsultant(name :string, cost :number) {
           
            console.log('Adding consultant.');

            this.lastId = this.lastId + 1;
            let newConsultant = new Models.Consultant(cost, name, this.lastId, this.timerInterval);
            newConsultant.onTick = this.onTick;

            let lastConsultantIndex = this.consultants.push(newConsultant);

            console.log('Last consultant index is: ' + lastConsultantIndex);
        }

        public removeConsultant(item :Models.Consultant) {
            console.log('Removing consultant with id ' + item.id);

            let index = this.consultants.indexOf(item);
            console.log('Index of this one is: ' + index);

            this.consultants.splice(index, 1);
        }        
    }
}
