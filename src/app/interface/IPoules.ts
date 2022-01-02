export interface IPoules {
    id?: string;
    display_name?: string;
    poules?: IPoule[];
    activePoule?: IPoule;
    stand?: IPoule;
    totaalScoreDeelnemer?: number;
}

export interface IPoule {
    id?: string;
    poule_name: string;
    deelnemers: any[]; // todo
    admins: any[]; // todo
    pouleInvitations?: PouleInvitations[];
}

export interface PouleInvitations {
    id: string;
}
