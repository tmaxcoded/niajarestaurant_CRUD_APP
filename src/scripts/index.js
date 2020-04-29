import { Restaurant } from '../scripts/Restaurant.js';
import { RestaurantRepo } from '../scripts/RestaurantRepo';
import 'bootstrap';
//import bootbox from 'bootbox';

import '../styles/app.scss';
import 'jquery';
import 'jquery-confirm';

// let res1 = new Restaurant(1, 'Mama Cass', 'Iyanapaja', 'Lagos Cub');
// console.log(res1);

// communicate with dom
var table = document.querySelector('#producttable');
var submitButton = document.querySelector('#formElement');

// create an empty array called restau
let restau = [];
// initialize restaurant repository
let repos = new RestaurantRepo();
restau = repos.getRestaurants;
// initialize data with restaurant keys
let data = Object.keys(restau[0]);

submitButton.addEventListener('submit', function (e) {
  e.preventDefault();
  //console.log('Heyyyy! am submitted!');
  //get form value
  var id = document.getElementById('restaurantId').value;
  var name = document.getElementById('restaurantName').value;
  var location = document.getElementById('restaurantLocation').value;
  var cuisine = document.getElementById('exampleFormControlSelect1').value;

  // check if id has value
  if (parseInt(id)) {
    let newId = parseInt(id);
    let newFetchedRestaurant = restau.find((x) => x.id == newId);
    newFetchedRestaurant.name = name;
    newFetchedRestaurant.location = location;
    newFetchedRestaurant.cuisineType = cuisine;

    restau.splice(newId - 1, 1, newFetchedRestaurant);

    clearInputField();

    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
  }

  if (id === '') {
    // get all restaurants lenght
    let restaurantLength = restau.length;

    // to get the latest restaurant id
    let temporaryValue = 0;
    for (let i = 0; i < restaurantLength; i++) {
      if (restau[i].id > temporaryValue) {
        temporaryValue = restau[i].id;
      }
    }

    // initialize an empty object with the newly created restaurant
    var myProp = {
      id: temporaryValue + 1,
      name: name,
      location: location,
      cuisine: cuisine,
    };

    let newCreatedRestaurant = new Restaurant(
      myProp.id,
      myProp.name,
      myProp.location,
      myProp.cuisine
    );

    // push the newly created restaurant to the arrays of existing restaurants
    restau.push(newCreatedRestaurant);
    //console.log('newly created restaurant = ', restau);

    //console.log(newCreatedRestaurant);
    // insert a new row
    let newTableRow = table.insertRow();
    // turn newly created restaurant into an arrays of value
    let newlyCreatedObjectValues = Object.values(newCreatedRestaurant);
    //console.log('Object values ', newlyCreatedObjectValues);

    // get the length of the object value
    let newlyCreatedObjectValuesLength = newlyCreatedObjectValues.length;

    for (let i = 0; i < newlyCreatedObjectValuesLength; i++) {
      let newCell = newTableRow.insertCell();
      let newTexNode = document.createTextNode(newlyCreatedObjectValues[i]);
      newCell.appendChild(newTexNode);

      if (i == 3) {
        AddEditButtonToTableRow(newCreatedRestaurant, newTableRow);
        AddDeleteButtonToTableRow(newCreatedRestaurant, newTableRow);

        // clear input field
        clearInputField();

        while (table.hasChildNodes()) {
          table.removeChild(table.firstChild);
        }
      }
    }
  }

  generateTableHead();
  generateTable();

  if (parseInt(id)) {
    window.alert('Restaurant updated successfully!');
  }

  if (id === '') {
    window.alert('Restaurant created successfully !');
  }
  //QuerySelectedButton();
  /// console.log('Is button increased', document.querySelectorAll('.actionbtn'));
});

function clearInputField() {
  submitButton.reset();
}
console.log('submited button', submitButton);

// button.addEventListener('click', (e) => {
//   alert('helloooo');
//   e.preventDefault();
//   console.log('Target'.e.target);
//   console.log('Event', e);
// });

//console.log(repos.getRestaurants);

//console.log('tabled', table);

document.addEventListener('DOMContentLoaded', () => {
  generateTableHead();
  generateTable();

  // query selected button
  // QuerySelectedButton();
});

function generateTableHead() {
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let key of data) {
    if (key == 'id') {
      continue;
    } else {
      let th = document.createElement('th');
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  //console.log('Heading', thead);
}

function generateTable() {
  for (let element of restau) {
    let row = table.insertRow();
    for (let key in element) {
      if (key == 'id') {
        continue;
      } else {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);

        if (key == 'cuisineType') {
          // add edit button
          AddEditButtonToTableRow(element, row);
          // add delete button
          AddDeleteButtonToTableRow(element, row);
        }
      }
    }
  }
  QuerySelectedButton();
  QuerySelectedEditButton();
}

function AddEditButtonToTableRow(element, row) {
  let cell = row.insertCell();
  let button = document.createElement('BUTTON');
  button.textContent = 'Edit';
  button.className = `btn btn-primary btn-sm editrow actionbtn`;
  button.setAttribute('data-id', element.id);

  cell.appendChild(button);
}

function AddDeleteButtonToTableRow(element, row) {
  // delete
  let cellD = row.insertCell();
  let textD = document.createElement('BUTTON');
  textD.textContent = 'Delete';
  textD.className = `btn btn-danger btn-sm  deleterow actionbtn`;
  textD.setAttribute('data-id', element.id);
  textD.setAttribute('data-target', '#exampleModal');

  cellD.appendChild(textD);
}
function QuerySelectedButton() {
  let buttons = document.querySelectorAll('.deleterow');
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      if (window.confirm('Are you sure you want to delete?')) {
        deleteButtonIfConfirmed(button);
      }
    });
  });
}

function QuerySelectedEditButton() {
  let buttons = document.querySelectorAll('.editrow');
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var getButtonId = button.getAttribute('data-id');

      console.log('The button edit id is : ', getButtonId);

      let getMyRestaurantViaId = restau.find((p) => p.id == getButtonId);

      console.log(getMyRestaurantViaId);

      document.getElementById('restaurantName').value =
        getMyRestaurantViaId.name;
      var location = (document.getElementById('restaurantLocation').value =
        getMyRestaurantViaId.location);
      var cuisine = (document.getElementById(
        'exampleFormControlSelect1'
      ).value = getMyRestaurantViaId.cuisineType);

      var id = (document.getElementById('restaurantId').value =
        getMyRestaurantViaId.id);

      console.log('Edit Object to see', {
        id: id,
        name: name,
        location: location,
        cuisine: cuisine,
      });
    });
  });
}

function deleteButtonIfConfirmed(button) {
  let ishasAttr = button.classList.contains('deleterow');
  // console.log(ishasAttr);

  if (ishasAttr === true) {
    //alert(ishasAttr);
    let miId = button.getAttribute('data-id');
    //console.log(miId);
    var resnew = restau.find((x) => x.id == miId);
    console.log('New restaurant ', resnew);

    var i = button.parentNode.parentNode.rowIndex;

    table.deleteRow(i);

    restau.splice(resnew.id - 1, 1);
  }
}
