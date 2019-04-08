/*

filter-menu.js

Filter menu

(C) 2018 Spoton.net Limited
Created by Liam Langstaff

*/

//run tasks as soon as the page HTML has loaded
runOnLoad(function(){

  //the parent dropdown menu
  let menu        = document.querySelector('#menu-filter');

  //individual menu inputs
  let inputs      = document.querySelectorAll('.menu-input');

  //the individual cards that display
  let filterItems = document.querySelectorAll('.filter-item');

  //when clicked on the menu
  menu.addEventListener('click', function(e){

    //does it contain the class menu-input?
    if(e.target.classList.contains('menu-input')){

      //does it contain an active class?
      if(e.target.classList.contains('active')){

        //if yes, remove it
        e.target.classList.remove('active');

      } else{

        //otherwise remove class and put back on (to close and open a new menu)
        [].forEach.call(inputs, function(input){
          input.classList.remove('active');
        })

        e.target.classList.add('active');
      }
    }
  })


  //inner wrapper which holds all of the inputs (per top level input)
  let subContainers = document.querySelectorAll('.sub-container');

    //function which hides all cards associated to unchecked inputs

    //classname = the classname for the card heading "NAME".
    //this is where the inputs collect it's names

    //container = the inner container which holds the inputs
    function hideUncheckedItems(classname, container){

      //look at all the inputs inside that menu
      let inputs = container.querySelectorAll('input');

      //create a place to store some values
      let values = new Set();


      //for every input inside the menu
      [].forEach.call(inputs, function(input){

        //if it's checked add the particular value (for example 'BMW' or 'FULL ELECTRIC'
        //basically the heading of the chosen input) inside for later 
        if(input.checked){

          values.add(input.value);

        }
      })

      //if there is something in our set trigger a function
      if(values.size > 0){

        //for every card on the page do something
        [].forEach.call(filterItems, function(filterItem){

          //inside the card find a classname associated with a particular heading
          //for example (make, type, battery)
          let filterName = filterItem.querySelector(classname);

          //if the name inside the card does not match up with anything inside the set
          //then get rid of it
          if(!values.has(filterName.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim())){
            filterItem.style.display = 'none';
          }
        })
      }

    }

    //create a function that hides cards that are not in a battery range / price range
    function hideOutOfRangeItems(classname,container){

      let inputs = container.querySelectorAll('input');
      let values = new Set();



      [].forEach.call(inputs, function(input){

        //if input is checked (and has a range)
        //then add the lower and higher dataset attached in the HTML
        //and put it in our set
        if(input.checked){

          values.add([parseInt(input.dataset.low), parseInt(input.dataset.high)]);

        }
      })

      if(values.size > 0){

        [].forEach.call(filterItems, function(filterItem){

          //if the name inside the card does not match up with anything inside the set
          //then get rid of it
          let filterName = filterItem.querySelector(classname);

          //let our price ammount or battery range be placed in a variable for later
          let value = parseInt(filterName.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().replace(/[£,]/g,''))//get rid of blank spaces and symbols

          
          let inRange = false;

          //for every value in our set call it range 
          //if the price / battery range is more or equal to the lower value inside our set
          //AND is less than the higher value in our set
          //change inRange to true 
          values.forEach(function(range){
            if(value >= range[0] && value <= range[1]){
              inRange = true;
            }
          })

          //if its not in our range then get rid of the cards
          if(!inRange){
            filterItem.style.display = 'none';
          }

        })
      }

    }

    //if something in the menu changes then do something
    menu.addEventListener('change', function() {

      //if something happens on the menu then show every card
      [].forEach.call(filterItems, function(filterItem){
        filterItem.style.display = "block";
      })

      // if something changes get rid of all the cards we have not chosen
      hideUncheckedItems('.make-text', subContainers[0]);
      hideUncheckedItems('.type-text', subContainers[1]);
      hideUncheckedItems('.battery-text', subContainers[3]);
      hideOutOfRangeItems('.price-text', subContainers[2]);
      hideOutOfRangeItems('.range-text', subContainers[4]);


    });


  //the creation of all our inputs and values attached to them
  function addValues(classname, container){

    //create a new set
    let values = new Set();

      //for every card type we choose add it to our set
     [].forEach.call(document.querySelectorAll(classname), function(node){
        values.add(node.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
      });

      //create an array
      valuesArray = [];

      //for every value in our set, push it into our new array
      values.forEach(function(value){
        valuesArray.push(value);
      });

     //sort in alph order
     valuesArray.sort();

     //for each value in the array do something
      valuesArray.forEach(function(value){

        //create input and make it a checkbox
        let subItem = document.createElement('input');
          subItem.setAttribute('type', 'checkbox');
          subItem.value = value;

        //create label and set a class
        let label = document.createElement('label');
          label.setAttribute('class', 'sub-item');

        //make a text node with the values
        let labelText = document.createTextNode(value);

        //place the input and the text node inside the label
        label.appendChild(subItem)
        label.appendChild(labelText)

        //put the label inside the correct container
        container.appendChild(label)


      });
  }

  addValues('.make-text', document.querySelector('#make-container'));
  addValues('.type-text', document.querySelector('#type-container'));
  addValues('.battery-text', document.querySelector('#battery-container'));

})

