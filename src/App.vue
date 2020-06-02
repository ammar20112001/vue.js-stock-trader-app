<template>
  <div class='container'>
    <app-header></app-header>
    <transition name='slide' mode='out-in'>
      <router-view></router-view>  
    </transition>
  </div>
</template>

<script>

import Header from './components/Header'

export default {
  components: {
    appHeader: Header,
  }
}


</script>

<style>

  .slide-enter {
    transform: translateY(20px);
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 0.5s ease-out forwards;
    transition: opacity 0.5s;
  }

  .slide-leave-active {
    animation: slide-out 0.5s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px)
    }
    to {
      transform: translateY(0)
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(20px)
    }
  }

</style>
