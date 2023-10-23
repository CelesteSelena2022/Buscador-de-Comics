const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("is-hidden"));
    console.log(view);
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
    languages: $("#job-languages").value,
    languages: [$("#job-lan-1").value, $("#job-lan-2").value, $("#job-lan-1").value] // array
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

//$("#home-btn").addEventListener(`click`, () => getJobs());
// $("#create-job").addEventListener(`click`, () => newJObView()); // vista de datos para nuevo job
// $("#").addEventListener(`click`, () => createNewJob()); //boton de crear