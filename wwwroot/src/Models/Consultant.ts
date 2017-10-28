namespace Models {
    export class Consultant {
        
        public name: string;            
        public id: number;
        public hourlyCost: number;
        public isRunning: boolean;
        public onTick;
        
        private lastStarted: number;
        private previousTimespanCosts: number;
        private currentTimespanCost: number;
        private timerInterval: number;

        private timer;
        private isPausePending: boolean;       

        
        constructor(cost: number, name: string, id: number, timerInterval: number) {
            this.name = name;
            this.hourlyCost = cost;
            this.id = id;
            this.timerInterval = timerInterval;
            this.isPausePending = false;
            this.isRunning = false;

            this.previousTimespanCosts = 0;
            this.currentTimespanCost = 0;
        }

        public getTotalCostFormatted() :string {
            return (this.previousTimespanCosts + this.currentTimespanCost).toFixed(2);
        }

        public getTotalCost() :number {
            return (this.previousTimespanCosts + this.currentTimespanCost);
        }

        public ticking() {

            if (this.isPausePending === true) {
                clearInterval(this.timer);                
                let currentTotalCost = (this.previousTimespanCosts + this.currentTimespanCost)
                this.previousTimespanCosts = currentTotalCost;
                this.currentTimespanCost = 0;
                this.isPausePending = false;
                this.isRunning = false;
            } else {
                let elapsed = (new Date().getTime() - this.lastStarted);
                let elapsedHours = (elapsed / 1000) / 3600;
                this.currentTimespanCost = elapsedHours * this.hourlyCost;                
            }

            this.onTick();
        }

        public start() {
            console.log('Starting calculator for ' + this.id);
            this.isRunning = true;
            this.currentTimespanCost = 0;
            this.lastStarted = new Date().getTime();

            this.timer = setInterval(() => {
                this.ticking();
             }, this.timerInterval);
        }

        public pause() {
            console.log('Pausing calculator for ' + this.id);
            console.log('Previous cost is for ' + this.id +' is: ' + this.previousTimespanCosts.toFixed(2));

            this.isPausePending = true;
        }
        
    }
}