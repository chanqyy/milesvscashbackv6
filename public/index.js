function calculateMilesCashback() {
    console.log("calculateMilesCashback function is called");
    let online = parseFloat(document.getElementById('onlineSpend').value);
    let mobileContactless = parseFloat(document.getElementById('mobileContactlessSpend').value);
    let offlineShopping = parseFloat(document.getElementById('offlineShopping').value);
    let dining = parseFloat(document.getElementById('offlineDining').value);
    let groceries = parseFloat(document.getElementById('offlineGroceries').value);
    let travel = parseFloat(document.getElementById('offlineTravel').value);
    let otherGeneralSpend = parseFloat(document.getElementById('offlineGeneralSpend').value);

        // Validate input values
    if (isNaN(online) || online < 0 ||
        isNaN(mobileContactless) || mobileContactless < 0 ||
        isNaN(offlineShopping) || offlineShopping < 0 ||
        isNaN(dining) || dining < 0 ||
        isNaN(groceries) || groceries < 0 ||
        isNaN(travel) || travel < 0 ||
        isNaN(otherGeneralSpend) || otherGeneralSpend < 0) {
        alert("Please enter valid positive numbers in all input fields.");
        return;
    }

    // My calculations
    let totalSpend = online + mobileContactless + offlineShopping + dining + groceries + travel + otherGeneralSpend;
    let evolLive = (online + mobileContactless)/4;
    let cashback = 0;
    if (totalSpend>0) {
        let miles = ((totalSpend - otherGeneralSpend) * 4 * 12) + (otherGeneralSpend * 1.2 *12);
        displayResult("resultMiles", miles)
    }

    if (totalSpend < 500) {
        cashback = totalSpend * 0.016 * 12;
        displayResult("resultCashbackBelow500", cashback);
    } 
    else if (online + mobileContactless >= 600 && online + mobileContactless < 1200) {
        let onlineCashback = Math.min(online * 0.08, 20);
        let mobileContactlessCashback = Math.min(mobileContactless * 0.08, 20);
        cashback = (onlineCashback *12) + (mobileContactlessCashback * 12) + (((online + mobileContactless - 600)+ offlineShopping + dining + groceries + travel + otherGeneralSpend) * 0.016 * 12);
        displayResult("resultCashbackAbove600", cashback);
        console.log("resultCashbackAbove600 function is called");
    } 
    else if (online + mobileContactless >= 1200 && online + mobileContactless < 2000) {
        let onlineCashback2 = Math.min(evolLive * 0.08, 20) + Math.min(evolLive * 0.05,20);
        let mobileContactlessCashback2 = Math.min(evolLive * 0.08, 20) + Math.min(evolLive * 0.05,20);
        cashback = (onlineCashback2 *12) + (mobileContactlessCashback2 * 12) + (((online + mobileContactless - 1600)+ offlineShopping + dining + groceries + travel + otherGeneralSpend) * 0.016 * 12);
        displayResult("resultCashback1200to2000", cashback);
        console.log("1200to2000 function is called");
    } 
    else if (totalSpend >= 500 && totalSpend < 1000) {
        cashback = 200 + ((totalSpend-500) * 0.016 * 12); // $50 per quarter, $200 per year
        displayResult("resultCashback500to999", cashback);
    } 
    else if (totalSpend >= 1000 && totalSpend < 2000) {
        cashback = 400 + ((totalSpend-1000) * 0.016 * 12); // $100 per quarter, $400 per year
        displayResult("resultCashback1000to1999", cashback);
    } 
    else if (totalSpend >= 2000) {
        cashback = 800 + ((totalSpend-2000) * 0.016 * 12); // $200 per quarter, $800 per year
        displayResult("resultCashbackabove2000", cashback);
    }

}

function displayResult(resultContainerId, value) {
// Hide all result containers
hideAllResultContainers();

// Display the specified result container
document.getElementById(resultContainerId).style.display = "block";

 // Set the value in the corresponding span
if (resultContainerId === "resultMiles") {
    let formattedValue = value.toLocaleString(); // Format the miles with commas
    document.getElementById("resultMilesValue").innerText = formattedValue;
} 
else {
    document.getElementById(resultContainerId + "Value").innerText = value.toFixed(2);
}

// Show the "resultMiles" container if it's not hidden
if (resultContainerId !== "resultMiles") {
    document.getElementById("resultMiles").style.display = "block";
}
}

function hideAllResultContainers() {
// Hide all result containers
let resultContainers = document.getElementsByClassName("result");
for (let i = 0; i < resultContainers.length; i++) {
    resultContainers[i].style.display = "none";
}
}