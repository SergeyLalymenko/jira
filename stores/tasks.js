import { BASE_API_URL } from '~/api/api';

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([]);

    async function fetchTasks() {
        const { data, error } = await useFetch(`${BASE_API_URL}tasks`);
        if (error.value) return;
        tasks.value = data.value;
    }

    return {
        tasks,
        fetchTasks
    };
});
