/*

filter-flex.js

Takes the filter items and puts them all into a flex row

(C) 2018 Spoton.net Limited
Created by Liam Langstaff

*/

if(!W.EDIT_MODE){
  runOnLoad(function(){

    let filterRow = document.querySelectorAll('.filter-row');
    let filterItems = document.querySelectorAll('.filter-item');
    let newNode = document.createElement('div');
    newNode.classList.add('filter-row');

    filterRow[0].parentNode.insertBefore(newNode, filterRow[0]);

    ;[].forEach.call(filterItems, function(node){
      newNode.appendChild(node)
    })

    filterRow.forEach(function(e){
      e.parentNode.removeChild(e)
    });


  })

}