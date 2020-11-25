
// --- global variables ---
  var defaultYear;
  var defaultLoanAmount;
  var defaultInterestRate;
  var loanWithInterest;

var loans = [
  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 

localStorage.setItem("loanArr", JSON.stringify(loans));
// --- function: loadDoc() ---
//function loadDoc() {

// loads the form once the page has loaded in the browser
$(document).ready(function(){
  
  var loansArr;
  
  // Test if default values from loans is in localStorage.
  // If it is, set the default values from the array in localStorage
  if (localStorage.getItem("loanArr") !== null){
    loansArr = localStorage.getItem("loanArr");
    loansArr = JSON.parse(loansArr);
    
    defaultYear = loansArr[0].loan_year;
    defaultLoanAmount = loansArr[0].loan_amount;
    defaultInterestRate = loansArr[0].loan_int_rate;
    loanWithInterest = loansArr[0].loan_amount * (1 + loansArr[0].loan_int_rate);
  }
  // If not in localStorage, use the loans Array to set default values
  else{
    defaultYear = loans[0].loan_year;
    defaultLoanAmount = loans[0].loan_amount;
    defaultInterestRate = loans[0].loan_int_rate;
    loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
  }
  
  // pre-fill defaults for first loan year
  $("#loan_year0" + 1).val(defaultYear++);
  $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2));
  $("#loan_int0" + 1).val(defaultInterestRate);
  $("#loan_bal0" + 1).innerHTML = toComma(loanWithInterest.toFixed(2));
  
  // pre-fill defaults for other loan years
  for(var i=2; i<6; i++) {
    $("#loan_year0" + i).val(defaultYear++);
    $("#loan_year0" + i).attr("disabled", "disabled"); 
    $("#loan_year0" + i).css("background-color", "gray");
    $("#loan_year0" + i).css("color", "white");
    $("#loan_amt0" + i).val(defaultLoanAmount.toFixed(2));
    $("#loan_int0" + i).val(defaultInterestRate);
    $("#loan_int0" + i).attr("disabled", "disabled"); 
    $("#loan_int0" + i).css("background-color", "gray");
    $("#loan_int0" + i).css("color", "white");
   loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
   $("#loan_bal0" + i).value = toComma(loanWithInterest.toFixed(2));
    } // end: "for" loop
  
  // all input fields: select contents on fucus
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
  });
  
  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    let regex1 = /^[0-9]{4}$/; //regular expression to test for 4 digit year
    let x = ($("#loan_year01").val()); // assigns the string value of the year inputbox to x

    // test if x fits the regex pattern
    if (regex1.test(x) == true){
      $("#loan_year01").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_year01").css("background-color", "red");
      alert("Loan start year is invalid. Enter a 4-digit year.");
    }
  });
  
  // when focus is removed from the first int rate
  $("#loan_int01").blur( function() {
    let regex2 = /^[0]?[.][0-9]{1,4}$/; //regular expression to test for proper interest rate format
    // start character is an optional 0, followed by a decimal, followed by 1 to 4 numbers between 0-9
    let y = ($("#loan_int01").val()); // assigns the string value of the int rate inputbox to y

    // test if y fits the regex pattern
    if (regex2.test(y) == true){
      $("#loan_int01").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_int01").css("background-color", "red");
      alert("Interest Rate is invalid. Enter up to a 4-digit interest rate. Ex: 0.4324");
    }
  });
  
  
  // Have to do the amounts seperately otherwise clicking off 1 amount column will effect all others
  // when focus is removed from the first amt textbox
  $("#loan_amt01").blur( function() {
    let regex3 = /^[0-9]{1,6}.?[0-9]{0,2}?$/; //regular expression to test for proper amount. Must be a whole number between 0-999,999
     let z = ($("#loan_amt01").val()); // assigns the string value of the loan_amt01 inputbox to z
  
     // test if z fits the regex pattern
    if (regex3.test(z) == true){
      $("#loan_amt01").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_amt01").css("background-color", "red");
      alert("Start year amount is invalid. Enter up to a 6-digit value for the amount. Do not include $ or ,");
    }
  });
 
  // when focus is removed from the second amt textbox
  $("#loan_amt02").blur( function() {
    let regex3 = /^[0-9]{1,6}.?[0-9]{0,2}?$/; //regular expression to test for proper amount. Must be a whole number between 0-999,999
     let z = ($("#loan_amt02").val()); // assigns the string value of the loan_amt02 inputbox to z
  
     // test if z fits the regex pattern
    if (regex3.test(z) == true){
      $("#loan_amt02").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_amt02").css("background-color", "red");
      alert("Year 2 amount is invalid. Enter up to a 6-digit value for the amount. Do not include $ or ,");
    }
  });
  
  // when focus is removed from the third amt textbox
  $("#loan_amt03").blur( function() {
    let regex3 = /^[0-9]{1,6}.?[0-9]{0,2}?$/; //regular expression to test for proper amount. Must be a whole number between 0-999,999
     let z = ($("#loan_amt03").val()); // assigns the string value of the loan_amt03 inputbox to z
  
     // test if z fits the regex pattern
    if (regex3.test(z) == true){
      $("#loan_amt03").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_amt03").css("background-color", "red");
      alert("Year 3 amount is invalid. Enter up to a 6-digit value for the amount. Do not include $ or ,");
    }
  });
  
    // when focus is removed from the fourth amt textbox
  $("#loan_amt04").blur( function() {
    let regex3 = /^[0-9]{1,6}.?[0-9]{0,2}?$/; //regular expression to test for proper amount. Must be a whole number between 0-999,999
     let z = ($("#loan_amt04").val()); // assigns the string value of the loan_amt04 inputbox to z
  
     // test if z fits the regex pattern
    if (regex3.test(z) == true){
      $("#loan_amt04").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_amt04").css("background-color", "red");
      alert("Year 4 amount is invalid. Enter up to a 6-digit value for the amount. Do not include $ or ,");
    }
  });
  
    // when focus is removed from the fifth amt textbox
  $("#loan_amt05").blur( function() {
    let regex3 = /^[0-9]{1,6}.?[0-9]{0,2}?$/; //regular expression to test for proper amount. Must be a whole number between 0-999,999
     let z = ($("#loan_amt05").val()); // assigns the string value of the loan_amt05 inputbox to z
  
     // test if z fits the regex pattern
    if (regex3.test(z) == true){
      $("#loan_amt05").css("background-color", "white");
        updateLoansArray();
        }
    else {
      $("#loan_amt05").css("background-color", "red");
      alert("Year 5 amount is invalid. Enter up to a 6-digit value for the amount. Do not include $ or ,");
    }
  });
  
