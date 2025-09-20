class Artikal {
    constructor(id, naziv, cena, opis) {
        this.id = id
        this.naziv = naziv
        this.cena = cena
        this.opis = opis
    }
}

let artikli = []
let sacuvaniArtikli = localStorage.getItem("artikli")
if (sacuvaniArtikli) {
    let niz = JSON.parse(sacuvaniArtikli)
    for (let i = 0; i < niz.length; i++) {
        let a = niz[i]
        artikli.push(new Artikal(a.id, a.naziv, a.cena, a.opis))
    }
}

function popuniTabelu() {
    let tbody = document.querySelector("#tabela-artikala tbody")
    tbody.innerHTML = ""

    for (let i = 0; i < artikli.length; i++) {
        let artikal = artikli[i]

        let tr = document.createElement("tr")
        let tdId = document.createElement("td")
        let tdNaziv = document.createElement("td")
        let tdCena = document.createElement("td")

        tdId.textContent = artikal.id
        tdNaziv.textContent = artikal.naziv
        tdCena.textContent = artikal.cena

        tr.appendChild(tdId)
        tr.appendChild(tdNaziv)
        tr.appendChild(tdCena)

        tr.addEventListener("click", function () {
            prikaziDetalje(artikal)
        })

        tbody.appendChild(tr)
    }
}
function prikaziDetalje(artikal) {
    let detaljNaziv = document.querySelector("#detalj-naziv")
    let detaljCena = document.querySelector("#detalj-cena")
    let detaljOpis = document.querySelector("#detalj-opis")

    detaljNaziv.textContent = ""
    detaljCena.textContent = ""
    detaljOpis.textContent = ""

    detaljNaziv.textContent = artikal.naziv
    detaljCena.textContent = artikal.cena + "$"
    detaljOpis.textContent = artikal.opis
}
popuniTabelu()



let forma = document.querySelector("#forma-artikla")
forma.addEventListener("submit", function (event) {
    event.preventDefault()

    let formData = new FormData(forma)
    let nazivInput = formData.get("naziv").trim()
    let cenaInput = parseFloat(formData.get("cena"))
    let opisInput = formData.get("opis").trim()

    if (nazivInput === "" || isNaN(cenaInput) || opisInput === "") {
        alert("Popunite sva polja!")
        return
    }

    let postoji = false
    for (let i = 0; i < artikli.length; i++) {
        if (
            artikli[i].naziv.toLowerCase() === nazivInput.toLowerCase() &&
            artikli[i].cena === cenaInput &&
            artikli[i].opis.toLowerCase() === opisInput.toLowerCase()
        ) {
            postoji = true
            break
        }
    }
    if (postoji) {
        alert("Artikal sa istim podacima već postoji!")
        return
    }


    let noviId = 1
    if (artikli.length > 0) {
        noviId = artikli[artikli.length - 1].id + 1
    }

    let noviArtikal = new Artikal(noviId, nazivInput, cenaInput, opisInput)
    artikli.push(noviArtikal)
    localStorage.setItem("artikli", JSON.stringify(artikli))

    popuniTabelu()

    forma.reset()
})