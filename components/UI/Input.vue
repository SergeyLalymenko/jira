<script setup>
const model = defineModel();
const props = defineProps(['config', 'errorMessage']);

const defaultConfig = {
    id: null,
    type: 'text',
    placeholder: '',
    label: ''
};
const config = {
    ...defaultConfig,
    ...props.config
};
</script>

<template>
    <div class="field">
        <label
            v-if="config.label && config.id"
            class="flex mb-1 text-xs"
            :for="config.id"
        >
            {{ config.label }}
        </label>
        <input
            class="w-full border-solid border border-field-border rounded p-2 placeholder-placeholder"
            :type="config.type"
            v-model="model"
            :placeholder="config.placeholder"
            :id="config.id"
        />
        <p v-if="props.errorMessage" class="text-danger text-xs mt-1">
            {{ props.errorMessage }}
        </p>
    </div>
</template>
