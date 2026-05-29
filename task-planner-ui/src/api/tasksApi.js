const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {
   console.log("URL: ", API_BASE_URL);
  const response = await fetch(`${API_BASE_URL}/api/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return await response.json();
}

export async function createTask(task) {
 
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error("Failed to create task");
  return await response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error("Failed to update task");
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete task");
}