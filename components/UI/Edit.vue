<script setup>
import EditIcon from '~/assets/icons/EditIcon.vue';

const props = defineProps(['size']);
const size = props.size || 'md';
</script>

<template>
    <div
        class="edit flex items-center justify-center rounded-full border-solid border border-border p-1 transition-colors duration-200 cursor-pointer"
        :class="[size]"
    >
        <EditIcon class="edit__icon text-border w-full transition-colors duration-200" />
    </div>
</template>

<style lang="scss" scoped>
.edit {

    &.sm {
        width: 20px;
        min-width: 20px;
        height: 20px;
    }

    &.md {
        width: 30px;
        min-width: 30px;
        height: 30px;
    }

    &.xl {
        width: 40px;
        min-width: 40px;
        height: 40px;
    }

    &:hover {
        border-color: $colorActive;

        .edit__icon {
            color: $colorActive;
        }
    }
}
</style>
