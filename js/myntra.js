
let bagItems;
onload()

function onload(){
  let bagItemsStr = localStorage.getItem('bagItems')
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
showItemsContainer();
showAddToBag();
}




function addToBag(itemId){

 

let checkLogged = localStorage.getItem('isLoggedIn') === 'true'
  
  if(!checkLogged){
    alert('Please login first')
    window.location.href = window.location.pathname.includes('/pages/') ? '../login.html' : 'login.html'
    return
  }
 if(bagItems.includes(itemId)){
    return;
  }
bagItems.push(itemId)
localStorage.setItem("bagItems" , JSON.stringify(bagItems))


window.location.href = window.location.pathname.includes('/pages/') ? '../bag.html' : 'bag.html'

showAddToBag()
}



function showAddToBag(){
   let btn = document.querySelector(".bag-item-count ");

   

   if(bagItems.length > 0){
     btn.style.visibility = "visible"
    btn.innerHTML = bagItems.length;
   }else{
    btn.style.visibility = "hidden"
   }
 
   
}


function showItemsContainer(){
let itemsContainers = document.querySelector(".items-container");

if(!itemsContainers){
  return
}
let currentPage = itemsContainers.getAttribute("data-category");
 
  let innerHtml = '';

  let filteredProduct = items.filter(item => item.category===currentPage);
  filteredProduct.forEach(item => {
  let hideClass = (item.discount == 0) ? 'display: none;' : '';
 innerHtml +=`
    <div class="item-container">

        <img class="item-image" src="${window.location.pathname.includes('/pages/') ? '../' + item.image : item.image}" alt="">
        
        <div class="rating">
         ${item.rating.stars} | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item}</div>
      <div class="price">
        <span class="current-price"> Rs.${item.currentPrice}</span>
        <span class="original-price">${item.originalPrice}</span>
        <span class="discount"  style="${hideClass}">${item.discount}</span>
       
      </div>
       <button class="btn-add-bag" onclick="addToBag('${item.id}')"> Add to bag </button>
      </div>`
    
   
      
  })

  itemsContainers.innerHTML = innerHtml;



}


let bag = document.querySelector('#baglink')
if(bag){
bag.addEventListener('click', function(event){

  let checkLogin = localStorage.getItem('isLoggedIn');
  if(checkLogin != 'true'){
    event.preventDefault()
    alert('Please login first to view your bag!');

    if(window.location.pathname.includes('/pages/')){
        window.location.href = '../login.html';
    }else{
      window.location.href = "login.html"
    }
  }
})}




let input = document.querySelector('input')
input.addEventListener('input' , function(e){

  let itemsContainer = document.querySelector('.items-container')
  let inputVal = e.target.value.toLowerCase().trim()


  if(!itemsContainer) return 

  let currentPage = itemsContainer.getAttribute("data-category")

  if(inputVal ===""){
    showItemsContainer()
  return 
  }


  let filteredItem = items
  .filter(items =>items.category === currentPage)
 .filter(item => 
     item.item.toLowerCase().includes(inputVal)
  );

  let htmlString = ''
  filteredItem.forEach(item =>{
    let hideClass = (item.discount === 0) ? 'display:none;' : '' ;
    
    htmlString +=` <div class="item-container">

        <img class="item-image"src="${item.image}" alt="">
        
        <div class="rating">
         ${item.rating.stars} | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item}</div>
      <div class="price">
        <span class="current-price"> Rs.${item.currentPrice}</span>
        <span class="original-price">${item.originalPrice}</span>
        <span class="discount" >${item.discount}</span>
      </div>
       <button class="btn-add-bag" onclick="addToBag('${item.id}')"> Add to bag </button>
      </div>`
  }
  );

itemsContainer.innerHTML = htmlString;
  
  
})
 
