const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden");
};

$("#home-btn").addEventListener(`click`, () => getJobs()); //BOTON PARA VOLVER AL HOME 

// RENDERIZA LAS JOBS QUE VIENEN DE LA API
const renderJobs = (data) => {
    showView("cards");
    $("#container-cards").innerHTML = "";
        for (let { name, description, image, location, category, seniority, id} of data) {
            $("#container-cards").innerHTML += `
            <div class="column is-one-third">
                <div class="card p-4 is-flex is-flex-direction-column is-justify-content-space-around" style="height: 100%;">
                    <p class="title is-5">${name}</p>
                    <p class="subtitle is-6">${description.slice(0, 100)}...</p>
                    <div class="content-img">
                        <figure class="image is-64x64 card has-border mb-2 ">
                            <img src="${image}">
                        </figure>
                    </div>
                    <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
                        <span class="tag is-info m-1">${location}</span>
                        <span class="tag is-info m-1">${seniority}</span>
                        <span class="tag is-info m-1">${category}</span>
                    </div>
                    <div>
                        <button class="button is-link mt-3" onclick="getJobById('${id}')" id="${id}">See Details</button>
                    </div>
                </div>
            </div>
            `;
        }
};

// VER DETALLE DE LA CARD
const showJobDetails = ({ name, image, description, location, category, seniority, benefits, salary, long_term, languages, id}) => {

    showView("seeDetails");
    const anyBenefitMarked = benefits.health_ensurance || benefits.vacation || benefits.internet_paid;
    
    $("#container-card").innerHTML = `
    <div class="columns card py-2 px-2 is-flex is-flex-wrap-wrap is-justify-content-start">
        <div class="column">
            <div>
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
                            ${salary ? `<span class="tag is-link is-light">Salary</span>
                            <span class="tag is-link">${salary}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="field is-grouped is-flex is-flex-wrap-wrap">
                    <div class="control m-1">
                        <button class="button is-success" type="button" onclick="showViewEditJOb('${id}')" id="${id}">Edit Job</button>
                    </div>
                    <div class="control m-1">
                        <button class="button is-danger" type="button" onclick="showViewDeleteJob('${id}')" id="${id}">Delete Job</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div>
            ${anyBenefitMarked ? '<p class="title is-6">benefits</p>' : ''}
                <div class="content">
                    <ul>
                        ${benefits.health_ensurance ? `<li>${benefits.health_ensurance}</li>` : ''}
                        ${benefits.vacation ? `<li>${benefits.vacation}</li>` : ''}
                    </ul>
                    <label class="checkbox">
                        <input type="checkbox" ${benefits.internet_paid ? 'checked' : ''}>
                        ${benefits.internet_paid ? 'Paid Internet' : 'No Paid Internet'}
                    </label>
                </div>
                ${languages.some(lang => lang) ? '<p class="title is-6">required languages</p>' : ''}
                <div class="content">
                    <ul>
                        ${languages[0] ? `<li>${languages[0]}</li>` : ''}
                        ${languages[1] ? `<li>${languages[1]}</li>` : ''}
                        ${languages[2] ? `<li>${languages[2]}</li>` : ''}
                    </ul>
                    <p class="title is-6">long-term</p>
                    <label class="checkbox "> 
                        <input type="checkbox" ${long_term ? 'checked' : ''}>
                        ${long_term ? 'Long Term' : 'Not Long Term'}
                    </label>
                </div>
            </div>
        </div>
    </div>
    `;
};

// MUESTRA EL MODAL PARA CONFIRMAR LA ELIMINACION DE LA JOB
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
                <button class="button is-light is-small" onclick="getJobs()" id="${id}">Cancel</button>
            </div>
        </div>
    </div>
    `;
};

const confirmDeleteJob= (id) => {
    deleteJOb(id);
};

const showViewEditJOb = () => {
    $("#view-editJob").classList.remove("is-hidden");
};

// MUESTRA LA VISTA PARA EDITAR UNA JOB CON SUS VALORES
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

