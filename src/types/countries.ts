import { CommonEntity } from "@/visit_stats_frontend/types/common-entity";

export class CountriesAnalyticEntity extends CommonEntity {
    declare country?: string;
}

export class CreateCountriesAnalyticOutPut {
    declare status: string
}

export class CountriesAnalyticCatchOutPut {
    declare country: string

    declare count: number
}


export class CountriesAnalyticOutput {
    [key: string]: string; // Index signature
  
    declare country: string;

    declare count: string;
}