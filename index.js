const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        bodyParser      = require("body-parser"), 
        Article         = require("./models/article"),
        seedDB          = require("./seeds");

const   indexRoutes     = require("./routes/index"),
        productsRoutes  = require("./routes/products");

// Express variables
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// Database connection
mongoose.connect("mongodb://localhost:27017/whiskywebshop", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false}).then(
        () => {
          console.log('Database is connected') },
        err => { console.log('Can not connect to the database'+ err)}
    );

// Seeden database with default data
// seedDB();

// Routes
app.use(indexRoutes); 
app.use("/producten", productsRoutes);

// listener
app.listen(3000, ()=>console.log("Whisky Webshop started on port 3000"));