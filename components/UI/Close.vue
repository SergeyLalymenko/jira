<script setup>
const props = defineProps(['size']);
const size = props.size || 'md';
</script>

<template>
    <div
        class="close relative rounded-full border-solid border border-border p-1 transition-colors duration-200 cursor-pointer"
        :class="[size]"
    >
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.close {

    &.sm {
        width: 20px;
        min-width: 20px;
        height: 20px;

        div {
            width: 10px;
            height: 2px;
        }
    }

    &.md {
        width: 30px;
        min-width: 30px;
        height: 30px;

        div {
            width: 16px;
            height: 2px;
        }
    }

    &.xl {
        width: 40px;
        min-width: 40px;
        height: 40px;

        div {
            width: 20px;
            height: 2px;
        }
    }

    &:hover {
        border-color: $colorDanger;

        div {
            background: $colorDanger;
        }
    }

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        background: $colorBorder;
        transition: .2s;

        &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &:nth-child(2) {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
}
</style>
