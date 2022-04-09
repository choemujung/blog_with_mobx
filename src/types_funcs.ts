import { type } from "os";

export interface Item {
    id: number;
    title: string;
    content: string;
    category: string;    
    date: string;
}

export class NextId {
    private static id:number=5;

    static getId(): number {
        let nextId = this.id;
        this.id += 1;
        return(nextId);
    }
}

export const getDate = (): string => {
    const date = new Date();
    // const [year, month, day, hours, minutes] = [date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(),date.getMinutes()];

    // (month < 10) && (month = '0'+ String(month));
    // (day < 10) && day = '0'+ String(day);
    // (hours < 10) && hours = '0'+ String(hours);
    // (minutes < 10) && minutes = '0'+ String(minutes);
    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()+1) + '. ' + String(date.getDate()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}

export type ViewState = 'none' | 'detail' | 'write' | 'edit';
