/* Github link for user's repo information */
const username = "zambodev";
const apiLink = "https://api.github.com/users/" + username + "/repos";
const userLink = "https://github.com/" + username;
const text = "Zambo";
const title_html = document.getElementById("main_text");


/* Retrive data object from github */
async function getRepos() {
    try {
        let res = await (await fetch(apiLink)).json();
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
    /* Fill table body */
    getRepos()
    .then(obj => {
        for (var idx = 0; idx < 9; idx++) {
            /* Insert new row */
            let row = table.insertRow(idx)
            /* Create repo name link */
            var link = document.createElement("a")
            link.setAttribute("href", obj[idx].html_url)
            link.setAttribute("rel", "noopener noreferrer")
            link.appendChild(document.createTextNode(obj[idx].name))
            /* Insert link */
            let cell = row.insertCell()
            cell.appendChild(link)
            /* Insert language */
            cell = row.insertCell()
            if (obj[idx].language == null) {
                cell.innerHTML = "No language"
            } else {
                cell.innerHTML = obj[idx].language
            }
        }
    });
}

function updateData() {
    var date = new Date();

    let footerCopyright = document.getElementById("copyright");
    footerCopyright.textContent += username + " - " + date.getFullYear();
}


getTable();
updateData();
