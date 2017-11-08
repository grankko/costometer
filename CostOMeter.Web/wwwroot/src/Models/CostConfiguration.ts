import * as Models from './consultant'

    export class CostConfiguration {
        public name: string;
        public id: number;

        public consultants: Models.Consultant[] = [];
    }