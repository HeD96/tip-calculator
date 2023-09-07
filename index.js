// VERIFICATION ON KEY-UP AND CUSTOM TIP
let tipPercentFix = document.querySelectorAll(".tip_percent");
let tipCustom = document.querySelector(".selector-wrapper input");
let resetButton = document.querySelector(".reset button");

let bill = document.querySelector("#bill");
let numOfPeople = document.querySelector("#num-people");

tipPercentFix.forEach(function (percent) {
    percent.addEventListener("click", function () {
        tipPercentFix.forEach(function (tip) {
            tip.classList.remove("active");
        });

        percent.classList.add("active");
        let validBill = validation.validateBill();
        let validPeople = validation.validatePeople();
        if (validBill === true && validPeople === true) {
            tipCalculator.getTip(percent.getAttribute("data-value"));
            tipCalculator.getTotal(percent.getAttribute("data-value"));
        } else {
            console.log("Can't go through!");
        }
    });
});

let validation = (function () {
    let validateBill = function () {
        if (bill.value > 0) {
            bill.classList.remove("invalid");
            bill.classList.add("valid");
            return true;
        } else if (bill.value <= 0) {
            bill.classList.remove("valid");
            bill.classList.add("invalid");

            return false;
        }
    };

    let validatePeople = function () {
        if (numOfPeople.value > 0) {
            numOfPeople.classList.remove("invalid");
            numOfPeople.classList.add("valid");

            return true;
        } else if (numOfPeople.value <= 0) {
            numOfPeople.classList.remove("valid");
            numOfPeople.classList.add("invalid");

            return false;
        }
    };

    return {
        validateBill,
        validatePeople,
    };
})();

resetButton.addEventListener("click", function () {
    tipCalculator.resetAll();
});

let tipCalculator = (function () {
    let tipResult = document.querySelector(".per-person .result");
    tipResult.innerText = "$0.00";
    let totalResult = document.querySelector(".total .result");
    totalResult.innerText = "$0.00";

    // let bill = document.querySelector("#bill");
    // let numOfPeople = document.querySelector("#num-people");

    let getTip = function (percent) {
        let result = (bill.value * percent) / 100 / numOfPeople.value;
        tipResult.innerText = `$${result.toFixed(2)}`;
    };

    let getTotal = function (percent) {
        let result =
            (bill.value * percent) / 100 / numOfPeople.value +
            bill.value / numOfPeople.value;

        totalResult.innerText = `$${result.toFixed(2)}`;
    };

    let resetAll = function () {
        tipResult.innerText = "$0.00";
        totalResult.innerText = "$0.00";
        bill.value = "";
        numOfPeople.value = "";
    };

    return {
        getTip,
        getTotal,
        resetAll,
    };
})();
