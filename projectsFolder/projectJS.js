var mainTable = document.getElementById("mainTable");

async function getData() {
    let response = await fetch(`https://api.github.com/users/GiovanniNeve/repos`);
    let obj = await response.json();

    return obj;
}

getData()
    .then((obj) => {
        
        while (mainTable.rows[1]) {
            mainTable.rows[1].remove();
        }
        for (var index1 = 1; index1 < obj.length + 1; index1++) {
            let row = mainTable.insertRow(index1);
            let cell = new Array(6);
            cell[index1] = row.insertCell();
            cell[index1].innerHTML = obj[index1 - 1].name;
            cell[index1] = row.insertCell();
            
            if(obj[index1 - 1].language == null) {
                cell[index1].innerHTML = "No language";
            } else {
                cell[index1].innerHTML = obj[index1 - 1].language;
            }

            var str = "GitHub";
            var a = str.link(obj[index1 - 1].html_url);

            cell[index1] = row.insertCell();
            cell[index1].innerHTML = a;

        }
    });