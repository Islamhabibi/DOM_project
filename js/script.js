const panier = document.getElementById('panier');
const totalPriceElement = document.getElementById('total-price');

const products = [
    {name:'Cocotte ovale', categorie:'Cuisson', price: 569,image:'img/cocotte-le-creuset-ovale-31cm.jpg', quantity: 1},
    {name:'Coffret de 4 couteaux',categorie:'Opinel', price: 53,image:'img/couteau-barroudeur-opinel-n°8-rouge.jpg', quantity: 1},
    {name:'Grille pain bugatti',categorie:'Petit électroménager', price: 255,image:'img/grille-pain-bugatti.jpg', quantity: 1},

];

function updatePriceTotal() {
    let totalPrice = 0;
    panier.querySelectorAll('.item').forEach(item => {
        //recupere la quantite achete 
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        //recuperer le prix en float
        const price = parseFloat(item.dataset.price);
        //calculer le prix totale 
        totalPrice += quantity * price;
    });
    //mettre le total prix avec deux chiffres après la virgule
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function createpanierItem(item) {
    //creation d'un element div
    const itemDiv = document.createElement('div');
    //l'element div leur class est item
    itemDiv.classList.add( 'item');
    itemDiv.dataset.price = item.price;
    //creation de l'affichage d'un produit dans la panier 
    itemDiv.innerHTML = `
        <div class="buttons">
            <span class="delete-btn delete-button"></span>
            <span class="like-btn like-button"></span>
        </div>    
        <div class="image">
            <img src="${item.image}" alt="${item.name}"   height="100%">
        </div>
        <div class=" description">
            <span>${item.name}</span>
            <span> </span>
            <span>${item.categorie}</span>
             
        </div>
         
        <div class="quantity1">
            <button class="btn minus-btnt">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="btn plus-btn">+</button>
        </div>
        <div class="prix-produit">$${item.price.toFixed(2)}</div> 
         
    `;
    const deleteButton = itemDiv.querySelector('.delete-button');
    const likeButton = itemDiv.querySelector('.like-button');
    const decrementButton = itemDiv.querySelector('.minus-btnt');
    const incrementButton = itemDiv.querySelector('.plus-btn');
    const quantityElement = itemDiv.querySelector('.quantity');
    //lorsque l'evenement est click on supprime l'elemet et on doit mettre a jours notre prix
    deleteButton.addEventListener('click', () => {
        itemDiv.remove();
        updatePriceTotal();
    });
    //lorsque l'evenement est click on fait l'animation sur le coeur
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('is-active');
    });

    

    //lorsque l'evenement est click on supprime un elemet et on doit mettre a jours notre prix
    decrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
            updatePriceTotal();
        }
    });
    //lorsque l'evenement est click on ajoute un elemet et on doit mettre a jours notre prix
    incrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updatePriceTotal();
    });
    //on fait le reture de l'element 
    return itemDiv;
} 
    
//pour chaque element dans l'objet produit on doit faire la creation de leur affichage 
products.forEach(item => {
    panier.appendChild(createpanierItem(item));
});
//on doit mettre a jours le prix 
updatePriceTotal();
//lorsque l'evenement est click supprime touts les  elemets (innerHTML="") et on doit mettre a jours notre prix totale
document.querySelector('.vide-panier').addEventListener('click', () => {
    panier.innerHTML = '';
    updatePriceTotal();
});
