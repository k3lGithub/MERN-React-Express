const featchHeaderToken = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
};

export async function login(userDetails) {

    // LOGIN
    const result = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: featchHeaderToken,
    })
    if (result.status === 200) {
        console.log(result);
        return result;
    } else {
        const data = await result.json();
        console.log(data)
        return data;
    }
}

// REGISTER
export async function register(userDetails) {
    const result = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: featchHeaderToken,
    });

    return result.headers.get("token")
}