export interface IAflevering {
  id: string;
  aflevering: number;
  laatseAflevering: boolean;
  uitgezonden: boolean;
  hasTest?: boolean;
  hasVoorspelling?: boolean;
  deadlineDatetime: string;
}
