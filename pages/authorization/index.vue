<template>
    <div class="container">
        <auth-form />
    </div>
</template>
<style >
    .container {
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>
<script>
import AuthForm from '~/components/AuthForm.vue'
export default {
  components: { AuthForm },
    
}
</script>