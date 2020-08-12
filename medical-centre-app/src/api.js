const featchHeaderToken = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
  };

  export async function login(userDetails) {
    const result = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: featchHeaderToken,
    });

    return result.headers.get("token");
  }