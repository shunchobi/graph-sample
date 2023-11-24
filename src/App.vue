<template>
  <div style="margin-bottom: 30px;">
    <input v-model="preferenceStore.graphType" type="radio" id="radio1" name="graphType" value="line">
    <label for="radio1"><span class="radio-title">折れ線</span></label>
    <input v-model="preferenceStore.graphType" type="radio" id="radio2" name="graphType" value="box">
    <label for="radio2"><span class="radio-title">箱ひげ</span></label>
    <input v-model="preferenceStore.graphType" type="radio" id="radio3" name="graphType" value="linebox">
    <label for="radio3"><span class="radio-title">箱ひげ折れ線</span></label>
  </div>

  <div style="margin-bottom: 30px;">
    <input @click="selectedHeader = 'Carry Flat - Length'" v-model="preferenceStore.dataType" type="radio" id="radio4"
      name="dataType" value="random">
    <label for="radio4"><span class="radio-title">ランダムデータ</span></label>
    <input v-model="preferenceStore.dataType" type="radio" id="radio5" name="dataType" value="custom">
    <label for="radio5"><span class="radio-title">csvデータ</span></label>
  </div>

  <div>
    <label style="color: black; margin-right: 10px;">データの種類:</label>
    <select v-model="selectedHeader" :disabled="preferenceStore.dataType == 'random'" style="margin-bottom: 10px;">
      <template v-for="h in hearders" :key="h">
        <option>{{ h }}</option>
      </template>
    </select>
  </div>

  <div v-if="preferenceStore.dataType == 'custom'">
    <label style="color: black; margin-right: 10px;">データの起点</label>
    <select v-model="fromZero" style="margin-bottom: 10px;">
      <option :value="true">ゼロ</option>
      <option :value="false">自動</option>
    </select>
  </div>

  <div style="margin: 10px;" v-if="preferenceStore.dataType == 'random'">
    <button @click="sampleDataStore.generateShotDatas">データ更新</button>
  </div>

  <div>
    <LineChart :shots="shotData" :graph-type="preferenceStore.graphType" :from-zero="fromZero" />
  </div>

  <div v-if="preferenceStore.dataType == 'custom'" style="margin-top: 30px;">
    <textarea style="width: 460px; height: 250px;" :value="sampleData"></textarea>
  </div>
</template>

<script setup lang="ts">
import LineChart from './components/line_chart/LineChart.vue';
import _ from 'lodash'
import { usePreferenceStore } from './components/preference'
import { useSampleDataStore } from './components/sampleData'
import { computed, onMounted, ref } from 'vue'
import { sampleData } from "./sampleData"
import { csvParse } from './parser'
import { Club, ClubTypes, FlyingDistance, Shot } from './components/line_chart/shot';

const preferenceStore = usePreferenceStore()
const sampleDataStore = useSampleDataStore()

const csvDatas = ref<object[]>([])
const csvSampleData = ref<Shot[]>([])
const hearders = computed(() => _.keys(csvDatas.value[0] ?? {}))
const selectedHeader = ref('Carry Flat - Length')
const fromZero = ref(false)


const shotData = computed(() => {
  if (preferenceStore.dataType == 'random') {
    sampleDataStore.generateShotDatas()
    return sampleDataStore.shots
  }
  if (preferenceStore.dataType == 'custom') {
    csvSampleData.value = getClubAndFlyingDirectionDatasFromCsv(csvDatas.value)
    return csvSampleData.value
  }
  return []
})


const getClubAndFlyingDirectionDatasFromCsv = (datas: object[]) => {
  const clubAndFlyingLength = _.map(datas, data => {
    return {
      'Club': _.get(data, 'Club'),
      'value': _.get(data, selectedHeader.value),
    }
  })

  return _.map(clubAndFlyingLength, data => {
    const flyingDidtance = data['value']
    const clubName = data['Club']

    const clubType = getClubType(clubName!)
    const shotTime = new Date()
    const club = new Club({ type: clubType, name: undefined })
    const flyingDistance = new FlyingDistance(Math.floor(flyingDidtance!))
    return new Shot({ shotTime: shotTime, club: club, flyingDistance: flyingDistance })
  })
}

const getClubType = (club: string): ClubTypes => {
  switch (club) {
    case '7 iron':
      return '7I';
    case '60°':
      return 'PW'
    case '56°':
      return 'SW'
    case 'ドライバー':
      return 'DR'
    default:
      throw Error(`CSVから取得したクラブの名前が予想されていない名前です。: ${club}`)
  }
}


onMounted(() => {
  csvDatas.value = csvParse(sampleData)
  csvSampleData.value = getClubAndFlyingDirectionDatasFromCsv(csvDatas.value)
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