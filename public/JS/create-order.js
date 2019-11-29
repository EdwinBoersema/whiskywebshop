window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("createOrderBtn").addEventListener('click', (event) => {
        sendOrder();
        event.preventDefault();
    });
});

const testarticles = [
    {
        id: "5ddbdb00acfc8f4f145a138e",
        amount: 2
    },
    {
        id: "5ddbdb00acfc8f4f145a138f",
        amount: 3
    },
    {
        id: "5ddbdb00acfc8f4f145a1390",
        amount: 1
    },
    {
        id: "5ddbdb00acfc8f4f145a1391",
        amount: 2
    },
    {
        id: "5ddbdb00acfc8f4f145a1392",
        amount: 5
    }
]

async function sendOrder() {
    // get products and address from Storage
    let order = [];
    let addressData = JSON.parse(sessionStorage.getItem(address.key));
    order.push(addressData);
    // let orderData = JSON.parse(localStorage.getItem(cart.Key));
    let products = { products: [] };
    products.products = testarticles;
    order.push(products);

    // fetch the data to the server
    await fetch('http://' +process.env.IP +':' +process.env.PORT +'/bestellen/betalen', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
        mode: "cors",
        // redirect to the returned url
    }).then((response => {
        window.location.replace(response.url);
    }));
}