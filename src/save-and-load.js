let data = [];
function saveEntry(name, data, uuid) {
    this.name = name;
    this.uuid = uuid;
    this.data = data;
}


function save() {
    const name = document.querySelector('#name').value;
    console.log(window.Data)

    let entry = new saveEntry(name, window.Data, crypto.randomUUID())
    console.log(entry)
    data = JSON.parse(localStorage.getItem("data"));
    if (data) {
        data.push(entry);
    }
    else {
        data = [entry]
    }

    localStorage.setItem("data", JSON.stringify(data) );

    document.querySelector('#saved').style.visibility = "visible";
    setTimeout(() => {
        document.querySelector('#saved').style.visibility = "hidden";
    }, 1000)
}

function load(uuid) {
    const load = localStorage.getItem("data");
    const data = JSON.parse(load)
    window.Data = data.find(entry => entry.uuid === uuid).data
    draw()
}

function cancelLoad() {
    const loadMenu = document.querySelector('#load-menu');
    loadMenu.style.visibility = "visible"
}

function loadMenu() {

    const loadMenu = document.querySelector('#load-menu');
    if(loadMenu.childList) {
        loadMenu.childList.forEach((entry) => {
            loadMenu.removeChild(entry);
        })
    }

    loadMenu.style.visibility = "visible"

    data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        return
    }
    const names = data.map(f => f.name);
    console.log(names)
    data.forEach(n => {
        let element = document.createElement('button');
        element.innerText = n.name;
        loadMenu.appendChild(element)
        element.addEventListener('click', (e) => {
            start(n.uuid);
        });
    });
}

function start(uuid = null) {
    window.location.href = "editor.html";

    localStorage.setItem("uuid", JSON.stringify(uuid));
}