
/**
 * @callback addCallback
 * @param {import("./functions").ColspanType | import("./functions").RowspanType}
 * @returns {void}
 */
class Manager{
    #dataArray;
    #addCallBack;
    set addCallback(value){
        return this.#addCallBack=value
    }
    constructor(){
        this.#dataArray=[]
    }
    addElement(callback){
        this.#dataArray.push(callback)
        if(this.#addCallBack){
            this.#addCallBack(callback)
        }
    }
}

export {Manager}