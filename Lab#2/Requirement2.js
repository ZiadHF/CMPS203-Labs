var inventoryItems = [], transactionLog = [], categoryList = [], customField = {};

function addToInventory(itemData) {
    let item = {
        name: itemData[0],
        category: itemData[1],
        quantity: itemData[2],
        price: itemData[3],
        unit: itemData[4],
        dateAdded: new Date(),
        customField: itemData[5] || {}
    }
    inventoryItems.push(item);
    updateCategoryList(itemData[1]);
    transactionLog.push({
        type: "Added Item",
        item
    });
    logItems();
}

function updateCategoryList(category) {
    if (!categoryList.includes(category)) {
        categoryList.push(category);
    }
}

function isValidIndex(index) {
    return (index >= 0 && index < inventoryItems.length);
}

function removeFromInventory(index) {
    if (isValidIndex(index)) {
        const item = inventoryItems[index];
        inventoryItems.splice(index, 1);
        transactionLog.push({
            type: "Removed From Inventory",
            item: item
        });
        alertQuantity(item);
        logItems();
    }
}

function editItem(index, newItemData) {
    if (isValidIndex(index)) {
        const item = inventoryItems[index];
        inventoryItems[index] = {
            ...inventoryItems[index],
            name: newItemData[0],
            category: newItemData[1],
            quantity: newItemData[2],
            price: newItemData[3],
            weight: newItemData[4],
            unit: newItemData[4],
            dateAdded: new Date(),
            customField: newItemData[5] || {}
        };
        alertQuantity(item);
        transactionLog.push({
            type: "Edited Item",
            oldItem: item,
            newItem: newItemData
        });
        logItems();
    }
}


function logItems() {
    console.log("=== Dashboard ===\nItems: " + inventoryItems.length + "\nTotal: $" + inventoryItems.reduce((tot, item) => tot + item.quantity * item.price, 0).toFixed(2) + "\nCats: " + categoryList.join(', '));
}

function restockItem(itemName, quantity) {
    const item = inventoryItems.find(item => item.name === itemName);
    if (item) {
        item.quantity += quantity;
        transactionLog.push({
            type: "Restocked Item",
            item: item,
            quantityRestocked: quantity,
            dateOfTransaction: new Date()
        });
        console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
    }
}

function alertQuantity(item) {
    const LOW_STOCK_THRESHOLD = 10;
    if (item.quantity < LOW_STOCK_THRESHOLD) {
        console.log(`ALERT: ${item.name} is running low on stock. Only ${item.quantity} ${item.unit} left.`);
    }
}

function isValidItem(item, quantity) {
    return (item && item.quantity >= quantity);
}

function sellItem(itemName, quantity) {
    const item = inventoryItems.find(item => item.name === itemName);
    if (isValidItem(item, quantity)) {
        item.quantity -= quantity;
        transactionLog.push({
            type: "Sold Item",
            item: item,
            quantitySold: quantity,
            dateOfTransaction: new Date()
        });
        alertQuantity(item);
        console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
    }
}

function searchItem(searchTerm) {
    const items = inventoryItems.filter(item => [item.name, item.category, item.price].some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())));
    console.log(items.map(item => `${item.name} (${item.category}) - ${item.quantity} ${item.unit} @ $${item.price}`).join('\n'));
}

function viewInventory() {
    console.log("=== Inventory ===");
    console.log(inventoryItems.map(item => `${item.name} (${item.category}) - ${item.quantity} ${item.unit} @ $${item.price}`).join('\n'));
}

function viewInventoryAge() {
    console.log(inventoryItems.map(item => `${item.name}: ${Math.floor((new Date() - item.dateAdded) / (1000 * 60 * 60 * 24))} days`).join('\n'));
}

function viewAllTransactions() {
    console.log("=== Transactions ===");
    console.log(transactionLog.map(transaction => `${transaction.type} - ${transaction.item.name}`).join('\n'));
}

function exportAllItems() {
    console.log("CSV:\n", ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventoryItems.map(item => Object.values(item).join(','))).join('\n'));
}

function importItems(newItems) {
    newItems.forEach(item => {
        item = [item.name, item.category, item.quantity, item.price, item.unit, item.customField];
        addToInventory(item);
    });
}

function addCustomField(fieldName) {
    if (!customField[fieldName]) {
        customField[fieldName] = null;
    }
}

function updateCustomField(itemName, fieldName, fieldValue) {
    const item = inventoryItems.find(item => item.name === itemName);
    if (item) {
        item.customField[fieldName] = fieldValue;
    }
}

function main() {
    console.log("Running inventory tests...");

    // doStuff("add", ["Apple", "Fruit", 10, 1.5, "kg"]);

    addToInventory(["Apple", "Fruit", 10, 1.5, "kg"]);
    addToInventory(["Banana", "Fruit", 5, 1, "kg"]);
    addToInventory(["Orange", "Fruit", 3, 2, "kg"]);
    addToInventory(["Milk", "Dairy", 5, 3, "litre"]);

    // doStuff("add", ["Banana", "Fruit", 5, 1, "kg"]);
    // doStuff("add", ["Orange", "Fruit", 3, 2, "kg"]);
    // doStuff("add", ["Milk", "Dairy", 5, 3, "litre"]);

    // doStuff("Sale", ["Apple", 2]);
    // doStuff("rstck", ["Milk", 2]);

    sellItem("Apple", 2);
    restockItem("Milk", 2);

    removeFromInventory(1);

    // doStuff("srch", ["mil"]);
    // doStuff("vwI");
    // doStuff("vwIAg");

    searchItem("mil");
    viewInventory();
    viewInventoryAge();

    // doStuff("xprtAll");
    // doStuff("vwAllT");

    exportAllItems();
    viewAllTransactions();

    // doStuff("Imprt", [{ name: "Pineapple", category: "Fruit", quantity: 5, price: 3, unit: "kg" }]);

    importItems([{ name: "Pineapple", category: "Fruit", quantity: 5, price: 3, unit: "kg" }]);

    // doStuff("addFld", ["Origin"]);
    // doStuff("udCFld", ["Apple", "Origin", "India"]);

    addCustomField("Origin");
    updateCustomField("Apple", "Origin", "India");
}

main();
