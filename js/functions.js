async function getData(link) {
    let response = await fetch(link);
    let obj = await response.json();

    return obj;
}

function parseDate(date) {
    const month = date.getMonth() + 1;
    const data_str = date.getUTCDate() + "-" + month + "-" + date.getFullYear();
    return data_str;
}

function isMobile() {
    if(window.innerWidth <= 800)
        return true;
    else
        return false;
  }

function sort(obj) {
    for(var i=0; i < obj.length; i++) {
        for(var j=1; j < obj.length; j++) {
            var t1 = new Date(obj[j].updated_at);
            var t2 = new Date(obj[j-1].updated_at);
            if(t1 > t2) {
                var tmp = obj[j];
                obj[j] = obj[j-1];
                obj[j-1] = tmp;
            }
        }
    }

    return obj;
}

function update() {
    const mainTable = document.getElementById("mainTable");

    if(mainTable !== null) {

        getData(`https://api.github.com/users/Zambo-dev/repos`)
            .then((obj) => {    
                
                var obj = sort(obj);

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
                    
                    if(!isMobile()) {
                        cell[index1] = row.insertCell();
                        cell[index1].innerHTML = parseDate(new Date(obj[index1 -1].updated_at));
                    }
                    else
                    {
                        var last_commit = document.getElementById("commit");
                        last_commit.style.display = "none";
                        
                        var language = document.getElementById("lang");
                        language.innerHTML = "Lang";
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
            
            const contributors = document.getElementById("contributorsFlexbox");

            for(var index = 0; index < obj.length; index++) {
            
                var a = document.createElement('a');
                var img = document.createElement('img');
                img.setAttribute('src', obj[index].avatar_url);
                img.setAttribute('alt', obj[index].login);
                img.setAttribute('title', obj[index].login);
                a.setAttribute('href', obj[index].html_url);
                a.appendChild(img);
                document.getElementById("images").appendChild(a);
                
            }

        });

    }
}

update();