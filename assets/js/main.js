$(document).ready(async function(){
        const url='https://jsonplaceholder.typicode.com/photos?_start=0&_limit=12';
        
        const data=await fetch(url).then(function(responce){return responce.json();})
           

        // console.log(card)
       
        showProduct(data);

        showBasketProducts(data)

        basketCount()

        removeProduct()

})

function showProduct(data){
 data.forEach(element => {
                $('#card').append(`
                <div class="col" > 
                    <div class="card h-100 shadow-sm"> 
                        <img src="${element.thumbnailUrl}" class="card-img-top" alt="..."> 
                        <div class="card-body"> 
                                <h5 class="card-title">${element.title}</h5>
                            <div class="text-center my-4"> 
                                <a href="#" class="btn btn-primary add-basket" data-id="${element.id}">Add to Card</a> 
                            </div> 
                    </div> 
                    </div> 
                `)
            });
            addProduct()
}

function saveBasket(basket){
        localStorage.setItem('basket',JSON.stringify(basket));
    }

function getBasket(){
        let basket = localStorage.getItem('basket');
        return  basket == null ? {} : JSON.parse(basket);
}
function addProduct(){
        $(document).on('click','.add-basket',function(e){
            const productId = $(this).data('id');
    
            console.log(productId)
            let basket = getBasket();
    
    
            if(!basket[productId]){
                basket[productId] = 1;
                saveBasket(basket);
            }else{
                // basket[productId]++;
                saveBasket(basket);
            }
    
            $(this).parent().find('.counter').html(basket[productId]);
            window.location.reload()

    
        });
    }

function showBasketProducts(data){
        baskets=getBasket();
        const basketitems=Object.keys(baskets)

        // const basketProducts=data.filter(function(product){
        //     if(baskets.includes(product.id)){
        //         $('#basket-items').append(`
        //                                  <div class="basket-item">
        //                                        <img src="${element.thumbnailUrl}" alt="" class="basket-img">
        //                                         <div class="basket-title">${element.title.substring(0,6)}</div>
        //                                         <div class="btn btn-warning remove" data-id="${element.id}" >delete</div>
        //                                 </div>`)
        //     }
        // })
        data.forEach((element)=>{
                for (let index = 0; index <basketitems.length; index++) {
                        if( element.id== basketitems[index])
                           {
                                // console.log(element.id)
                                //  console.log(element.id,baskets)
                                $('#basket-items').append(`
                                         <div class="basket-item">
                                               <img src="${element.thumbnailUrl}" alt="" class="basket-img">
                                                <div class="basket-title">${element.title.substring(0,6)}</div>
                                                <div class="btn btn-warning remove" data-id="${element.id}" >delete</div>
                                        </div>`)
                           }
                }       
        })
}

function basketCount(){
        baskets=getBasket();
        const basketitems=Object.keys(baskets)
        // console.log(basketitems.length)
        document.getElementById('count').innerText=basketitems.length
}

function removeProduct(){
        $(document).on('click','.remove',function(e){
            const productId = $(this).data('id');
    
            let basket = getBasket();
                console.log($(this).data('id'))
    

            if(basket[productId]){
    
                if(basket[productId] > 1){
                    basket[productId]--;
    
                }else{
                    delete basket[productId];
                }
    
                saveBasket(basket);
            }
            window.location.reload()

        });
    }









const basketbtn=document.querySelector('.fa-basket-shopping')
const basketitems=document.querySelector('.basket-items')



console.log(basketbtn,basketitems)

basketbtn.addEventListener("click",function(){
       basketitems.classList.toggle('active')
})