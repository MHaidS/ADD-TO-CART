import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// ... make this const to be equal to an obj. & in there say 'databaseURL' & then set to the string that has been copied fr firebase, the database reference url
const appSettings = {
  databaseURL:
    "https://realtime-database-a9508-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// ...make an 'app' var & set it equal to 'initializeApp' ... use 'appSettings' as the argument, w/c contains the db URL that is going to be the key thing that is going to connect our project w/ firebase
const app = initializeApp(appSettings);
// ... create a 'database' variable that uses 'getDatabase' &  pass in 'app'
const database = getDatabase(app);

// ... create a 'shoppingListInDB' var & set it equal to the ref() function w/c takes in 2 things: the db 'database' & then we call this reference "shoppingList"
const shoppingListInDB = ref(database, "shoppingList");

// *** connect the HTML & the JS ***
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  // ... use the Firebase function 'push' to push 'inputValue' to the db ... 1st, we want to give it a ref, 'shoppingListInDB' & then 'inputValue'
  push(shoppingListInDB, inputValue);

  // ... call the arrow function to clear the input field
  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.entries(snapshot.val());

  console.log(snapshot.val());

  clearShoppingListEl();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];

    let currentItemID = currentItem[0];

    let currentItemValue = currentItem[1];

    appendItemToShoppingListEl(currentItemValue);
  }
});

const clearShoppingListEl = () => {
  shoppingListEl.innerHTML = "";
};

//  ... create a function to clear the input field ...
const clearInputFieldEl = () => {
  inputFieldEl.value = "";
};
// ... create a function to add an item to the shopping list create a parameter 'itemValue' & then use it inside instead of inputValue w/c doesn't mean anything inside this function bec. it is coming fr. inside the 'addButtonEl' listener ...
const appendItemToShoppingListEl = (itemValue) => {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
};
