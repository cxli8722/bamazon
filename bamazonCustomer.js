var mysql = require("mysql");
var inquirer = require("inquirer");
var products =[]
var Table = require('cli-table');

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

   console.log("List of our products")
   connection.query("SELECT * FROM products", function(err, results) {

      if (err) throw err;
      for (var i = 0; i < results.length; i++) {
      products.push(results[i].product_name);

      

     // console.log(results[i].id+ " "+ results[i].product_name + ": $" +results[i].price +"  quantity: " +results[i].stock_quantity )

             var table = new Table({
              chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                     , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                     , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                     , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
            });
             
            table.push(
                ['product_ID', 'Prodcut_Name', 'Price', 'Quantity']
              , [results[i].id, results[i].product_name , results[i].price, results[i].stock_quantity]
            );
             
              console.log(table.toString());
      }



  // function start (){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "please choose from the options below?"
        },

        {
          name: "quantity",
          type: "input",
          message: "how many you would like to purchase?"
        }
      ])
      .then(function(answer) {
        //console.log("answers : " + answer.choice +"   " + "qunantity:  " + answer.quantity )            
          var dbquantity=0;
          for (var i = 0; i < results.length; i++) {
            if(results[i].product_name ===answer.choice ) {
            dbquantity = results[i].stock_quantity;
            break
            }
          }

          if(dbquantity>answer.quantity){

            var newQuantity= dbquantity-answer.quantity;
                  connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: newQuantity
                    },
                    {
                      product_name: answer.choice
                    }
                  ],
                  function(error) {
                    if (error) throw err;
                    console.log("Bid placed successfully!");
                  }
                );
                } 
            else {
                    console.log("sorry out of stock")
                  }
      
        });  
  
    })

  });
});



  

 
