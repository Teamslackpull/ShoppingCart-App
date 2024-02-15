// Import the app settings and database settings
import {initializeApp} from " https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js "
import  { getDatabase, ref,push, onValue,remove} from " https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js "

// Get the elements by id from the Html File and store them in variables

const  InputField = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const ShoppingListEL = document.getElementById("Shopping-list")


const appSettings = {
    databaseURL : "https://groceries-app-1d073-default-rtdb.europe-west1.firebasedatabase.app"
}

// store the database and app functions in variables to be used
const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceriesInDB = ref(database,"Basket")

// we listen for clicks on the addBtn
addBtn.addEventListener("click", function (){
    // we store the inputValue in a variable because we can access it faster
    let inputValue = InputField.value
    // we are using here the firebase function Push
    // first we enter the location where it should be stored and then the value
    push(groceriesInDB, inputValue)
    // when the values are pushed we are clearing the inputField because its stays clean this way
    clearInputField()
})

// fetching the data from the database
onValue(groceriesInDB, function (snapshot){
    // We make sure there is data in the database to render
    if(snapshot.exists() === true ) {
        let itemsInArray = Object.entries(snapshot.val())
        ClearShoppingListEL()
        // Here we are iterate Through the items in the items array and sending them to the shoppingListEL
        for (let i = 0; i < itemsInArray.length; i++) {
            let CurrentItem = itemsInArray[i]
            appendItemsToShoppingListEL(CurrentItem)
    }

    } else{
        // if there are no items we display this message
        ShoppingListEL.innerHTML = " No items Here yet!"
    }
})

// Clearing the shoppingList
function ClearShoppingListEL(){
    ShoppingListEL.innerHTML = " "
}

// Clearing the input field inside a function so its stays clean
function clearInputField(){
    InputField.value = " "
}

// We Create list Items to append to the shoppingList
function appendItemsToShoppingListEL(item){
    // Storing the Object items in array variables
    let itemID = item[0]
    let itemValue = item[1]
    let newEL = document.createElement("li")
    // We Create list Items to append to the shoppingList
newEL.addEventListener("click", function (){
     let ExactItemLocation = ref(database,`Basket/${itemID}`)
    remove(ExactItemLocation)
})
    newEL.textContent += itemValue
    ShoppingListEL.append(newEL)
}

