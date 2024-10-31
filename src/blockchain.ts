

export interface Blockchain {
    getBalance(address:string):Promise<string>
}