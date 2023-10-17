const getJobs = async () => {
    try {
        //showView("spinner")
        let response = await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`);
        let data = await response.json();
        renderHome(data)

        //setTimeout(() => {
        //    renderJobs(data)
        //}, 2000);

    } catch (error) {
        alert("Hubo un error")
        console.log(error);
    }
}

getJobs();

const renderHome = (data) => {
    renderJobs(data);
}

