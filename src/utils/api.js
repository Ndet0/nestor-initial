const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}

export function fetchPlaces() {
  return request("/api/places");
}

export function fetchPlaceById(id) {
  return request(`/api/places/${id}`);
}

export function createPlace(data) {
  return request("/api/places", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePlace(id, data) {
  return request(`/api/places/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePlace(id) {
  return request(`/api/places/${id}`, {
    method: "DELETE",
  });
}
