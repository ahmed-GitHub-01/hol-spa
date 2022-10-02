export interface SearchByCivilId {
    code: number;
    name: string;
    resonDue: string;
    cases: string;
    clint: string;
    totalDue: number;
    totalPay: number;
    remain: number;
    emp: string;
    batchNum: string;
    contractNum: number;
}
export interface SearchInElections {
    Serial: number;
    Name: string;
    internal_: string;
    Type: string;
    DateBirth: Date;
    Carrer: string;
    Country: string;
    Addres: string;
    CivilId: number;
    Note: string;
}
