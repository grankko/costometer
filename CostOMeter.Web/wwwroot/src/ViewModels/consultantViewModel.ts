import * as Services from "../Services/services";

    export class ConsultantViewModel {

        public name: string;
        public id: number;
        public hourlyCost: number;
        public isRunning: boolean;
        public onTimerTicking;

        /** Costs from previoius timespans stored when calculation has been paused. */
        private previousTimespanCosts: number;
        /** Cost of timespan since last pause (or initial). */
        private currentTimespanCost: number;
        private isPausePending: boolean;
        private timer :Services.IConsultantTimer;

        constructor(timer: Services.IConsultantTimer, cost: number, name: string, id: number) {
            this.timer = timer;
            var self = this;
            this.timer.onTick = this.ticking;
            
            this.name = name;
            this.hourlyCost = cost;
            this.id = id;
            this.isPausePending = false;
            this.isRunning = false;

            this.previousTimespanCosts = 0;
            this.currentTimespanCost = 0;
        }

        public getTotalCostFormatted(): string {
            return this.getTotalCost().toFixed(2);
        }

        public getTotalCost(): number {
            return (this.previousTimespanCosts + this.currentTimespanCost);
        }

        /** Runs calculation and stores sums in state every tick of the timer */
        public ticking(elapsedHours :number, instance: ConsultantViewModel) {

            if (instance.isPausePending === true) {
                // Pause has been signaled. Set current costs to previous and reset current
                instance.timer.stop();
                let currentTotalCost = (instance.previousTimespanCosts + instance.currentTimespanCost)
                instance.previousTimespanCosts = currentTotalCost;
                instance.currentTimespanCost = 0;
                instance.isPausePending = false;
                instance.isRunning = false;
            } else {
                // Normal case, calculate elapsed hours and set current cost 
                instance.currentTimespanCost = elapsedHours * instance.hourlyCost;
            }

            // Fire hook for others to update
            instance.onTimerTicking();
        }

        public start() {
            this.isRunning = true;
            this.currentTimespanCost = 0;
            this.timer.start();
        }

        /** Will signal a pause is pending to be handled by next tick. */
        public pause() {
             this.isPausePending = true;
        }

    }
