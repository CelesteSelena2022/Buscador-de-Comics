const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden");
};

const renderJobs = (data) => {
    showView("cards");
    $("#container-cards").innerHTML = "";
        for (let { name, description, location, category, seniority } of data) {
            $("#container-cards").innerHTML += `
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-content">
                        <p class="title is-5">${name}</p>
                        <p class="subtitle is-6">${description}</p>
                        <span class="tag is-info">${location}</span>
                        <span class="tag is-info">${seniority}</span>
                        <span class="tag is-info">${category}</span>
                        <div>
                            <button class="button is-link mt-3">See Details</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
};

// CREAR CARDS
const createNewJob = () =>  {
    showView("view-createJOb");
    let newJob = {
    name: $("#job-title").value,
    image: $("#job-image").value,
    description: $("#job-description").value,
    location: $("#job-location").value,
    category: $("#job-category").value,
    seniority: $("#job-seniority").value,
    benefits: {
        "vacation": $("#job-vacation").value,
        "health_ensurance": $("#job-health-ensurance").value,
        "internet_paid": $("#job-internet").checked
    },
    salary: $("#job-salary").value,
    long_term: $("#job-long-term").checked,
    languages: $("#job-languages").value,
    languages: [$("#job-lan-1").value, $("#job-lan-2").value, $("#job-lan-3").value] // array
    }
    //postJob(newJob)
};

//Limpiar el formulario
const cleanForm = () => {
    $("#job-title").value = "";
    $("#job-image").value = "";
    $("#job-description").value = "";
    $("#job-location").value = "";
    $("#job-category").value = "";
    $("#job-seniority").value = "";
    $("#job-vacation").value = "";
    $("#job-health-ensurance").value = "";
    $("#job-internet").checked = false;
    $("#job-salary").value = "";
    $("#job-long-term").checked = false;
    $("#job-lan-1").value = "";
    $("#job-lan-2").value = "";
    $("#job-lan-3").value = "";
};

// FUNCIONALIDAD PARA LOS SELECTS
// Se declaran las funciones globales
const seniorities = [];
const categories = [];
const locations = [];

// Toma el value del select seleccionado
const selectFilter = $("#select-filter");

selectFilter.addEventListener(`change`, () => {
    const selectFilter = $("#select-filter").value;
    console.log(selectFilter);

    renderFilterOptions(selectFilter);
})

// LLena el array de las variables globales
const getFilterOptions = (data) => {
    data.forEach(job => {
        if (!locations.includes(job.location)) {
            locations.push(job.location);
        }

        if (!categories.includes(job.category)) {
            categories.push(job.category);
        }

        if (!seniorities.includes(job.seniority)) {
            seniorities.push(job.seniority);
        }
    });

    console.log(locations, categories, seniorities);
}

// Completa el select segun la option del primero
const renderFilterOptions = (filterType) => {
    if(filterType === "LOCATION") {
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Location</option>";

        locations.forEach(location => {
            $("#select-option-filter").innerHTML += `<option>${location}</option>`;
        });
    }
    else if(filterType === "CATEGORY"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Category</option>";

        categories.forEach(category => {
            $("#select-option-filter").innerHTML += `<option>${category}</option>`;
        });
    } else if(filterType === "SENIORITY"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Seniority</option>";

        seniorities.forEach(seniority => {
            $("#select-option-filter").innerHTML += `<option>${seniority}</option>`;
        });
    } else {
        $("#select-option-filter").innerHTML = `<option selected>Select a filter</option>`;
    }
}

//$("#home-btn").addEventListener(`click`, () => getJobs());
//$().addEventListener(`click`, () => newJObView()); // vista de datos para nuevo job
$("#create-job").addEventListener(`click`, () => createNewJob()); //boton de crear nuevas jobs