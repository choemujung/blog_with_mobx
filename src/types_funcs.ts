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
        this.id += 1;
        return(this.id);
    }
}

export const getDate = (): string => {
    const date = new Date();

    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()+1) + '. ' + String(date.getDate()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}

export type ViewState = 'none' | 'detail' | 'write' | 'edit';

