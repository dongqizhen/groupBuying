<template>
    <div class="container uploadedProducts">
        <Header :isSearchHide="false" :title="this.$route.name">
        </Header>
    </div>
</template>

<script>
    import Header from '../../components/header/header'
    export default {
        data(){
            return{

            }
        },
        components:{
            Header
        }
    }
</script>

<style lang="scss" scoped>

</style>