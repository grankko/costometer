namespace ViewModels {
    export class Consultant {
        
        public name: string;            
        public id: number;
        public hourlyCost: number;
        public isRunning: boolean;
        public onTick;
        
        private lastStarted: number;
        /** Costs from previoius timespans stored when calculation has been paused. */
        private previousTimespanCosts: number;
        /** Cost of timespan since last pause (or initial). */
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
            return this.getTotalCost().toFixed(2);
        }

        public getTotalCost() :number {
            return (this.previousTimespanCosts + this.currentTimespanCost);
        }

        /** Runs calculation and stores sums in state every tick of the timer */
        public ticking() {

            if (this.isPausePending === true) {
                // Pause has been signaled. Set current costs to previous and reset current
                clearInterval(this.timer);                
                let currentTotalCost = (this.previousTimespanCosts + this.currentTimespanCost)
                this.previousTimespanCosts = currentTotalCost;
                this.currentTimespanCost = 0;
                this.isPausePending = false;
                this.isRunning = false;
            } else {
                // Normal case, calculate elapsed hours and set current cost 
                let elapsed = (new Date().getTime() - this.lastStarted);
                let elapsedHours = (elapsed / 1000) / 3600;
                this.currentTimespanCost = elapsedHours * this.hourlyCost;                
            }

            // Fire hook for others to update
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

        /** Will signal a pause is pending to be handled by next tick. */
        public pause() {
            console.log('Pausing calculator for ' + this.id);
            console.log('Previous cost is for ' + this.id +' is: ' + this.previousTimespanCosts.toFixed(2));

            this.isPausePending = true;
        }
        
    }
}