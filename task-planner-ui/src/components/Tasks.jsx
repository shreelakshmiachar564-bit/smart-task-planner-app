import { useEffect, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/tasksApi";

function normalizeTask(task) {
  return {
    id: task.id ?? task.Id,
    title: task.title ?? task.Title ?? "",
    description: task.description ?? task.Description ?? "",
    isCompleted: task.isCompleted ?? task.IsCompleted ?? false,
    createdAt: task.createdAt ?? task.CreatedAt ?? null,
  };
}

function normalizeTasksResponse(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeTask);
  }

  if (Array.isArray(data?.data)) {
    return data.data.map(normalizeTask);
  }

  return [];
}

function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      const normalized = normalizeTasksResponse(data);

      console.log("Raw API response:", data);
      console.log("Normalized tasks:", normalized);

      setTasks(normalized);
    } catch (e) {
      console.error("Load tasks error:", e);
      setError("Unable to load tasks right now.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.isCompleted).length;
    const pending = tasks.length - completed;

    return {
      total: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setSaving(true);
      setError("");

      await createTask({
        title: title.trim(),
        description: description.trim(),
        isCompleted: false,
      });

      setTitle("");
      setDescription("");
      setShowForm(false);
      await loadTasks();
    } catch (e) {
      console.error("Create task error:", e);
      setError("Failed to create task.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, {
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
        createdAt: task.createdAt,
      });

      await loadTasks();
    } catch (e) {
      console.error("Update task error:", e);
      setError("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (e) {
      console.error("Delete task error:", e);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="app-shell">
      <div className="task-page">
        <header className="hero-card">
          <div className="hero-top">
            <div>
              <p className="eyebrow">Smart Task Planner</p>
              <h1>Tasks</h1>
              <p className="hero-text">
                A focused workspace to capture, track, and complete your day.
              </p>
            </div>

            <div className="tabs">
              <button className="tab active">Tasks</button>
              <button className="tab disabled" disabled>
                Habits
              </button>
              <button className="tab disabled" disabled>
                Insights
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Total</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="stat-card">
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </div>
            <div className="stat-card">
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
          </div>
        </header>

        <section className="action-panel">
          <div>
            <h2>Today’s Tasks</h2>
            <p>
              Keep the list simple now. We will expand this later with habits,
              filters, and insights.
            </p>
          </div>

          <button
            type="button"
            className="primary-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close" : "+ Add Task"}
          </button>
        </section>

        {showForm && (
          <section className="form-card">
            <form onSubmit={handleAddTask} className="task-form">
              <div className="input-group">
                <label>Task title</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Enter a task title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea
                  value={description}
                  placeholder="Add a short note"
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </section>
        )}

        {error && <div className="error-banner">{error}</div>}

        <section className="task-list-section">
          {loading ? (
            <div className="empty-state">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks yet</h3>
              <p>Click “Add Task” to create your first item.</p>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className={`task-card ${task.isCompleted ? "done" : ""}`}
                >
                  <div className="task-card-header">
                    <div>
                      <p className="task-label">Task #{task.id}</p>
                      <h3>{task.title}</h3>
                    </div>

                    <span
                      className={`status-badge ${
                        task.isCompleted ? "completed" : "pending"
                      }`}
                    >
                      {task.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  {task.description ? (
                    <p className="task-description">{task.description}</p>
                  ) : (
                    <p className="task-description muted">No description added.</p>
                  )}

                  <div className="task-meta">
                    <span>
                      Created:{" "}
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => handleToggleComplete(task)}
                    >
                      {task.isCompleted ? "Undo" : "Mark Done"}
                    </button>

                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Task;