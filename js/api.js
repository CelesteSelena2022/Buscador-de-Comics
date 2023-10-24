const getJobs = async () => {
    showView("spinner");
    let response = await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`);
    let data = await response.json();

    setTimeout(() => {
        renderHome(data);
    }, 1000);

    getFilterOptions(data);
};

const postJob = async (newJob) => {
    showView("spinner");
    await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newJob),
    });

    getJobs();
    //cleanForm();
};

// const getJobDetail = async (id) => {
//     showView("spinner");
//     let response = await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs/${id}`
//     );
//     let data = await response.json();

//     showJobDetails(data); // crear funcion
//     editValues(data); // crear funcion
// };

const renderHome = (data) => {
    renderJobs(data);
    //getShips(data);
    //getSenority(data);
    //getDepartments(data);
};

window.onload = getJobs();