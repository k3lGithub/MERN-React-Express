const featchHeaderToken = {
  "Content-Type": "application/json",
  token: window.localStorage.getItem("token"),
};

// ======================= USER =======================

export async function login(userDetails) {
  // LOGIN
  const result = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: featchHeaderToken,
  });
  if (result.status === 200) {
    console.log(result);
    return result;
  } else {
    const data = await result.json();
    console.log(data);
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
  const data = await result.json();
  return data;
}

// ======================= Doctor =======================

export async function getDoctors() {
  const result = await fetch("/api/doctor", {
    method: "GET",
  });
  const data = await result.json();
  return data;
}

export async function getDoctorsbyId(id) {
  const result = await fetch("/api/doctor/" + id, {
    method: "GET",
    headers: featchHeaderToken,
  });
  const data = await result.json();
  return data;
}

// ======================= Booking =======================

export async function getBookings() {
  const result = await fetch("/api/booking", {
    method: "GET",
  });
  const data = await result.json();
  return data;
}

export async function newBooking(bookingDetails) {
  const result = await fetch("/api/booking/new", {
    method: "POST",
    body: JSON.stringify(bookingDetails),
    headers: featchHeaderToken,
  });
  const data = await result.json();
  return data;
}


// ======================= Products =======================

export async function getProducts() {
  const result = await fetch("/api/product", {
    method: "GET",
  });
  const data = await result.json();
  return data;
}

export async function getProductsbyId(id) {
  const result = await fetch("/api/product/" + id, {
    method: "GET",
    headers: featchHeaderToken,
  });
  const data = await result.json();
  return data;
}

export async function addProduct(details) {
  const result = await fetch("/api/product/new", {
    method: "POST",
    headers: featchHeaderToken,
    body: JSON.stringify(details),
  });

  console.log("details",result)
  const data = await result.json();
  return data;
}

export async function deleteProduct(id) {
  const result = await fetch("/api/product/delete/" + id, {
    method: "DELETE",
    headers: featchHeaderToken,
  });
  const data = await result.json();
  return data;
}

export const updateProduct = async (id, details) => {
  console.log("details",details)
  const result = await fetch(`/api/product/update/${id}`, {
    method: "PATCH",
    headers: featchHeaderToken,
    body: JSON.stringify(details),
  });
  const data = await result.json();
  return data;
};
