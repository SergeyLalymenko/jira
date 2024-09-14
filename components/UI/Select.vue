<script setup>
const model = defineModel();
const props = defineProps(['config', 'options', 'errorMessage']);

const defaultOptionRef = useTemplateRef('defaultOption');

const defaultConfig = {
    id: null,
    placeholder: 'Please select',
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
        <select
            class="w-full border-solid border border-field-border rounded p-2 cursor-pointer"
            :class="{ 'text-placeholder': defaultOptionRef?.disabled && defaultOptionRef.selected }"
            v-model="model"
            :id="config.id"
            ref="select"
        >
            <option
                class="text-placeholder"
                ref="defaultOption"
                value=""
                disabled
            >
                {{ config.placeholder }}
            </option>
            <option
                v-for="option in options"
                :value="option.value"
                class="text-field-text"
            >
                {{ option.text }}
            </option>
        </select>
        <p v-if="props.errorMessage" class="text-danger text-xs mt-1">
            {{ props.errorMessage }}
        </p>
    </div>
</template>
