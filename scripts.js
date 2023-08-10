const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

// Submit the form to add an item
function displayItems(){
    const itemsFromStorage=  getItemsFromStorage();
    itemsFromStorage.forEach((item)=> addItemToDom(item));
    checkUI();
 }

function OnAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem === "") {
        alert("Please enter an item.");
        return;
    }

    addItemToDom(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value = "";
}

// Create a button with specific classes
function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("remove-item fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

// Create an icon with specific classes
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function onClickItem(e){
    const clickedElement = e.target;
    const listItem = clickedElement.parentElement;
    if(listItem.classList.contains("remove-item")){
        removeItem(listItem.parentElement);
        }
    }

// Remove an item from the list
function removeItem(item) {
    if (confirm("are you sure ?"))
    item.remove();
    // remove item from storage
    removeItemFromStorage(item.textContent);
    checkUI();


}

function removeItemFromStorage(item){

    let itemsFromStorage = getItemsFromStorage();

     // filter out item to be removed
     itemsFromStorage = itemsFromStorage.filter((i)=>i !== item);

     // re-set to localstorage
     localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Clear all items from the list
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");
    checkUI();
}

// Check the UI state
function checkUI() {
    const items = itemList.querySelectorAll("li");

    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
}

// Filter items in the list
function filterItem(e) {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.includes(text)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Add an item to the DOM
function addItemToDom(item) {
    const li = document.createElement("li");
    const textNode = document.createTextNode(item);
    li.appendChild(textNode);

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    itemList.appendChild(li);
}

// Add an item to the local storage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Get items from the local storage
function getItemsFromStorage() {
    let itemsFromStorage = [];
    const storedItems = localStorage.getItem("items");

    if (storedItems) {
        itemsFromStorage = JSON.parse(storedItems);
    }

    return itemsFromStorage;
}

// Initialize the application
function init() {
    itemForm.addEventListener("submit", OnAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItem);
    document.addEventListener("DOMContentLoaded", displayItems);

    checkUI();
}

init();
