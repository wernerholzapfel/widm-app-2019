export interface IActies {
    id?: number;
    voorspellingaflevering?: number;
    testaflevering?: number;
    testDeadlineDatetime?: string;
    voorspellingDeadlineDatetime?: string;
    alwaysUpdate?: boolean;
    isSeasonFinished?: boolean;
}
