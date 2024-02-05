// Renderizar la interfaz de usuario con los datos obtenidos
const getJobs = async (filterParams) => {
    showView("spinner");

    const apiUrl = new URL('https://652753f2917d673fd76d931d.mockapi.io/api/jobs');

    if (filterParams) {
        Object.keys(filterParams).forEach(key => {
            apiUrl.searchParams.append(key, filterParams[key]);
        });
    }

    let response = await fetch(apiUrl);
    let data = await response.json();
        renderHome(data);
        getFilterOptions(data);
};

// Envía una nueva oferta de trabajo a la API y  actualiza la lista de empleos
const postJob = async (newJob) => {
    showView("spinner");
    await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newJob),
    });

    await getJobs();
};

//Funcion para ocultar el spinner
const hideView = (view) => {
    $(`#${view}`).classList.add("is-hidden");
};

//  Obtiene detalles específicos de un trabajo mediante su identificador desde la API
const getJobById = async (id) => {
    showView("spinner");

    try {
        let response = await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs/${id}`);
        let data = await response.json();
        showJobDetails(data);
        hideView("spinner"); // Oculta el spinner después de mostrar los detalles
        showEditJOb(data);
    } catch (error) {
        console.error("Error fetching job details:", error);
        hideView("spinner"); // Oculta el spinner en caso de error
    }
};

// Envía una solicitud PUT a la API para editar un trabajo específico, y actualiza la lista de empleos
const editGetJob = async (id, editedJOb) => {
    let response = await fetch(
        `https://652753f2917d673fd76d931d.mockapi.io/api/jobs/${id}
        `, 
        {
            method: "PUT",
            body: JSON.stringify(editedJOb),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }
    );
    getJobs();
};

// Envía una solicitud DELETE a la API para eliminar un trabajo específico y actualiza la lista de empleos 
const deleteJOb = async (id) => {
    let response = await fetch(
        `https://652753f2917d673fd76d931d.mockapi.io/api/jobs/${id}
        `,
        {
            method: 'DELETE',
        }
    );
    getJobs();
};

// Construye una URL con parámetros de filtro
const filterJob = (param, value) => {
    const url = new URL(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`);
    url.searchParams.append(`${param}`, `${value}`);

    fetch(url, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(jobs => {
        getJobs({ [param]: value });
    })
    .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
    });
};

const renderHome = (data) => {
    renderJobs(data);
};

window.onload = getJobs();