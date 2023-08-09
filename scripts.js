const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

function addItem(e){
   e.preventDefault();
     
    const newItem = itemInput.value;

    if (newItem === "" ){
        alert(" gibt was ein");
        return;
    }
        // create a list item
    const li = document.createElement("li");
    const textNode = document.createTextNode(newItem);
    li.appendChild(textNode);

      const button = createButton ("remove-item btn-link text-red");
      li.appendChild(button);

      // append the input item to the list
      itemList.appendChild(li);

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

}

function clearItems(){
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
}
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);


   

