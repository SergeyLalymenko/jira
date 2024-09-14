<script setup>
const props = defineProps(['config', 'isOpen']);
defineEmits(['toggleModal']);

const defaultConfig = {
    title: 'Modal',
    size: 'md'
};

const config = computed(() => ({
    ...defaultConfig,
    ...props.config
}));
</script>

<template>
    <Teleport to="body">
        <Transition name="modal" :duration="400">
            <div
                class="modal fixed top-0 left-0 bg-overley z-30 w-screen h-screen"
                v-if="isOpen"
                @click="$emit('toggleModal')"
            >
                <div
                    class="modal__wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-background rounded-lg w-11/12"
                    :class="[config.size]"
                    @click.stop
                >
                    <div class="flex justify-between gap-10">
                        <h4>
                            {{ config.title }}
                        </h4>
                        <UIClose @click="$emit('toggleModal')" />
                    </div>
                    <div class="mt-10">
                        <slot />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal {

    &__wrapper {

        &.sm {
            max-width: 520px;
        }

        &.md {
            max-width: 920px;
        }

        &.xl {
            max-width: 1120px;
        }
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: all .4s ease;
    pointer-events: none;
}

.modal-enter-from .modal__wrapper,
.modal-leave-to .modal__wrapper {
    transform: translate(-50%, -50%) scale(.5);
}

.modal-enter-active .modal__wrapper,
.modal-leave-active .modal__wrapper {
    transition: all .4s ease;
}
</style>
