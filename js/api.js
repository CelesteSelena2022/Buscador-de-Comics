getJobs = async () => {
    let response = await fetch(`https://652753f2917d673fd76d931d.mockapi.io/api/jobs`);
    let data = await response.json();
    console.log(data);
}

getJobs();
