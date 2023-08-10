const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const  itemFilter = document.getElementById("filter");

function OnAddItemSubmit(e){
   e.preventDefault();
     
    const newItem = itemInput.value;

    if (newItem === "" ){
        alert(" gibt was ein");
        return;
    }
    // add item dom elemt
    addItemToDom(newItem);
         
    // add item to local storage 
    addItemToStorage(newItem)

      checkUI();
}

    // create a button with his classes particulaties
    function createButton(classes){
    const button= document.createElement("button");
    button.className= classes;
    const icon = createIcon(" remove-item fa-solid fa-xmark");
    button.appendChild(icon);

    return button;
}

// create a icon with his classes particulaties
function createIcon(classes){
 const icon = document.createElement("i");
 icon.className = classes;
 return icon;

}

function removeItem(e){
   const clickedElement = e.target;

   if(clickedElement.classList.contains("remove-item")){
     const listItem = clickedElement.parentElement.parentElement;
     listItem.remove();
    
    }
    checkUI();
}
   

function clearItems(){
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
}
checkUI();
}

function checkUI(){
    const items= itemList.querySelectorAll("li");

     if(items.length===0){
         clearBtn.style.display= "none";
         itemFilter.style.display= "none";
     }
     else{
        clearBtn.style.display= "block";
        itemFilter.style.display= "block";
    }
}

function filterItem(e){
    const items= itemList.querySelectorAll("li");

const text = e.target.value.toLowerCase();
  
items.forEach((item)=>{
  const itemName= item.firstChild.textContent.toLowerCase();
  if (itemName.indexOf(text)!=-1){
    item.style.display= "block";}
   else{ item.style.display= "none"}
});

}

function displayItems(){
   const itemsFromStorage=  getItemFromStorage();
   itemsFromStorage.forEach((item)=> addItemToDom(item));
   checkUI();
}

function addItemToDom(item){
    const li = document.createElement("li");
    const textNode = document.createTextNode(item);
    li.appendChild(textNode);

      const button = createButton ("remove-item btn-link text-red");
      li.appendChild(button);

      // append the input item to the list
      itemList.appendChild(li);
};

function getItemFromStorage(){
    let itemsFromStorage;
   let FromStorage  = localStorage.getItem("items");

  if (FromStorage === null){
    itemsFromStorage=[];
  } else {
    itemsFromStorage= JSON.parse(FromStorage);
  }
 return itemsFromStorage;
}



function addItemToStorage(item){
    const itemsFromStorage = getItemFromStorage();
   let FromStorage  = localStorage.getItem("items");

  if (FromStorage === null){
    itemsFromStorage=[];
  } else {
    itemsFromStorage= JSON.parse(FromStorage);
  }
  itemsFromStorage.push(item);

  // convert to json string and set to local sotrage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}


// initialize app

function init (){
itemForm.addEventListener("submit", OnAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
}

   

