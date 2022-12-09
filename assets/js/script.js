const btn = document.getElementById("calc");
const dashboard = document.getElementById("dashboard");
const tbody = document.getElementById("tbody");

var result_arr = [];
const count_result = {};

btn.addEventListener("click", function(e) {
    for (var i=0; i<tbody.children.length; i++) {
        const input = tbody.children[i].children;
        var k1 = parseInt(input[2].firstChild.value);
        var k2 = parseInt(input[3].firstChild.value);
        var k3 = parseInt(input[4].firstChild.value);
        var b = parseInt(input[5].firstChild.value);

        if (k1>100 || k1<0 || k2>100 || k2<0 || k3>100 || k3<0 || b>100 || b<0) {
            alert("Daxil edilən bal 0 və 100 arasında olmalıdır!");
            break;
        }

        var result = Math.round(((k1+k2+k3)/3)*4/10+b*6/10);
        var result_end = 0;

        if (result >=0 && result < 31) {
            result_end = 2;
        } else if (result >=31 && result < 61) {
            result_end = 3;
        } else if (result >=61 && result < 81) {
            result_end = 4;
        } else if (result >=81 && result <= 100) {
            result_end = 5;
        }
        result_arr.push(result_end);

        input[6].innerHTML = result;
        input[7].innerHTML = result_end;
    }

    dashboard.style.display = "inline-block";

    result_arr.forEach(element => {
        count_result[element] = (count_result[element] || 0) + 1;
    });
    new Chart("b", {
        type: "bar",
        data: {
            labels: ["0-30", "31-60", "61-80", "81-100"],
            datasets: [{
                label: 'Şagird sayı',
                backgroundColor: ["#FF3924", "#FF9600", "#CDF03A", "#2CE574"],
                data: [count_result['2'], count_result['3'], count_result['4'], count_result['5']]
            }]
        }
    });

    new Chart("result1", {
        type: "pie",
        data: {
            labels: ["2", "3", "4", "5"],
            datasets: [{
                label: 'Şagird sayı',
                backgroundColor: ["#FF3924", "#FF9600", "#CDF03A", "#2CE574"],
                data: [count_result['2'], count_result['3'], count_result['4'], count_result['5']]
            }]
        }
    });

    e.preventDefault();
});

dashboard.addEventListener("click", function(e) {
    document.getElementById("charts").style.display = "block";
    e.preventDefault();
});