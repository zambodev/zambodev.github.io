/* Github link for user's repo information */
const link = `https://api.github.com/users/Zambo-dev/repos`;
const text = "Zambo"
const term_bar = '_'
const title_html = document.getElementById("title_txt");
const speed = 500
var blink_time = 6
var idx = 0;
var b_idx = 0;
var set = true

/* Retrive data object from github */
async function getData() {
    let response = await fetch(link);
    let obj = await response.json();

    return obj;
}

/* Parse date into a string */
function parseDate(date) {
    const month = date.getMonth() + 1;
    const dateStr =
        date.getUTCDate() +
        "/" +
        month +
        "/" +
        date.getFullYear().toString().slice(2);
    return dateStr;
}

/* Detect if the screen is landscape or mobile format */
function isMobile() {
    return (window.innerWidth <= 800);
}

/* Sort object components */
function sort(obj) {
    for (var i = 0; i < obj.length; i++) {
        for (var j = 1; j < obj.length; j++) {
            var t1 = new Date(obj[j].pushed_at);
            var t2 = new Date(obj[j - 1].pushed_at);
            if (t1 > t2) {
                var tmp = obj[j];
                obj[j] = obj[j - 1];
                obj[j - 1] = tmp;
            }
        }
    }

    return obj;
}

/* Update on screen data */
function update() {
    const mainTable = document.getElementById("project_table");

    if (mainTable !== null) {
        getData().then((obj) => {
            var obj = sort(obj);

            while (mainTable.rows[1]) {
                mainTable.rows[1].remove();
            }
            for (var index1 = 1; index1 < obj.length + 1; index1++) {
                let row = mainTable.insertRow(index1);
                let cell = new Array(6);

                /* Project name */
                var link = document.createElement("a");
                link.setAttribute("href", obj[index1 - 1].html_url);
                link.setAttribute("rel", "noopener noreferrer");
                var linkText = document.createTextNode(obj[index1 - 1].name);
                link.appendChild(linkText);

                cell[index1] = row.insertCell();
                cell[index1].appendChild(link);

                /* Language */
                cell[index1] = row.insertCell();
                if (obj[index1 - 1].language == null) {
                    cell[index1].innerHTML = "No language";
                } else {
                    cell[index1].innerHTML = obj[index1 - 1].language;
                }

                /* Last commit */
                if (!isMobile()) {
                    cell[index1] = row.insertCell();
                    cell[index1].innerHTML = parseDate(
                        new Date(obj[index1 - 1].pushed_at)
                    );
                }
            }
        });
    }
}

function add_text() {

	title_html.textContent = title_html.textContent.replace(term_bar, text.charAt(idx))
	title_html.textContent += term_bar
	++idx

	if(idx < text.length)
		setTimeout(add_text, 180)
	else {
		blink_time = 0
		setTimeout(blink, 180)
	}
}

function blink() {
	if(set) {
		title_html.textContent = title_html.textContent.replace(term_bar, ' ')
		set = false
	}
	else {
		title_html.textContent = title_html.textContent.replace(' ', term_bar)
		set = true
	}
	++b_idx

	if(b_idx < blink_time || blink_time == 0)
		setTimeout(blink, 400)
	else
		setTimeout(add_text, 400)
}

blink()
/* Run update data */
update();
