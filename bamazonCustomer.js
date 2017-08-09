var mysql = require("mysql");
var inquirer = require("inquirer");
var products =[]

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "chen8722!",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
 console.log("List of our products")
 connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
  products.push(results[i].product_name);
          
            console.log(results[i].id+ " "+ results[i].product_name + ": $" +results[i].price)
            }


    inquirer
    .prompt([
    {
      type: "input",
      name: "prodcut_id",
      message: "Please enter the ID of the product that you would like to buy",
    },
    {
      type: "input",
      name: "quantity",
      message: "how many you would like to buy?",

    }

    ])
    .then(function(answer) {

    
    console.log(parseInt(answer.prodcut_id) + parseInt(answer.quantity))

      
    });



  });

  // start();
});



    
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.