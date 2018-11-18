export interface IPoules {
    id?: string;
    display_name?: string;
    poules?: IPoule[];
}

export interface IPoule {
    id?: string;
    poule_name: string;
    deelnemers: any[]; // todo
    admins: any[]; // todo
}
