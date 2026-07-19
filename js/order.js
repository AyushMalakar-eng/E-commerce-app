let loadOrderItem;
let orderItems;

 function onload(){
let currentUser = localStorage.getItem('loggedInUser')
  let checkLogged = localStorage.getItem('isLoggedIn') === "true"
  if(!checkLogged){
    alert('Please login first')
    window.location.href = window.location.pathname.includes('/pages/') ? '../login.html' : 'login.html'
    return
  }


let orderItemStr = localStorage.getItem(`orderItem_${currentUser}`)
 orderItems = orderItemStr ? JSON.parse(orderItemStr):[];
  
   
   displayOrderItem()
 }
 onload() 



 

 function displayOrderItem(){
  let orderContainer = document.querySelector('.order-page')
  let innerHtml = ''
  
  loadOrderItem = orderItems.forEach(element => {
 
   element.items.forEach(function(order){
    innerHtml+= generatehtml(order,element)
  // console.log(element)
   })
   })
    
    
  orderContainer.innerHTML = innerHtml
  if(orderItems.length === 0){
  let emptyMessage = document.querySelector(".emptyOrder")
  // emptyMessage.innertext = "No Order Items"
  emptyMessage.style.display = "block"
}
 }

 function generatehtml(item, element){
  // console.log(item)
  return `
    <div class="order-container">
    <div class="item-left-part">
            <imgsrc="${window.location.pathname.includes('/pages/') ? '../' + item.image : item.image}" alt="" class="bag-item-img">
          </div>
          <div class="item-right-part">
            <div class="company_name">${item.company}</div>
            <div class="item">${item.item}</div>
            <div class="amount">${item.currentPrice}</div> 
            <div class="return-time">14 Days Return Available</div>
          
        </div>
        <h2 class="h"> Address Details </h2>
          <div class="address"> ${element.customerName}</div>
          <div class="address"> ${element.customerAddress}</div>
          <div class="address"> ${element.orderDate} </div>
        </div>
           `

 }
