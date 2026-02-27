import { createTable, createTableCell } from "./functions.js";
import { Manager } from "./manager.js";


/**
 * @callback HeaderCallback
 * @param {import("./functions").ColspanType | import("./functions").RowspanType}
 * @returns {void}
 */
class Table{
    /**@type {HTMLTableSectionElement} */
    #tbody;
    /**@type {Manager} */
    #manager;
    /**
     * 
     * @param {import("./functions").HeaderType[]} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager){
        this.#manager=manager
        this.#tbody=createTable(document.body, (tr)=>{
            for(const h of headerArray){
                const th= createTableCell("th",h.name,tr)
                if(h.colspan){
                    th.colSpan=2
                }
            }
        })
    }
    setAppendRow(){
        this.#manager.addCallback=(elem)=>{
            addElement(this.#tbody,elem)
        }
    }
}

export {Table}