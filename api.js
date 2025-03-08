// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            status: res.status,
            statusText: res.statusText,
        };
    }
    const data = await res.json();
    return data.vans;
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        };
    }
    const data = await res.json();
    return data.vans;
}

export async function loginUser(credentials) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (!res.ok || !res.status === 401 || !data.token) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
}
