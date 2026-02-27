/**
 * @typedef {{label: string,name: string, id: string, type: string, required: boolean }} FormFieldType
 * @typedef {{name: string, colspan?: number}} HeaderType 
 * @typedef {{evszam: string, esemeny1: string, esemeny2?: string}} ColspanType
 * @typedef {{verscsoport: string, vers1: string, evszam1: string, vers2?: string, evszam2?: string}} RowspanType
 * 
 * @callback HeaderCallback
 * @param {HTMLTableRowElement} row a header sor elementje
 * @returns {void}
 */

/**
 * 
 * @param {"th" | "td"} type 
 * @param {string} content 
 * @param {HTMLElement} parent 
 * 
 * @return {HTMLTableCellElement}
 */
const createTableCell = (type, content, parent) => {
    const cell = document.createElement(type);
    cell.innerText = content;
    parent.appendChild(cell);
    return cell;
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {ColspanType} element 
 */
const tbodyRenderColspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    createTableCell('td', element, tr)
    const td2 = createTableCell('td', element.esemeny1, tr)
    
    if(element.esemeny2) {
        createTableCell('td', element.esemeny2, tr)
    }else{
        td2.colSpan = 2;
    }
    
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {RowspanType} element 
 */
const tbodyRenderRowspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const td1 = createTableCell('td', element.verscsoport, tr)
    createTableCell('td', element.vers1, tr)
    createTableCell('td', element.evszam1, tr)
    if(element.vers2 && element.evszam2) {
        const tr2 = document.createElement('tr'); 
        tbody.appendChild(tr2);
        createTableCell('td', element.vers2, tr2)
        createTableCell('td', element.evszam2, tr2)
    }
    else{
        td1.rowSpan=2
    }
}

/**
 * 
 * @param {HTMLElement} parent ehhez csatoljuk hozza a table-t
 * @param {HeaderCallback} headerCallback ez fut le miutan hozzafuzzuk a tablazat fejlecehez a tablazatsort
 * @returns {HTMLTableSectionElement} a tablazat torzse
 */
const createTable = (parent, headerCallback) => {
    const table = document.createElement('table')
    parent.appendChild(table);
    const header = document.createElement('thead');
    table.appendChild(header)
    const tr = document.createElement('tr');
    header.appendChild(tr);
    headerCallback(tr);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody)
    return tbody
}
/**
 * 
 * @param {{id: string, name: string, labelContent: string, parent: HTMLElement}} param A parameterobjektum ami alapjan osszeallitja az inputot tartalmazo divet az errorral
 * @returns {{errorElement: HTMLElement, input: HTMLInputElement}} Az error html elem, es az input html elem
 */
const createInputField = ({id, name, labelContent, parent}) =>{
    const div = document.createElement('div');
    parent.appendChild(div);
    
    const label = document.createElement('label');
    label.innerText = labelContent;
    div.appendChild(label);
    const input = document.createElement('input')
    div.appendChild(input);
    input.type = 'text';
    input.id = id;
    input.name = name;
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    div.appendChild(errorElement);
    return {errorElement, input};
}

/**
 * @callback CreateFieldsCallback
 * @param {HTMLFormElement} form a form amihez hozzafuzzuk
 * @returns {void}
 * 
 * @callback SubmitEventListener
 * @param {Event} event submitesemeny
 * @returns {void}
 * 
 * @param {CreateFieldsCallback} createFieldsCallback 
 * @param {SubmitEventListener} submitEventListener 
 * @returns {HTMLFormElement}
 */
const createForm = (createFieldsCallback, submitEventListener) => {
        const form = document.createElement('form')
        createFieldsCallback(form);
        const button = document.createElement('button');
        button.innerText = 'Küldés';
        form.appendChild(button)
        form.addEventListener('submit', submitEventListener);
        return form;
}

export {createTableCell, tbodyRenderColspan, createTable, createInputField, createForm, tbodyRenderRowspan}