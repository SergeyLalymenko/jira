<script setup>
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import PlusIcon from '~/assets/icons/PlusIcon.vue';

const isOpenModal = ref(false);

const usersStore = useUsersStore();
const tasksStore = useTasksStore();
usersStore.fetchUsers();
tasksStore.fetchTasks();

const configs = {
    modal: {
        title: 'Create',
        size: 'md'
    },
    title: {
        id: 'ct_title',
        type: 'text',
        placeholder: 'Title',
        label: 'Title'
    },
    description: {
        id: 'ct_description',
        type: 'text',
        placeholder: 'Description',
        label: 'Description'
    },
    creatorId: {
        id: 'ct_creatorId',
        placeholder: 'Creator',
        label: 'Creator'
    },
    performerId: {
        id: 'ct_performerId',
        placeholder: 'Performer',
        label: 'Performer'
    },
    priority: {
        id: 'ct_priority',
        placeholder: 'Priority',
        label: 'Priority'
    },
    submitButton: {
        visualType: 'secondary',
        type: 'submit',
        size: 'sm'
    }
};
const priorityOptions = tasksStore.availablePriorities.map((priority) => ({
    text: priority,
    value: priority
}));
const schema = yup.object({
    title: yup.string().required('Required').max(64, 'Max 64 symbols'),
    description: yup.string().required('Required'),
    creatorId: yup.string().required('Required'),
    performerId: yup.string().required('Required'),
    priority: yup.string().required('Required')
});

const selectUserOptions = computed(() => {
    return usersStore.users.map((user) => {
        return {
            text: user.name,
            value: user.id
        };
    });
});

function toggleModal() {
    isOpenModal.value = !isOpenModal.value;
}

function onSubmit(values, { resetForm }) {
    const newTask = {
        ...values,
        status: 'Todo'
    };

    tasksStore.createTask(newTask);
    toggleModal();
    resetForm();
}
</script>

<template>
    <header class="header w-full border-solid border-b border-divider">
        <div class="container mx-auto px-4 py-5 relative flex items-center justify-between">
            <ul class="flex items-center justify-center flex-wrap gap-5">
                <NuxtLink to="/" exact-active-class="active">
                    Home
                </NuxtLink>
            </ul>
            <UIButton
                class="flex items-center"
                @click="toggleModal"
            >
                <PlusIcon class="w-4 min-w-4 mr-2" />
                Create
            </UIButton>
        </div>
    </header>
    <ComponentModal
        :isOpen="isOpenModal"
        :config="configs.modal"
        @toggleModal="toggleModal"
    >
        <Form
            @submit="onSubmit"
            :validation-schema="schema"
        >
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                <Field name="title" value="" v-slot="{ field, errorMessage }">
                    <UIInput
                        class="w-full"
                        v-bind="field"
                        v-model="field.value"
                        :config="configs.title"
                        :errorMessage
                    />
                </Field>
                <Field name="description" value="" v-slot="{ field, errorMessage }">
                    <UIInput
                        class="w-full"
                        v-bind="field"
                        v-model="field.value"
                        :config="configs.description"
                        :errorMessage
                    />
                </Field>
                <Field name="creatorId" value="" v-slot="{ field, errorMessage }">
                    <UISelect
                        class="w-full"
                        v-bind="field"
                        v-model="field.value"
                        :config="configs.creatorId"
                        :options="selectUserOptions"
                        :errorMessage
                    />
                </Field>
                <Field name="performerId" value="" v-slot="{ field, errorMessage }">
                    <UISelect
                        class="w-full"
                        v-bind="field"
                        v-model="field.value"
                        :config="configs.performerId"
                        :options="selectUserOptions"
                        :errorMessage
                    />
                </Field>
                <Field name="priority" value="" v-slot="{ field, errorMessage }">
                    <UISelect
                        class="mt-2 w-full"
                        v-bind="field"
                        v-model="field.value"
                        :config="configs.priority"
                        :options="priorityOptions"
                        :errorMessage
                    />
                </Field>
            </div>
            <UIButton :config="configs.submitButton" class="mt-7">
                Submit
            </UIButton>
        </Form>
    </ComponentModal>
</template>
