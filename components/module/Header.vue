<script setup>
import { Form, Field } from 'vee-validate';
import PlusIcon from '~/assets/icons/PlusIcon.vue';

const isOpenModal = ref(false);

const modalConfig = {
    title: 'Create',
    size: 'md'
};
const submitFormButtonConfig = {
    visualType: 'secondary',
    type: 'submit',
    size: 'sm'
};

function toggleModal() {
    isOpenModal.value = !isOpenModal.value;
}

function onSubmit(values) {
    console.log(values);
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
        :config="modalConfig"
        @toggleModal="toggleModal"
    >
        <Form @submit="onSubmit">
            <UIInput />
            <Field name="name" />
            <UIButton :config="submitFormButtonConfig">
                Submit
            </UIButton>
        </Form>
    </ComponentModal>
</template>
