const BASE_URL = "https://68cc450c716562cf5077160b.mockapi.io/product";

export async function getProducts() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
