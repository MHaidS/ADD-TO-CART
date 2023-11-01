//  Import 'initializeApp' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
//  Import 'getDatabase' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//  ... import 'ref' up here ....
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// Use the Firebase function 'push' to push inputValue to the database
// import {
//   getDatabase,
//   ref
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//  make a const, 'appSettings' & then set this to be equal to an object & in there say 'databaseURL' & then set that to the string that has been copied fr firebase, the database reference url
const appSettings = {
  databaseURL:
    "https://realtime-database-a9508-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

//  let's sep up an 'app' variable & set that equal to 'initializeApp' & we need to give it an argument, that's going to be the 'appSettings' that we've set up, w/c contains the db URL that is going to be the key thing that is going to connect our project w/ firebase
const app = initializeApp(appSettings);
//  then we set up a 'database' variable that uses 'getDatabase' & in here, we're going to pass in the app
const database = getDatabase(app);
//  one last thing remaining here & that's setting up the reference, let's call it 'shoppingListInDB'; set that equal to 'ref' ....
// .... & of course the 'ref()' function takes in 2 things: the db 'database' & then we got to call this reference something, let's call this "shoppingList" .... let's pause & see if this is working .... we get an error on the CONSOLE tab: index.js:7 Uncaught SyntaxError: Cannot use import statement outside a module (at index.js:7:1) .... before running the app, don't forget to go to html file & set the js file inside the <script> tag to type='module' .... we need to do this anytime inside of the js file where we are either using the 'import' or the 'export'; OR both of them, we have to set the js file to 'module', otherwise, it's not going to work ... test it out again, no error in the CONSOLE anymore
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", () => {
  let inputValue = inputFieldEl.value;

  //  Use the Firebase function 'push' to push inputValue to the database ... let's go in here & say push, & 1st, we want to give it a reference, w/c in our case is 'shoppingListInDB' & then we're just gonna give 'inputValue' ... let's test it out .... on the browser, enter 'oranges' in the input field then press on 'Add to cart' & it now works ... index.js:45 oranges
  push(shoppingListInDB, inputValue);

  console.log(inputValue);
});
