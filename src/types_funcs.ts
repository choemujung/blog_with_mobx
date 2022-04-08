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
    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()+1) + '. ' + String(date.getDate()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}