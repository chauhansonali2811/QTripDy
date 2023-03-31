
import config from "../conf/index.js";

//Implementation to extract city from query params

async function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParams = new URLSearchParams(search);
  const city = urlParams.get("city");
  //console.log(city);  
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 // const cityName = getCityFromURL();
  //console.log(cityName);
try{
  const response = await fetch(config.backendEndpoint + `/adventures?city=${city}`)
const data = await response.json();
console.log(data);
return data;
}catch(err){
  return null; 
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures)
  adventures.forEach((key) => {
  const adventureElement=document.createElement("div");
  adventureElement.className="col-6 col-lg-3 mb-4";
  adventureElement.innerHTML=`
  <a href="detail/?adventure=${key.id}" id="${key.id}">
  <div class="activity-card">
  <div>
  <div class="category-banner">${key.category}</div>
  <div class="activity-card img">
  <img class="img-responsive" src="${key.image}"/>
  </div>
  <div class="d-flex justify-content-around">
  <h6>${key.name}</h6>
  <h6>₹${key.costPerHead}</h6>
  </div>
  <div class="d-flex justify-content-around">
  <h6>Duration</h6>
  <h6>${key.duration}hr</h6>
  </div>
  </div>
  </div>
  </a>`
  document.getElementById("data").append(adventureElement);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
// let filteredList=list.filter((adventure)=>{
//   if(adventure.duratiom >= low && adventure.duration <= high){
//     return true;
//   }
// });
// return filteredList;
return list.filter(adventure=>adventure.duration >= low && adventure.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
// let filteredList=[];
// list.forEach((object)=>{
//   if(categoryList.includes(object.category)){
//     filteredList.push(object);
//   }
// });
// return filteredList;
return list.filter(adventure=>categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredList=list;
if(filters.duration != null && filters.duration !== ""){
const[low, high] = filters.duration.split("-");
filteredList = filterByDuration(list, parseInt(low), parseInt(high));
}
if(filters.category != null && filters.category.length !== 0){
  filteredList = filterByCategory(filteredList, filters.category);
}

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
const filtersString = localStorage.getItem("filters");
if(null != filtersString){
  return JSON.parse(filtersString);
}

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
document.getElementById("category-list").textContent="";
filters.category.forEach((category)=>{
  let pillEle = document.createElement("div");
  pillEle.className="category-filter";
  pillEle.innerHTML=`<div>${category}</div>`;
  document.getElementById("category-list").append(pillEle);
})
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
