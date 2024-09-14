<script setup>
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import lowPriorityIcon from '~/assets/icons/low-priority.png';
import mediumPriorityIcon from '~/assets/icons/medium-priority.png';
import highPriorityIcon from '~/assets/icons/high-priority.png';
import criticalPriorityIcon from '~/assets/icons/critical-priority.png';

const openedTask = ref(null);
const isEditMode = ref(false);

const usersStore = useUsersStore();
const tasksStore = useTasksStore();
usersStore.fetchUsers();
tasksStore.fetchTasks();

const configs = {
    title: {
        id: 'et_title',
        type: 'text',
        placeholder: 'Title',
        label: 'Title'
    },
    description: {
        id: 'et_description',
        type: 'text',
        placeholder: 'Description',
        label: 'Description'
    },
    creatorId: {
        id: 'et_creatorId',
        placeholder: 'Creator',
        label: 'Creator'
    },
    performerId: {
        id: 'et_performerId',
        placeholder: 'Performer',
        label: 'Performer'
    },
    priority: {
        id: 'et_priority',
        placeholder: 'Priority',
        label: 'Priority'
    },
    status: {
        id: 'et_status',
        placeholder: 'Status',
        label: 'Status'
    },
    saveButton: {
        visualType: 'primary',
        type: 'submit',
        size: 'sm'
    },
    cancelButton: {
        visualType: 'secondary',
        type: 'submit',
        size: 'sm'
    },
    deleteButton: {
        visualType: 'danger',
        type: 'button',
        size: 'sm'
    },
    editButton: {
        visualType: 'primary',
        type: 'button',
        size: 'sm'
    }
};
const priorityOptions = [
    {
        text: 'Low',
        value: 'Low'
    },
    {
        text: 'Medium',
        value: 'Medium'
    },
    {
        text: 'High',
        value: 'High'
    },    {
        text: 'Critical',
        value: 'Critical'
    }
];
const statusOptions = [
    {
        text: 'Todo',
        value: 'todo'
    },
    {
        text: 'In Progress',
        value: 'in_progress'
    },
    {
        text: 'Done',
        value: 'done'
    }
];
const schema = yup.object({
    title: yup.string().required('Required').max(64, 'Max 64 symbols'),
    description: yup.string().required('Required'),
    creatorId: yup.string().required('Required'),
    performerId: yup.string().required('Required'),
    priority: yup.string().required('Required'),
    status: yup.string().required('Required')
});

const modalConfig = computed(() => {
    return {
        title: openedTask.value?.title || 'Task',
        size: 'md'
    };
});

const selectUserOptions = computed(() => {
    return usersStore.users.map((user) => {
        return {
            text: user.name,
            value: user.id
        };
    });
});

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

function getStatusName(key) {
    const names = {
        todo: 'Todo',
        in_progress: 'In Progress',
        done: 'Done'
    };

    return names[key] || '';
}

function setOpenedTask(task = null) {
    openedTask.value = task;
    if (!task) {
        isEditMode.value = false;
    }
}

function deleteTask(id) {
    openedTask.value = false;
    tasksStore.deleteTask(id);
}

function onSubmit(values) {
    tasksStore.updateTask(openedTask.value.id, values);
    openedTask.value = null;
    isEditMode.value = false;
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
                    {{ getStatusName(colStatus) }}
                </h5>
                <div
                    v-for="task in tasks"
                    @click="setOpenedTask(task)"
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
    <ComponentModal
        :isOpen="!!openedTask"
        :config="modalConfig"
        @toggleModal="setOpenedTask"
    >
        <div v-if="isEditMode">
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
            >
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                    <Field name="title" :value="openedTask.title" v-slot="{ field, errorMessage }">
                        <UIInput
                            class="w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.title"
                            :errorMessage
                        />
                    </Field>
                    <Field name="description" :value="openedTask.description" v-slot="{ field, errorMessage }">
                        <UIInput
                            class="w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.description"
                            :errorMessage
                        />
                    </Field>
                    <Field name="creatorId" :value="openedTask.creatorId" v-slot="{ field, errorMessage }">
                        <UISelect
                            class="w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.creatorId"
                            :options="selectUserOptions"
                            :errorMessage
                        />
                    </Field>
                    <Field name="performerId" :value="openedTask.performerId" v-slot="{ field, errorMessage }">
                        <UISelect
                            class="w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.performerId"
                            :options="selectUserOptions"
                            :errorMessage
                        />
                    </Field>
                    <Field name="priority" :value="openedTask.priority" v-slot="{ field, errorMessage }">
                        <UISelect
                            class="mt-2 w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.priority"
                            :options="priorityOptions"
                            :errorMessage
                        />
                    </Field>
                    <Field name="status" :value="openedTask.status" v-slot="{ field, errorMessage }">
                        <UISelect
                            class="mt-2 w-full"
                            v-bind="field"
                            v-model="field.value"
                            :config="configs.status"
                            :options="statusOptions"
                            :errorMessage
                        />
                    </Field>
                </div>
                <div class="flex justify-between mt-7">
                    <UIButton :config="configs.saveButton">
                        Save
                    </UIButton>
                    <UIButton
                        :config="configs.cancelButton"
                        @click="isEditMode = false"
                    >
                        Cancel
                    </UIButton>
                </div>
            </Form>
        </div>
        <div v-else>
            <h6>Description:</h6>
            <p class="mt-2 border border-solid border-border rounded p-2">
                {{ openedTask.description }}
            </p>
            <h6 class="mt-4">Creator:</h6>
            <p class="mt-2 border border-solid border-border rounded p-2">
                {{ usersStore.getUserById(openedTask.creatorId).name }}
            </p>
            <h6 class="mt-4">Performer:</h6>
            <p class="mt-2 border border-solid border-border rounded p-2">
                {{ usersStore.getUserById(openedTask.performerId).name }}
            </p>
            <h6 class="mt-4">Priority:</h6>
            <p class="mt-2 border border-solid border-border rounded p-2">
                {{ openedTask.priority }}
            </p>
            <h6 class="mt-4">Status:</h6>
            <p class="mt-2 border border-solid border-border rounded p-2">
                {{ getStatusName(openedTask.status) }}
            </p>
            <div class="flex justify-between mt-7">
                <UIButton
                    :config="configs.editButton"
                    @click="isEditMode = true"
                >
                    Edit
                </UIButton>
                <UIButton
                    :config="configs.deleteButton"
                    @click="deleteTask(openedTask.id)"
                >
                    Delete task
                </UIButton>
            </div>
        </div>
    </ComponentModal>
</template>
