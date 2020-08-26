<template>
  <div id="app">
    <words />
  </div>
</template>

<script>
import words from './components/words.vue'

export default {
  name      : 'app',
  components: {
    words
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary:  #222222;
$primary-invert: #ffcc00;
$info: #014266;
$info-invert: findColorInvert($info);
$success: #3f653a;
$success-invert: findColorInvert($success);
$danger: #641717;
$danger-invert: findColorInvert($danger);
$warning: #cd5113;
$warning-invert: findColorInvert($warning);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "primary-invert": ($primary-invert, $primary)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
