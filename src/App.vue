<template>
  <div style="margin-bottom: 30px;">
    <input v-model="preferenceStore.graphType" type="radio" id="radio1" name="graphType" value="line">
    <label for="radio1"><span class="radio-title">折れ線</span></label>
    <input v-model="preferenceStore.graphType" type="radio" id="radio2" name="graphType" value="box">
    <label for="radio2"><span class="radio-title">箱ひげ</span></label>
  </div>

  <div style="margin-bottom: 30px;">
    <input v-model="preferenceStore.dataType" type="radio" id="radio3" name="dataType" value="sample">
    <label for="radio3"><span class="radio-title">サンプルデータ</span></label>
    <input v-model="preferenceStore.dataType" type="radio" id="radio4" name="dataType" value="custom">
    <label for="radio4"><span class="radio-title">入力データ</span></label>
  </div>

  <div>
    <LineChart :shots="shots" />
  </div>
</template>

<script setup lang="ts">
import LineChart from './components/line_chart/LineChart.vue';
import _ from 'lodash'
import { usePreferenceStore } from './components/preference'
import { useSampleDataStore } from './components/sampleData'
import { computed } from 'vue';

const preferenceStore = usePreferenceStore()
const sampleDataStore = useSampleDataStore()

const shots = computed(() => {
  if (preferenceStore.dataType == 'sample') return sampleDataStore.shots
  if (preferenceStore.dataType == 'custom') return []
  return []
})

</script>

<style>
body {
  background-color: white;
}

input[type=radio] {
  display: none;
  margin: 10px;
}

input[type=radio]+label {
  display: inline-block;
  margin: -2px;
  padding: 4px 12px;
  background-color: #d6d3d3;
  border-color: #a8a5a5;
}

input[type=radio]:checked+label {
  background-image: none;
  background-color: #4e4d4d;
}
</style>