class Artikal {
    constructor(id, naziv, cena, opis) {
        this.id = id
        this.naziv = naziv
        this.cena = cena
        this.opis = opis
    }
}

let artikli = [
    new Artikal(1, "Laptop", 2000, "Gejmerski laptop najnovije generacije"),
    new Artikal(2, "TV", 650, "Smart TV sa zakrivljenim ekranom"),
]

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
    detaljCena.textContent = artikal.cena
    detaljOpis.textContent = artikal.opis
}
popuniTabelu()