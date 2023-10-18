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