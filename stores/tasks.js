import { BASE_API_URL } from '~/api/api';

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([]);

    const availablePriorities = ['Low', 'Medium', 'High', 'Critical'];
    const availableStatuses = ['Todo', 'In Progress', 'Done'];

    async function fetchTasks() {
        const { data, error } = await useFetch(`${BASE_API_URL}tasks`);
        if (error.value) return;
        tasks.value = data.value;
    }

    async function createTask(task) {
        try {
            const newTask = await $fetch(`${BASE_API_URL}tasks`, {
                method: 'POST',
                body: task
            });
            tasks.value.push(newTask);
        } catch(err) {
            console.log(err);
        }
    }

    async function updateTask(id, task) {
        try {
            const newTask = await $fetch(`${BASE_API_URL}tasks/${id}`, {
                method: 'PUT',
                body: task
            });
            tasks.value = tasks.value.map((task) => task.id === id ? newTask : task);
        } catch(err) {
            console.log(err);
        }
    }

    async function deleteTask(id) {
        try {
            const deletedTask = await $fetch(`${BASE_API_URL}tasks/${id}`, {
                method: 'DELETE'
            });
            tasks.value = tasks.value.filter((task) => task.id !== deletedTask.id);
        } catch(err) {
            console.log(err);
        }
    }

    return {
        availablePriorities,
        availableStatuses,
        tasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
    };
});
