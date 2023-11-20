import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

// ... the onValue() function runs whenever there is a change in the db & gives us the 'snapshot' everytime the db updates & then turns that into an array ... Firebase also has a method called 'snapshot.exists', w/c returns a TRUE or FALSE boolean value based on whether there is a 'snapshot' or not
onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
    // ... now the 'else' clause, is when it's FALSE, w/c means there are no items in the db, in thatm case, we want to change the 'shoppingListEl'...
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});

// ... create a new function to clear the shopping list
const clearShoppingListEl = () => {
  shoppingListEl.innerHTML = "";
};

// ... create a function to clear the input field ...
const clearInputFieldEl = () => {
  inputFieldEl.value = "";
};

// ... create a function to add an item to the shopping list create a parameter 'itemValue' & then use it inside instead of inputValue w/c doesn't mean anything inside this function bec. it is coming fr. inside the 'addButtonEl' listener ... let's now change the parameter fr 'itemValue' to 'item'... this shd. now work so let's run it now ... so it's still showing just the names of the items ...
const appendItemToShoppingListEl = (item) => {
  let itemID = item[0];

  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    // ... use the remove function to remove the item from the database by feeding it w/ the 'exactLocationOfItemInDB'
    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
};
