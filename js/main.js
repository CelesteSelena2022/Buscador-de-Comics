const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".is-hidden").forEach((view) => view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden");
};

const renderJobs = (data) => {
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

const newJobs = () =>  {
    let newJobs = {
        name: "FrontEnd Developer", //value de input
        image: "https://someimageaboutthejob.com/job1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus turpis in eu mi bibendum neque. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sagittis purus sit amet volutpat consequat mauris nunc congue.",
        location: "Remote",
        category: "Development",
        seniority: "Junior",
        benefits: {
            "vacation": "3 weeks",
            "health_ensurance": "OSDE 210",
            "internet_paid": true
        },
        salary: 350000,
        long_term: true,
        languages: ["ReactJS", "Javascript", "SASS", "NodeJS"]
    }; //post para subirlo
    addJobs(newJobs);
}


//Limpiar el formulario

const cleanForm = () => {
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").value = "";
    $("").checked = false;
    $("").value = "";
    $("").checked = false;
    $("").value = "";
    $("").value = "";
    $("").value = "";
}

$("#home-btn").addEventListener(`click`, () => getJobs());
$("#create-job").addEventListener(`click`, () => newJObView());
$("#submit-job").addEventListener(`click`, () => createNewJob());

window.onload = getJobs();