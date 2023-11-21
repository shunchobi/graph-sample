<template>
  <div id="my_dataviz">
    <svg width="460" height="400">
      <g transform="translate(50,10)">
        <UnderLine />
        <LeftLine />
        <path class="lineTest" d="M38,270L253.33333333333331,0L380,180" fill="none" stroke="rgb(70, 130, 180)"
          stroke-width="2.5"></path>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import UnderLine from './components/UnderLine.vue'
import LeftLine from './components/LeftLine.vue'

</script>

<style scoped></style>