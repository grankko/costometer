///<reference path="../ViewModels/Consultant.ts" />
namespace ViewModels {
    export class CostOMeterViewModel {

        public consultants: ViewModels.Consultant[] = [];
        public onTick;

        private timerInterval: number;
        /** Id of last Consultant generated */
        private lastId: number;
        /** Cost of previously active and now deleted Consultants */
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

            return totalHourlySummed.toFixed(0);
        }

        public getTotalCost(): string {
            let totalCostSummed: number = 0;
            for (let cons of this.consultants) {
                totalCostSummed = Number(totalCostSummed) + Number(cons.getTotalCost());
            }
            
            // Include costs of previously active and now deleted consultants
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
            newConsultant.onTick = this.onTick; // wires up function for updating on Consultant timer ticks.

            this.consultants.push(newConsultant);

            return newConsultant;
        }

        public removeConsultant(item :ViewModels.Consultant) {
            console.log('Removing consultant with id ' + item.id);
            let itemCost = item.getTotalCost();

            let index = this.consultants.indexOf(item);
            console.log('Index of this one is: ' + index);

            this.consultants.splice(index, 1);

            // Store any costs produced by consultant so it's included even after deletion.
            this.deletedConsultantCosts = Number(this.deletedConsultantCosts) + Number(itemCost);
        }

        public loadCostConfigurationResult(data :any) {

            this.resetViewModel();

            // todo: parse as typed result..
            for (let i = 0; i < data.consultants.length; i++) {

                this.addConsultant(data.consultants[i].name, Number(data.consultants[i].hourlyCost));
            }
        }

        private resetViewModel() {
            if (this.getIsPausable()) {
                this.stopCalculator();
            }
            this.consultants = [];
            this.lastId = 0;
            this.deletedConsultantCosts = 0;
        }
    }
}
