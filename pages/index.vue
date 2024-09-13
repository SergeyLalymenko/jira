<script setup>
useHead({
    title: 'Jira',
    meta: [
        {
            property: 'og:title',
            content: 'Jira'
        },
        {
            name: 'description',
            content: 'Jira description'
        },
        {
            property: 'og:description',
            content: 'Jira description'
        }
    ]
});
</script>

<template>
    <div class="home mt-20">
        <div class="container mx-auto px-4">
            <ModuleTasksTable />
        </div>
    </div>
</template>
