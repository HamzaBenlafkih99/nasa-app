const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/launches`);
  // Load launches, sort by flight number, and return as JSON.
  const fetchLaunches = await response.json();
  return fetchLaunches.launches;
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
