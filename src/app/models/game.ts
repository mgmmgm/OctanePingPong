
export class Game {
    id: number;
    groupName: string;
    playerA: string;
    playerAfullName?: string;
    playerB: string;
    playerBfullName?: string;
    round: number;
    startDate: Date;
    endDate: number;
    winner?: string;
    whoIsWin?: Object[];
}
