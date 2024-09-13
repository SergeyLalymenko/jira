<script setup>
const model = defineModel();
const props = defineProps(['config']);

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
            v-if="config.label"
            class="flex mb-1 text-xs"
            :for="config.id"
        >
            {{ config.label }}
        </label>
        <input
            class="w-full border-solid border border-field-border rounded p-2"
            :type="config.type"
            v-model="model"
            :placeholder="config.placeholder"
            :id="config.id"
        />
    </div>
</template>
