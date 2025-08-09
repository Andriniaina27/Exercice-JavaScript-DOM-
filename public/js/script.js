var content = document.getElementById('content');
var search = document.createElement('input');
search.placeholder  = "Recherche"
content.appendChild(search)

const phone = /^[0-9]\d{3}\s[0-9]\d{2}\s[0-9]\d{3}\s[0-9]\d{2}\s/

var table = document.createElement('table');
content.appendChild(table);
table.createCaption().textContent = "Titre";

var thead = table.createTHead();
var tr = document.createElement('tr');
thead.appendChild(tr);
var titre = ["Nom", "Adresse email", "Age", "Sexe", "Action"]
for (let i = 0; i< titre.length; i++) {
    var th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = titre[i]
    th.style.textAlign = "center"
}

var tbody = table.createTBody()
table.appendChild(tbody)

document.getElementById("sexe").addEventListener('change', AddTable);
    function AddTable(){
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;
        var age = document.getElementById("age").value;
        var sexe = document.getElementById("sexe").value;
    
        let table1 = table.getElementsByTagName("tbody")[0];
        if(nom === "" || prenom === "" || age === "" || sexe === ""){
            document.getElementById("error").innerHTML = "Veuillez remplir le(s) champ(s) vide"
            return;
        }
        else    if(age < 0){
            document.getElementById("error").innerHTML = "Age inexistant"
            return;
        }
    
        let row = table1.insertRow()
    
        var colNom = row.insertCell(0)
        var colPrenom = row.insertCell(1)
        var colAge = row.insertCell(2)
        var colSexe = row.insertCell(3)
        var colBtn = row.insertCell(4)

        colNom.innerHTML = nom;
        colPrenom.innerHTML = prenom;
        colAge.innerHTML = age;
        colSexe.innerHTML = sexe;
        // colBtn.innerHTML = '<button class="danger" id="btn">Supprimer</button>'
        
        colAge.style.textAlign = "end"
        document.getElementById("error").innerHTML = ""
        document.getElementById("form").reset()
}

// document.getElementById("btn").addEventListener('change', AddTable);
search.addEventListener("input", function () {
    let input = search.value.toLowerCase();
    let rows = document.querySelectorAll("table tbody tr");

    rows.forEach(function (row) {
    //   let nom = row.cells[0].textContent.toLowerCase();
      let cells = Array.from(row.cells)
    //   let resultat = nom.includes(input);
      let match = cells.some(cell => cell.textContent.toLowerCase().includes(input))
      
      row.style.display = match ? "" : "none";
    });
});

table.addEventListener("click", AddInput);
    function AddInput(e){
        let target = e.target
        while (target && target.nodeName !== 'TR') {
            target = target.parentElement;
        }

        // if (!target || target.nodeName !== 'TR' || target === table.rows[0]) {
        //     return;
        // }

        // // Clear previous selection
        const selectedRow = table.querySelector('tr.selected');
        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }

        // Mark the clicked row as selected
        // target.classList.add('selected');
        const cells = target.getElementsByTagName("td");

        if(cells.length > 0){
            document.getElementById("nom").value = cells[0].textContent;
            document.getElementById("prenom").value = cells[1].textContent;
            document.getElementById("age").value = cells[2].textContent;
            document.getElementById("sexe").value = cells[3].textContent;
        }
        // table.querySelector('tr').removeChild(cells)
}

const masque = /^[A-Z]{0, 50}/

const regex1 = /^[a-zA-Z]\w{0,32}@[a-z]\w{0,32}\.[a-z]{2,3}/
var nom = document.getElementById("prenom")
nom.addEventListener("blur", function(){
    var valeur = nom.value;
    var test = regex1.test(valeur);

    nom.addEventListener("input", function(){
        nom.style.background = "#0a0a0a";
    })

    if(!test){
        nom.style.background = "rgb(184, 60, 60)";
        return;
    }
})