const BASE_URL = 'http://127.0.0.1:8000';

export async function fetchUsers() {
  try {
    const response = await window.fetch(`${BASE_URL}/workers/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function fetchCatalogItems() {
  try {
    const response = await window.fetch(`${BASE_URL}/items/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function fetchOperations() {
  try {
    const response = await window.fetch(`${BASE_URL}/operations/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return [];
  }
}
