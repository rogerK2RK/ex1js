const tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        title: "Répondre à mes emails",
        priority: 3
    }
];

let newTasks = tasks; 
const filtreSelect = document.querySelector("#filtre-select");

const ul = document.querySelector("#todolist ul");

/** Afficher la liste des Tâches **/
function afficheList() {
    ul.innerHTML = ''; 

    newTasks.forEach((task, index) => {
        const li = document.createElement("li");
        const label = document.createElement('label');
        const checkbox = document.createElement("input");

        label.textContent = task.title;
        checkbox.type = "checkbox";
        checkbox.setAttribute("data-index", index);

        // Ajouter de la classe pour les propriétées
        if (task.priority === 1) {
            li.classList.add("haut");
        } else if (task.priority === 2) {
            li.classList.add("normal");
        } else if (task.priority === 3) {
            li.classList.add("bass");
        }

        label.prepend(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
    });
}

afficheList();

/** Ajout d'une tâche **/
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire DOM
    const taskTitle = document.querySelector("#tache-name").value;
    const taskPriority = parseInt(document.querySelector("#proproete-select").value);

    // Ajouter la nouvelle tâche au tableau newTasks
    newTasks.push({
        title: taskTitle,
        priority: taskPriority
    });

    // Réafficher la liste des tâches
    afficheList();
    form.reset();
    console.log(newTasks);
});

/** Supprimer une ou plusieurs tâches **/
const delButton = document.querySelector("#del-tache");

delButton.addEventListener("click", () => {
    const checkboxes = ul.querySelectorAll("input[type='checkbox']");

    
    const selectedIndexes = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedIndexes.push(parseInt(checkbox.getAttribute("data-index")));
        }
    });

    // Supprimer les tâches 
    newTasks = newTasks.filter((task, index) => !selectedIndexes.includes(index));

    // Réafficher la liste mise à jour
    afficheList();
    console.log(newTasks);
});


/** Filtre **/


filtreSelect.addEventListener("change", (e) => {
    console.log(newTasks);
    console.log(filtreSelect.value);
    console.log(newTasks.sort((a, b) => a.title.localeCompare(b.title)));

    if (filtreSelect.value === "Alphabet") {
        newTasks.sort((a, b) => a.title.localeCompare(b.title)); // Tri par ordre alphabétique
    } else if (filtreSelect.value === "Proprieter") {
        newTasks.sort((a, b) => a.priority - b.priority); // Tri par priorité
    }

    afficheList(newTasks);

});