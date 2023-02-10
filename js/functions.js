/* Github link for user's repo information */
const username = "zambodev"
const link = "https://api.github.com/users/" + username + "/repos"
const text = "Zambo"
const title_html = document.getElementById("main_text")


/* Retrive data object from github */
async function getRepos() {
    try {
        let res = await (await fetch(link)).json();
        res = sortByDate(res);
        return res;
    } catch (error) {
        console.error(error);
    }
}

/* Sort object components */
function sortByDate(obj) {
    for (var i = 0; i < obj.length; i++) {
        for (var j = 1; j < obj.length; j++) {
            var t1 = new Date(obj[j].pushed_at)
            var t2 = new Date(obj[j - 1].pushed_at)
            if (t1 > t2) {
                var tmp = obj[j]
                obj[j] = obj[j - 1]
                obj[j - 1] = tmp
            }
        }
    }

    return obj
}

/* Update on screen data */
function getTable() {
    const table = document.getElementById("projTable")
    
    /* Crete table heasder */
    let row = table.insertRow(0);
    row.insertCell().outerHTML = "<th>Repository</th>";
    row.insertCell().outerHTML = "<th>Language</th>";

    /* Fill table body */
    getRepos()
    .then(obj => {
        for (var idx = 1; idx < 9; idx++) {
            /* Insert new row */
            let row = table.insertRow(idx)
            /* Create repo name link */
            var link = document.createElement("a")
            link.setAttribute("href", obj[idx - 1].html_url)
            link.setAttribute("rel", "noopener noreferrer")
            link.appendChild(document.createTextNode(obj[idx - 1].name))
            /* Insert link */
            let cell = row.insertCell()
            cell.appendChild(link)
            /* Insert language */
            cell = row.insertCell()
            if (obj[idx - 1].language == null) {
                cell.innerHTML = "No language"
            } else {
                cell.innerHTML = obj[idx - 1].language
            }
        }
    });
}

function updateData() {
    let footerCopyright = document.getElementById("copyright");
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    footerCopyright.textContent += username + " - " + year;

    const whoamiAge = document.getElementById("whoami");
    whoamiAge.textContent = "Hi! I'm Thomas and I'm a " + ((month-9 >= 0) ? year-2001 : year-1-2001) + " yo developer from Italy";

    let tableLink = document.getElementById("projLink");
    tableLink.setAttribute("href", link);
}


getTable();
updateData();
