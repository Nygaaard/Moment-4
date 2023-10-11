//En to do-lista 
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


    storeItem();
}

function deleteItem(e){
    e.target.remove();

    //Lagra listan på nytt
    storeItem();
}

function checkItemText(){
    let input = newtodoEl.value;

    //Kontrollera längd på text
    if(input.length < 5 ){
        newtodobuttonEl.disabled = true;
        messageEl.innerHTML = "Ange minst fem tecken";
    }else{
        newtodobuttonEl.disabled = false;
        messageEl.innerHTML = "";
    }
}

function loadStorage(){
    console.log("Läser in lista...");
}

function storeItem(){
    //Läser in att göra-inlägg
    let items = document.querySelectorAll("article");

    //Skapar en lista
    let todoArr = [];

    //Lagrar articles från listan till array
    for(let i = 0; i < items.length; i++){
        todoArr.push(items[i].innerHTML);
    }

    //Konverterar till JSON
    let jsonString = JSON.stringify(todoArr);
    //Lagra 
    localStorage.setItem("items", jsonString);

    console.log(todoArr);
}

function clearStorage(){

}

