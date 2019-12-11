const Order = require("../models/order"),
    Article = require("../models/article"),
    { createMollieClient } = require('@mollie/api-client'),
    mollieClient = createMollieClient({ apiKey: "test_hUgDRy7uGxV5tRrF8pcFxB5TREA2ed" });

// ORDER
exports.order = (req, res) => {
    res.render("./order/order");
}

exports.order_post = (req, res) => {
// assign body.data to data
    const orderData = req.body;

    // get currentDate for creation time
    let ts = Date.now();
    let creationTime = new Date(ts);

    //get the total amount
    let totalAmount = 0;
    orderData[1].articles.forEach((item) => {
        let price = Number(item.amount) * Number(item.price);
        totalAmount = totalAmount + price
    });
    let roundedAmount = totalAmount.toFixed(2);

    // create article array
    articles = [];
    orderData[1].articles.forEach((item) => {
        let article = {
            _id: item.id,
            name: item.name,
            amount: item.amount
        }
        articles.push(article);
    });

    // create order variable
    let order = {
        amount: roundedAmount,
        articles: articles,
        address: orderData[0].address,
        orderedAt: creationTime
    }
    // create order db entry
    Order.create(order, (err, newOrder) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            // console.log(newOrder);
            // redirect to payment overview page
            res.redirect("/bestellen/betalen/" + newOrder._id);
        }
    });
}

// PAYMENT
exports.payment = (req, res) => {
    res.render("./order/payment", { orderId: req.params.id});
}

exports.payment_post = (req, res) => {
    res.send("hi");
}

// webhook
exports.webhook = (req, res) => {
    res.sendStatus(200);
    let data = req.body
        (async () => {
            try {
                const payment = await mollieClient.payments.get(data.id);

                console.log(payment);
            } catch (error) {
                console.warn(error);
            }
        });
}

// CONFIRMATION
exports.confirmation = (req, res) => {
    Order.findById(req.params.id, (err, foundOrder) => {
        if (err) {
            console.log(err);
            res.redirect("/bestellen/betalen");
        } else {
            res.render("./order/confirmation", { order: foundOrder });
        }
    });
}