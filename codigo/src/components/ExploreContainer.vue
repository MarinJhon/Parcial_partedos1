<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 1.111rem; /* 20px / 18px */
  line-height: 1.444rem; /* ~26px / 18px */
}

#container p {
  font-size: 0.889rem; /* 16px / 18px */
  line-height: 1.222rem; /* ~22px / 18px */
  color: var(--ion-muted-color);
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
