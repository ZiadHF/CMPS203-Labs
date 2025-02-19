var i = [], t = [], c = [], f = {};

function addToInventory(itemData){
    let item = {
        name: itemData[0],
        category: itemData[1],
        quantity: itemData[2],
        price: itemData[3],
        weight: itemData[4],
        unit: itemData[4],
        dateAdded: new Date(),
        customField: itemData[5] || {}
    }
    i.push(item);
    addCategory(itemData[1]);
    t.push({
        type: "Add Item",
        item: item
    });
    logItems();
}

function addCategory(category){
    if (!c.includes(category)) {
        c.push(category);
    }
}

function transactionLog(type, item, quantity, oldItem = {}){
    let log;
    switch (type){
        case "restock":
            log = {
                type: type,
                item: item,
                quantityRemoved: quantity,
                dateOfTransaction: new Date()
            }
            break;
        case "edit":
            log = {
                type: type,
                modifiedItem: oldItem,
                newItem: item
            }
            break;
        case "rmI":
            log = {
                type: type,
                item: item
            }
            break;
    }
}

function checkValidity(index) {
    return (index >= 0 && index < i.length);
}

function removeFromInventory(index){
    checkValidity(index);
    const item = i[index];
    i.splice(index, 1);
    t.push({
        type: "Remove From Inventory",
        item: item
    });
    logItems();
}

function editItem(index, newItemData){
    checkValidity(index);
    const item = i[index];
    i[index] = {
        ...i[index],
        name: newItemData[0],
        category: newItemData[1],
        quantity: newItemData[2],
        price: newItemData[3],
        weight: newItemData[4],
        unit: newItemData[4],
        dateAdded: new Date(),
        customField: newItemData[5] || {}
    };
    t.push({
        type: "Edit Item",
        oldItem: item,
        newItem: newItemData
    });
    logItems();
}

function logItems(){
    console.log("=== Dashboard ===\nItems: " + i.length + "\nTotal: $" + i.reduce((tot, x) => tot + x.quantity * x.price, 0).toFixed(2) + "\nCats: " + c.join(', '));
}


function doStuff(a, b) {
    if (["add", "edit", "rmI"].includes(a)) {
        if (a === "add") {
            var itm = { n: b[0], cat: b[1], qty: b[2], prc: b[3], unt: b[4], added: new Date(), custF: b[5] || {} };
            i.push(itm);
            if (!c.includes(b[1])) c.push(b[1]); // --
            t.push({ type: "add", itm }); // -- done
        } else if (a === "edit" && i[b[0]]) {
            t.push({ type: "edit", old: i[b[0]], new: b.slice(1) });
            i[b[0]] = { ...i[b[0]], n: b[1], cat: b[2], qty: b[3], prc: b[4], unt: b[5], custF: b[6] || {} };
        } else if (a === "rmI" && i[b[0]]) {
            t.push({ type: "delete", itm: i[b[0]] });
            i.splice(b[0], 1);
        }
        console.log("=== Dashboard ===\nItems: " + i.length + "\nTotal: $" + i.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) + "\nCats: " + c.join(', '));
    }
    if (["Sale", "rstck"].includes(a)) {
        // ADD ALERT IF STOCK LESS THAN 10
        for (let k of i) {
            if (k.n === b[0]) {
                if (a === "Sale" && k.qty >= b[1]) {
                    k.qty -= b[1];
                    t.push({ type: "sale", itm: k, qtyS: b[1], d: new Date() });
                    console.log(`Sold ${b[1]} ${k.unt} of ${k.n}`);
                } else if (a === "rstck") {
                    k.qty += b[1];
                    t.push({ type: "restock", itm: k, qtyR: b[1], d: new Date() });
                    console.log(`Restocked ${b[1]} ${k.unt} of ${k.n}`);
                }
                break;
            }
        }
    }
    // Search for item
    if (a === "srch") console.log(i.filter(x => [x.n, x.cat, x.prc].some(v => v.toString().toLowerCase().includes(b[0].toLowerCase()))).map(x => `${x.n} (${x.cat}) - ${x.qty} ${x.unt} @ $${x.prc}`).join('\n'));
    // Print Inventory
    if (a === "vwI") console.log("=== Inv ===", i.map(x => `${x.n} (${x.cat}) - ${x.qty} ${x.unt} @ $${x.prc}`).join('\n'));
    // Print Inventory
    if (a === "xprtAll") console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(i.map(x => Object.values(x).join(','))).join('\n'));
    // View all transactions
    if (a === "vwAllT") console.log("Transactions:\n", t.map(x => `${x.type} - ${x.itm.n}`).join('\n'));
    // View how long item has been in stock
    if (a === "vwIAg") console.log(i.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    // 
    if (a === "Imprt") b.forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
    // Add custom field
    if (a === "addFld" && !f[b[0]]) f[b[0]] = null;
    // Update custom field of item
    if (a === "udCFld") { i.find(x => x.n === b[0]).custF[b[1]] = b[2]; }
}


function main() {
    console.log("Running inventory tests...");

    //doStuff("add", ["Apple", "Fruit", 10, 1.5, "kg"]);

    addToInventory(["Apple", "Fruit", 10, 1.5, "kg"]);
    addToInventory(["Banana", "Fruit", 5, 1, "kg"]);
    addToInventory(["Orange", "Fruit", 3, 2, "kg"]);
    addToInventory(["Milk", "Dairy", 5, 3, "litre"]);

    // doStuff("add", ["Banana", "Fruit", 5, 1, "kg"]);
    // doStuff("add", ["Orange", "Fruit", 3, 2, "kg"]);
    // doStuff("add", ["Milk", "Dairy", 5, 3, "litre"]);

    //doStuff("Sale", ["Apple", 2]);
    //doStuff("rstck", ["Milk", 2]);
    
    //doStuff("srch", ["mil"]);
    //doStuff("vwI");
   // doStuff("vwIAg");
    
    // doStuff("xprtAll");
    // doStuff("vwAllT");
    
    // doStuff("Imprt", [{ n: "Pineapple", cat: "Fruit", quantity: 5, price: 3, unit: "kg" }]);
    
    // doStuff("addFld", ["Origin"]);
    // doStuff("udCFld", ["Apple", "Origin", "India"]);
    //console.log(i);
    //console.log(t);
}

main();
