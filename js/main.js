const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden");
};

const renderJobs = (data) => {
    showView("cards");
    $("#container-cards").innerHTML = "";
        for (let { name, description, location, category, seniority, id} of data) {
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
                            <button class="button is-link mt-3" onclick="showViewDetails('${id}')" id="${id}">See Details</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
};

const showViewDetails = (id) => {
    getJobById(id);
    showView("seeDetails");
}

//VER DETALLE DE LA CARD
const showJobDetails = ({ name, image, description, location, category, seniority, benefits, salary, long_term, languages, id}) => {
    
    $("#container-card").innerHTML = `
    <div class="columns card py-2 px-2">
        <div class="column">
            <div class="card-content">
                <p class="title is-5">${name}</p>
                <figure class="image is-128x128">
                    <img src="${image}">
                </figure>
                <p class="subtitle is-6 pt-2">${description}</p>
                <span class="tag is-info">${location}</span>
                <span class="tag is-info">${category}</span>
                <span class="tag is-info">${seniority}</span>
                <div class="field is-grouped is-grouped-multiline mt-2">
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-link is-light">Salary</span>
                            <span class="tag is-link">${salary}</span>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped is-flex is-align-items-center">
                    <div class="control">
                        <button class="button is-success" type="button" onclick="showViewEditJOb('${id}')" id="${id}">Edit Job</button>
                    </div>
                    <div class="control">
                        <button class="button is-danger" type="button" onclick="showViewDeleteJob('${id}')" id="${id}">Delete Job</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card-content">
                <p class="title is-6">benefits</p>
                <div class="content">
                    <ul>
                        <li>${benefits.health_ensurance}</li>
                        <li>${benefits.vacation}</li>
                    </ul>
                    <label class="checkbox"> paid internet
                        <input type="checkbox"> ${benefits.internet_paid}
                    </label>
                </div>
                <p class="title is-6">required languages</p>
                <div class="content">
                    <ul>
                        <li>${languages[0]}</li>
                        <li>${languages[1]}</li>
                        <li>${languages[2]}</li>
                    </ul>
                    <p class="title is-6">long-term</p>
                    <label class="checkbox "> 
                        <input type="checkbox"> ${long_term}
                    </label>
                </div>
            </div>
        </div>
    </div>
    `;
};

const showViewDeleteJob = (id) => {
    showView("container-delete-job");

    $("#container-delete-job").innerHTML = `
    <div class="columns is-vcentered notification is-danger is-light mt-3">
        <div class="column is-narrow">
            <p class="subtitle is-6">Are you sure to delete this job?</p>
        </div>
        <div class="column is-narrow">
            <div class="buttons">
                <button class="button is-danger is-small" onclick="confirmDeleteJob('${id}')" id="${id}" >Delete</button>
                <button class="button is-light is-small" onclick='showView("seeDetails")' id="${id}">Cancel</button>
            </div>
        </div>
    </div>
    `;
};

const confirmDeleteJob= (id) => {
    deleteJOb(id);
};

const showViewEditJOb = (id) => {
    getJobById(id);
    showView("view-editJob");
};

// EDIT VALUE
const showEditJOb = ({ name, image, description, location, category, seniority, benefits, salary, long_term, languages, id}) => {

    $("#edit-job-title").value = name;
    $("#edit-job-image").value = image;
    $("#edit-job-description").value = description;
    $("#edit-job-location").value = location;
    $("#edit-job-category").value = category;
    $("#edit-job-seniority").value = seniority;
    $("#edit-job-vacation").value = benefits.vacation;
    $("#edit-job-health-ensurance").value = benefits.health_ensurance;
    $("#edit-job-internet").checked = benefits.internet_paid;
    $("#edit-job-salary").value = salary;
    $("#edit-job-long-term").checked = long_term;
    $("#edit-job-lan-1").value = languages[0];
    $("#edit-job-lan-2").value = languages[1];
    $("#edit-job-lan-3").value = languages[2];

    $("#btn-edit-job").addEventListener(`click`, (e) => {
        e.preventDefault();
        editJOb(id);
    })
};

const editJOb = (id) => {

    let editedJOb = {
        name: $("#edit-job-title").value,
        image: $("#edit-job-image").value,
        description: $("#edit-job-description").value,
        location: $("#edit-job-location").value,
        category: $("#edit-job-category").value,
        seniority: $("#edit-job-seniority").value,
        benefits: {
            vacation: $("#edit-job-vacation").value,
            health_ensurance: $("#edit-job-health-ensurance").value,
        },
        salary: $("#edit-job-salary").value,
        languages: [$("#edit-job-lan-1").value, $("#edit-job-lan-2").value, $("#edit-job-lan-3").value]
    };

    editGetJob(id, editedJOb);
};

// CREAR CARDS

const createNewJob = () =>  {
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
    languages: [$("#job-lan-1").value, $("#job-lan-2").value, $("#job-lan-3").value] // array
    }
    postJob(newJob)
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
}

// Completa el select segun la option del primero
const renderFilterOptions = (filterType) => {
    if(filterType === "location") {
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Location</option>";

        locations.forEach(location => {
            $("#select-option-filter").innerHTML += `<option>${location}</option>`;
        });
    }
    else if(filterType === "category"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Category</option>";

        categories.forEach(category => {
            $("#select-option-filter").innerHTML += `<option>${category}</option>`;
        });
    } else if(filterType === "seniority"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Seniority</option>";

        seniorities.forEach(seniority => {
            $("#select-option-filter").innerHTML += `<option>${seniority}</option>`;
        });
    } else {
        $("#select-option-filter").innerHTML = `<option selected>Select a filter</option>`;
    }
}

const filterJobs = () => {
    let param = $("#select-filter").value;
    let value = $("#select-option-filter").value;
    filterJob(param, value);
};

const clearFilters = () => {
    $("#select-filter").value = "";
    $("#select-option-filter").value = "";

    getJobs();
};

$("#clear-filters").addEventListener(`click`, () => clearFilters());
$("#btn-filter-job").addEventListener(`click`, () => filterJobs());
$("#home-btn").addEventListener(`click`, () => getJobs()); //boton para volver al inicio
$("#create-job-view").addEventListener(`click`, () => newJObView()); // vista de datos para nuevo job
$("#create-job").addEventListener(`click`, () => createNewJob()); //boton de guardar nuevas jobs
$("#clean-form").addEventListener(`click`, () => cleanForm()); //boton para limpiar form