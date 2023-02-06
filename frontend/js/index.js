document.getElementById("btn").addEventListener('click', getData)

function getData(params) {
    fetch("/posts")
        .then(res => res.json())
        .then(res => {
            console.log("data", res)
            document.getElementById("dataOne").innerHTML = res[0].name
            document.getElementById("dataTwo").innerHTML = res[1].name
            document.getElementById("dataThree").innerHTML = res[2].name
        })
}