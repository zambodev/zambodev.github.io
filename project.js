var mainTable = document.getElementById("mainTable");
var contributors = document.getElementById("contributorsFlexbox");

async function getData(link) {
    let response = await fetch(link);
    let obj = await response.json();

    return obj;
}

if(location.href.split('/').pop() != "index.html") {

    getData(`https://api.github.com/users/Zambo-dev/repos`)
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

} else {
 
    getData(`https://api.github.com/repos/Zambo-dev/Zambo-dev.github.io/contributors`)
    .then((obj) => {
        
        for(var index = 1; index < obj.length; index++) {
        
            var a = document.createElement('a');
            a.setAttribute('href', obj[index].html_url);
            a.innerHTML = obj[index].login;
            document.getElementById("contributorsFlexbox").appendChild(a);
            
        }

    });

}