<script setup>
const props = defineProps(['config']);

const defaultConfig = {
    visualType: 'primary',
    type: 'button',
    size: 'sm'
};

const config = {
    ...defaultConfig,
    ...props.config
};
</script>

<template>
    <button
        class="button bg-none border-none transition-colors duration-200 cursor-pointer"
        :class="[config.size, config.visualType]"
        :type="config.type"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.button {

    &.sm {
        padding: 10px 20px;
        font-size: 1rem;
    }
    
    &.md {
        padding: 16px 24px;
        font-size: 1.25rem;
    }

    &.xl {
        padding: 20px 28px;
        font-size: 1.25rem;
    }
    
    &.primary {
        background: $colorActive;
        color: $colorText;
        border-radius: 4px;

        &:hover {
            background: $colorActiveHighlight;
        }
    }

    &.secondary {
        border: 1px solid $colorBorder;
        color: $colorText;
        border-radius: 4px;

        &:hover {
            border-color: $colorActive;
        }
    }
}
</style>
