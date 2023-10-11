//Att göra-lista 
//Av Andreas Nygård

"use strict"; 

//Variabler
let newtodoEl = document.getElementById("newtodo");
let newtodobuttonEl = document.getElementById("newtodobutton");
let clearbuttonEl = document.getElementById("clearbutton");
let messageEl = document.getElementById("message");
let todolistEl = document.getElementById("todolist");

//Event handlers
newtodoEl.addEventListener("keyup", checkItemText);
newtodobuttonEl.addEventListener("click", addItem);
clearbuttonEl.addEventListener("click", clearStorage);
todolistEl.addEventListener("click", deleteItem);
window.onload = init;

//Funktioner

function init(){
    //Inaktiverar knappen 
    newtodobuttonEl.disabled = true;

    //Laddar upp lista vid sidladdning
    loadStorage();
}
//Lägger till item
function addItem(){
    let input = newtodoEl.value;

    //Skapar nytt article-element
    let newEl = document.createElement("article");  
    //Lägger text-node
    let newText = document.createTextNode(input); 
    //Slår ihop dessa
    newEl.appendChild(newText);

    //Lägger till i listan
    todolistEl.appendChild(newEl);

    //Händelsehanterare för nytt element - radera vid klick
    newEl.addEventListener("click", deleteItem);

    //Tömmer textfält och inaktiverar knapp
    newtodoEl.value = "";
    newtodobuttonEl.disabled = true;

    //Anropar funktion för att spara element
    storeItem();
}
//Raderar items
function deleteItem(e){
    e.target.remove();

    //Lagra listan på nytt
    storeItem();
}
//Kontrollerar längd på input
function checkItemText(){
    let input = newtodoEl.value;

    if(input.length < 5 ){
        newtodobuttonEl.disabled = true;
        messageEl.innerHTML = "Ange minst fem tecken";
    }else{
        newtodobuttonEl.disabled = false;
        messageEl.innerHTML = "";
    }
}
//Läser in kurser
function loadStorage(){
    //Konvertera tillbaka Json till array
    let items = JSON.parse(localStorage.getItem("items"));

    //Loopa igenom arrayen
    for(let i = 0; i < items.length; i++){
        //Skapar nya element
        let newEl = document.createElement("article");  
        let newText = document.createTextNode(items[i]); 
        newEl.appendChild(newText);

        //Lägger till i listan
        todolistEl.appendChild(newEl);
    }
}
//Sparar kurser
function storeItem(){
    //Läser in att göra-inlägg
    let items = document.querySelectorAll("article");

    //Skapar en lista
    let todoArr = [];

    //Lagrar articles från listan i array
    for(let i = 0; i < items.length; i++){
        todoArr.push(items[i].innerHTML);
    }

    //Konverterar array till JSON
    let jsonString = JSON.stringify(todoArr);
    //Lagra 
    localStorage.setItem("items", jsonString);
}
//Raderar allt som är lagrat
function clearStorage(){
    //Rensar local storage
    localStorage.clear();
    
    //Rensar listan och anropar utskrift
    todolistEl.innerHTML = "";
    loadStorage();
}
