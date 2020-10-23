<template>
    <div class="banner">
        <div class="boxMsg"></div>
    </div>
</template>
<script>
export default {
    name: 'home'
}
</script>
<style lang="stylus">
    .dm-xiong-home{
        min-height 100vh;
        overflow hidden;
        .boxMsg{
            position fixed;
            top 50%;
            left 50%;
            transform translate3d(-32%, 21%, 0);
            width 300px;
            height 300px;
            border-radius 5px;
            background-color rgba(255, 255, 255, .1);
        }
        .page{
            padding 0;
        }
        .page-edit{
            display none;
        }
        .navbar{
            background-color transparent;
            border-bottom 0;
            .home-link{
                opacity 0;
            }
            .links{
                padding: 0 1.5rem;
                border-radius 5px;
                background-color rgba(255, 255, 255, .1);
            }
        }
        .banner{
            width 100%;
            height 100vh;
            background-image url('../public/assets/img/17.jpg');
            background-position: 50% 50%;
            background-size: cover;
        }
        .theme-default-content:not(.custom){
            max-width 100%;
            padding 0;
        }
        .theme-default-content:not(.custom) > *:first-child{
            margin-top 0;
        }
    }
</style>
