///<reference path="../Models/Consultant.ts" />

namespace Models {
    export class CostConfiguration {
        public name: string;
        public id: number;

        public consultants: Models.Consultant[] = [];
    }
}