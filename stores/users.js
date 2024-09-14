import { BASE_API_URL } from '~/api/api';

export const useUsersStore = defineStore('users', () => {
    const users = ref([]);

    async function fetchUsers() {
        const { data, error } = await useFetch(`${BASE_API_URL}users`);
        if (error.value) return;
        users.value = data.value;
    }

    function getUserById(id) {
        return users.value.find((user) => user.id === id) || {};
    }

    return {
        users,
        fetchUsers,
        getUserById
    };
});
