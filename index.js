import { Manager } from "./manager.js";
import data from "./data.json" with {type: "json"} 
import { Table } from "./table.js";   
import { tbodyRenderColspan } from "./functions.js";
import { FormController } from "./form.js";

const Colmanager= new Manager();
const ColTable= new Table(data.colspanHeaderArray, Colmanager);
ColTable.setAppendRow(tbodyRenderColspan)
for(const d of data.colspanDataArr){
    Colmanager.addElement(d)
}
new FormController(data.colspanFormFieldList, Colmanager)