const ul = document.querySelector('#users')
const url = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
const list = document.createDocumentFragment();
const usersData = [];
const compan = document.querySelector('#compname');
const commail = document.querySelector('#mail');
const combox = document.querySelector('#inp');
const box = document.querySelector('#numbertwo');
const cargoo = document.querySelector('.cargo');
const loader = document.getElementById('loading');


function fetchDate() {
    fetch(url)
    .then((response) => response.json())
    .then(data => {
         data.forEach((usr)=> {
             usersData.push(...data)
         });
    })
    .catch(err => console.log(err))
}

window.onload = (e)=> {
    fetchDate();
}
function displayList(data) {
    loader.style.display = "block";
    ul.addEventListener('click',(e)=> {
        
        let li = e.target;
        if (e.target.innerText == compan.innerText) {
            return;
        } else {
            compan.innerHTML = "";
            commail.innerHTML = "";
        console.log(li)
        let findUser = data.find((usr) => usr.name == li.innerText)
        const x = document.createTextNode(findUser.name);
        const email = document.createTextNode(findUser.email);
        const inpu = document.createTextNode(findUser.boxes);
        //const boxtwo = document.createTextNode(findUser.boxes);
        compan.appendChild(x)
        commail.appendChild(email)
        combox.appendChild(inpu)
        combox.value = findUser.boxes;
        let cauntCargo = caunt(findUser.boxes)
        box.innerHTML = cauntCargo;
    }
    loader.style.display = "none";
    })
    
}
combox.addEventListener('change',(e)=>{
    console.log(e.target.value)
})

function caunt (boxtwo){
    let arr = boxtwo.split(",");
    let int = arr.map(element => parseInt(element));
    let sum = int.reduce((acc,ele)=>acc + ele);
    return Math.ceil(sum/10);
}

displayList(usersData);