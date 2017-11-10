import * as ViewModels from './viewModels'
import * as Models from '../Models/Models'
import * as Services from '../Services/services'

    export class CostOMeterViewModel {

        public consultants: ViewModels.ConsultantViewModel[] = [];
        public loadedConfigurations: Models.CostConfiguration[] = [];
        public onTick;
        public currency: string;

        private timerInterval: number;
        /** Id of last Consultant generated */
        private lastId: number;
        /** Cost of previously active and now deleted Consultants */
        private deletedConsultantCosts: number;
        private timerFactory : Services.IConsultantTimerFactory;

        constructor(newTimerInterval: number, timerFactory :Services.IConsultantTimerFactory) {
            this.timerInterval = newTimerInterval;
            this.lastId = 0;
            this.deletedConsultantCosts = 0;
            this.currency = 'SEK';
            this.timerFactory = timerFactory;
            
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

            return !this.getIsRunning();
        }

        public getIsPausable(): boolean {
            if (this.consultants.length === 0)
                return false;

            return this.getIsRunning();
        }

        public getIsSaveable(): boolean {
            if (this.consultants.length === 0)
                return false;

            return true;
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
            for (let cons of this.consultants) {
                cons.start();
            }
        }

        public stopCalculator() {
            for (let cons of this.consultants) {
                cons.pause();
            }
        }

        public addConsultant(name: string, cost: number): ViewModels.ConsultantViewModel {
            this.lastId = this.lastId + 1;
            let newConsultantTimer = this.timerFactory.createTimer(this.timerInterval);
            //let newConsultant = new ViewModels.ConsultantViewModel(cost, name, this.lastId, this.timerInterval);
            let newConsultant = new ViewModels.ConsultantViewModel(newConsultantTimer, cost, name, this.lastId);
            newConsultant.onTick = this.onTick; // wires up function for updating on Consultant timer ticks.

            this.consultants.push(newConsultant);

            return newConsultant;
        }

        public removeConsultant(item: ViewModels.ConsultantViewModel) {
            let itemCost = item.getTotalCost();

            let index = this.consultants.indexOf(item);

            this.consultants.splice(index, 1);

            // Store any costs produced by consultant so it's included even after deletion.
            this.deletedConsultantCosts = Number(this.deletedConsultantCosts) + Number(itemCost);
        }

        public loadAllConfigurations(data: any) {
            this.loadedConfigurations = [];
            for (let i = 0; i < data.length; i++) {
                let parsedConfig = new Models.CostConfiguration();
                parsedConfig.id = data[i].id;
                parsedConfig.name = data[i].name;
                this.loadedConfigurations.push(parsedConfig);
            }
        }

        public loadCostConfigurationResult(data: any) {

            this.resetViewModel();

            for (let i = 0; i < data.consultants.length; i++) {

                this.addConsultant(data.consultants[i].name, Number(data.consultants[i].hourlyCost));
            }
        }

        public serializeCurrentSetup(configName: string) :string {
            let currentConfig = new Models.CostConfiguration();
            currentConfig.id = -1;
            currentConfig.name = configName;
            
            for (let cons of this.consultants) {
                let apiConsultant = new Models.Consultant();
                apiConsultant.hourlyCost = cons.hourlyCost;
                apiConsultant.name = cons.name;
                currentConfig.consultants.push(apiConsultant);
            }

            return JSON.stringify(currentConfig);            
        }

        public resetViewModel() {
            if (this.getIsPausable()) {
                this.stopCalculator();
            }
            this.consultants = [];
            this.lastId = 0;
            this.deletedConsultantCosts = 0;
        }
    }

