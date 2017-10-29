///<reference path="../ViewModels/Consultant.ts" />
namespace ViewModels {
    export class CostOMeterViewModel {

        public consultants: ViewModels.Consultant[] = [];
        public onTick;

        private timerInterval: number;
        private lastId: number;
        private deletedConsultantCosts: number;
        
        constructor(newTimerInterval: number) {
            this.timerInterval = newTimerInterval;
            this.lastId = 0;
            this.deletedConsultantCosts = 0;
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

            totalCostSummed = totalCostSummed + this.deletedConsultantCosts;

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

        public getIsRunning(): boolean {
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

        public addConsultant(name :string, cost :number) :ViewModels.Consultant {
           
            console.log('Adding consultant.');

            this.lastId = this.lastId + 1;
            let newConsultant = new ViewModels.Consultant(cost, name, this.lastId, this.timerInterval);
            newConsultant.onTick = this.onTick;

            let lastConsultantIndex = this.consultants.push(newConsultant);

            return newConsultant;
        }

        public removeConsultant(item :ViewModels.Consultant) {
            console.log('Removing consultant with id ' + item.id);
            let itemCost = item.getTotalCost();

            let index = this.consultants.indexOf(item);
            console.log('Index of this one is: ' + index);

            this.consultants.splice(index, 1);

            this.deletedConsultantCosts = Number(this.deletedConsultantCosts) + Number(itemCost);
        }        
    }
}