//} // end: function loadDoc()
}); //end of $(document).readyfunction()//

function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function updateLoansArray() {
  let totalInt = 0;
  let sum = 0;

  loans[0].loan_year = parseInt($("#loan_year01").val());
  loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
  sum = (parseFloat($("#loan_amt01").val())) * (1 + loans[0].loan_int_rate)
  totalInt = parseFloat($("#loan_amt01").val());
  $("#loan_bal01").text(sum.toFixed(2));
  
  
  for(var i=1; i<5; i++) {
    loans[i].loan_year = loans[0].loan_year + i;
    $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
    $("#loan_int0"+ (i+1) ).val(loans[0].loan_int_rate);
    sum = (sum + parseFloat($("#loan_amt0" + (i+1)).val())) * (1 + loans[0].loan_int_rate);
    totalInt += parseFloat($("#loan_amt0" + (i+1)).val());
    $("#loan_bal0" + (i+1)).text(sum.toFixed(2));
  }
  totalInt = parseFloat($("#loan_bal05").text()) - totalInt;
  let temp = "$" + totalInt.toFixed(2)
  $("#loan_int_accrued").text(temp);
}




var app = angular.module("myPayments", []) // create the container for app
app.controller("myController", function($scope){ // app function
  $scope.payments = []; // used to store the values for the rows
  $scope.populate = function () { // populates the values from payments into the row
        
    updateLoansArray();
    
    let temp = ($("#loan_bal05").text());// total with interest as a string
    temp.replace('$', ''); // remove $ from the string
    let total = parseFloat(temp); // total with interest as a float
    let IR = parseFloat($("#loan_int01").val()); // yearly interest rate
    let r = IR / 12; //monthly interest rate
    let n = 11; // number of payment periods
    
    //loan payment formula
    //https://www.thebalance.com/loan-payment-calculations-315564
    let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12))));
    
    // years 1-9 follow this pattern
    for (let i = 0; i < 10; i++) {
      total -= pay 
      let int = total * (IR); 
      $scope.payments[i] = {
        "year":loans[4].loan_year + i + 1,
        "payment": (pay).toFixed(2), 
        "amt": (int).toFixed(2),
        "ye": (total += int).toFixed(2)
      }
    }
   // year 10 is the final payment and is different than years 1-9
    $scope.payments[10] = {
      "year":loans[4].loan_year + 11,
      "payment": (total).toFixed(2),
      "amt": (0),
      "ye": (0)
    }
  }
});    
