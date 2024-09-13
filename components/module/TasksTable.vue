<script setup>
import lowPriorityIcon from '~/assets/icons/low-priority.png';
import mediumPriorityIcon from '~/assets/icons/medium-priority.png';
import highPriorityIcon from '~/assets/icons/high-priority.png';
import criticalPriorityIcon from '~/assets/icons/critical-priority.png';

const tasksStore = useTasksStore();

tasksStore.fetchTasks();

const filteredTasksByStatus = computed(() => {
    return groupBy(tasksStore.tasks, 'status');
});

function groupBy(array, property) {
    return array.reduce((acc, obj) => {
        const key = obj[property];
        const curGroup = acc[key] ?? [];

        return {
            ...acc,
            [key]: [...curGroup, obj]
        };
    }, {});
}

function getColName(key) {
    const names = {
        todo: 'Todo',
        in_progress: 'In Progress',
        done: 'Done'
    };

    return names[key] || '';
}
</script>

<template>
    <div class="table w-full">
        <div
            v-if="tasksStore.tasks.length"
            class="grid grid-cols-3 gap-4"
        >
            <div
                v-for="(tasks, colStatus) in filteredTasksByStatus"
                class="border border-border border-solid rounded p-4"
            >
                <h5 class="mb-4">
                    {{ getColName(colStatus) }}
                </h5>
                <div
                    v-for="task in tasks"
                    class="flex items-start rounded bg-background-upper text-text-upper p-2 mt-2 shadow-inner shadow-background cursor-pointer"
                >
                    <h6 class="mr-4">
                        {{ task.title }}
                    </h6>
                    <img v-if="task.priority === 'Low'" :src="lowPriorityIcon" class="ml-auto w-6 min-w-6" />
                    <img v-else-if="task.priority === 'Medium'" :src="mediumPriorityIcon" class="ml-auto w-6 min-w-6" />
                    <img v-else-if="task.priority === 'High'" :src="highPriorityIcon" class="ml-auto w-6 min-w-6" />
                    <img v-else-if="task.priority === 'Critical'" :src="criticalPriorityIcon" class="ml-auto w-6 min-w-6" />
                </div>
            </div>
        </div>
        <p v-else>
            Loading...
        </p>
    </div>
</template>