// TOMA EL VALOR DE LOS NUEVOS DATOS EDITADOS EN LA JOB Y REALIZA EL PEDIDO A LA API
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
            internet_paid: $("#edit-job-internet").checked
        },
        salary: $("#edit-job-salary").value,
        long_term: $("#edit-job-long-term").checked,
        languages: [$("#edit-job-lan-1").value, $("#edit-job-lan-2").value, $("#edit-job-lan-3").value]
    };

    editGetJob(id, editedJOb);
};

$("#create-job-view").addEventListener(`click`, () => {
    showView("view-createJOb"); // vista de datos para crear el nuevo job
});

// VALIDACION DE FORMULARIO ANTES DE CREAR UNA NUEVA JOB
const validateForm = (event) => {
    try {
        const fieldIds = ["job-title", "job-description", "job-location", "job-seniority", "job-category", "job-image"];

        // Limpiar todos los mensajes de error y los estilos antes de realizar nuevas validaciones
        fieldIds.forEach(fieldId => {
            const customFieldError = $(`#${fieldId}-error`);
            const inputField = $(`#${fieldId}`);
            
            customFieldError.textContent = "";
            inputField.classList.remove("error-input"); // Elimina cualquier clase de estilo de error previa
        });

        let formIsValid = true;

        fieldIds.forEach(fieldId => {
            const fieldValue = $(`#${fieldId}`).value;
            const customFieldError = $(`#${fieldId}-error`);
            const inputField = $(`#${fieldId}`);

            if (fieldValue.trim() === "") {
                customFieldError.textContent = `Please enter the ${fieldId.replace(/-/g, ' ').toLowerCase()}.`;
                formIsValid = false;

                inputField.classList.add("error-input");
            }
        });

        if (!formIsValid) {
            event.preventDefault();
        } else {
            createNewJob();
            alert("Form is valid!");

            // Limpiar el formulario y los estilos después de enviar los datos
            cleanForm();
        }
    } catch (error) {
        console.error("Error in validateForm:", error);
    }
};

$("#create-job").addEventListener('click', (event) => validateForm(event)); //valida el form antes de enviarlo

// CREAR JOBS
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

// TOMA LA URL Y LA CONVIERTE EN EL FONDO DE LA IMG DE LA JOB
const setBackgroundProperties = (urlInput, targetElement) => {
    urlInput.addEventListener('input', () => {
        targetElement.style.backgroundImage = `url("${urlInput.value}")`;
        targetElement.style.backgroundRepeat = 'no-repeat';
        targetElement.style.backgroundSize = 'cover';
        targetElement.style.backgroundPosition = 'center';
    });
};

//createImgJob
const urlCreateImg = $("#job-image");
const createImgJob = $("#create-img-job");
setBackgroundProperties(urlCreateImg, createImgJob);

//editImgJob
const urlEditImg = $("#edit-job-image");
const editImgJob = $("#edit-img-job");
setBackgroundProperties(urlEditImg, editImgJob);
//----------------

$("#clean-form").addEventListener(`click`, () => cleanForm()); //boton para limpiar formulario cuando lo estamos creando

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

    const createImgJob = $("#create-img-job");
    createImgJob.style.backgroundImage = 'none';
    createImgJob.style.backgroundRepeat = 'initial';
    createImgJob.style.backgroundSize = 'initial';
    createImgJob.style.backgroundPosition = 'initial';
};

// FUNCIONALIDAD PARA LOS SELECTS
//Se declaran las funciones globales
const seniorities = [];
const categories = [];
const locations = [];

//Toma el value del select seleccionado
const selectFilter = $("#select-filter");

selectFilter.addEventListener(`change`, () => {
    const selectFilter = $("#select-filter").value;
    renderFilterOptions(selectFilter);
})

//LLena el array de las variables globales
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

//Completa el select segun la option del primero
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

$("#btn-filter-job").addEventListener(`click`, () => filterJobs());

// FUNCION PARA FILTRAR LAS JOBS
const filterJobs = () => {
    let param = $("#select-filter").value;
    let value = $("#select-option-filter").value;
    filterJob(param, value);
};

$("#clear-filters").addEventListener(`click`, () => clearFilters());

//LIMPIAR FILTROS DE BUSQUEDA
const clearFilters = () => {
    $("#select-filter").value = "";
    $("#select-option-filter").value = "";

    getJobs();
};