namespace Models {
    export class Consultant {
        
            public name: string;
            public hourlyCost: number;
        
            constructor(cost: number, name: string) {
                this.name = name;
                this.hourlyCost = cost;
        }
    }
}