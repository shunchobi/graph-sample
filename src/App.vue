<template>
  <div style="text-align: center">

    <div style="margin-bottom: 30px;">
      <input v-model="preferenceStore.showLine" type="checkbox" id="checkbox1" name="graphType">
      <label for="checkbox1"><span class="radio-title">折れ線（平均値線）</span></label>
      <input v-model="preferenceStore.showDot" type="checkbox" id="checkbox2" name="graphType">
      <label for="checkbox2"><span class="radio-title">ドット（データ値）</span></label>
      <input v-model="preferenceStore.showBox" type="checkbox" id="checkbox3" name="graphType">
      <label for="checkbox3"><span class="radio-title">箱ひげ（密度域）</span></label>
    </div>

    <div>
      <label style="color: black; margin-right: 10px;">データの種類:</label>
      <select v-model="selectedHeader" style="margin-bottom: 10px;">
        <template v-for="h in hearders" :key="h">
          <option>{{ h }}</option>
        </template>
      </select>
    </div>

    <div>
      <label style="color: black; margin-right: 10px;">データの起点</label>
      <select v-model="fromZero" style="margin-bottom: 10px;">
        <option :value="true">ゼロ</option>
        <option :value="false">自動</option>
      </select>
    </div>

    <div>
      <Chart :shots="shotData" :from-zero="fromZero" :display-clubs="[
          clubInstances['7WG'],
          clubInstances['9WG'],
          clubInstances['SW'],
          clubInstances['PW'],
          clubInstances['9I'],
          clubInstances['8I'],
          clubInstances['7I'],
          clubInstances['6I'],
          clubInstances['5I'],
          clubInstances['4I'],
          clubInstances['4UT'],
          clubInstances['3UT'],
          clubInstances['5W'],
          clubInstances['2W'],
          clubInstances['DR'],
        ]
        " />
    </div>

    <div style="margin-top: 30px;">
      <textarea style="width: 460px; height: 250px;" v-model="csvText"></textarea>
    </div>

    <div style="margin: 10px;">
      <button @click="csvText = sampleData" style="margin-right: 15px;">提供データ1</button>
      <button @click="csvText = ramdomCsvData">サンプルデータ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from './components/Chart.vue';
import _ from 'lodash'
import { usePreferenceStore } from './preference'
import { computed, ref } from 'vue'
import { sampleData } from './csv/sampleData';
import { ramdomCsvData } from './csv/randomCsv';
import { ClubCsvName, Header } from './type/csvType.ts'
import { csvParse } from './util/parser';
import { DataValue, Shot } from './type/shot';
import { csvClubNameToClubCode, clubInstances } from './type/clubUtil';

const preferenceStore = usePreferenceStore()

const csvText = ref(sampleData)
const csvDatas = ref<object[]>([])
const csvSampleData = computed(() => {
  csvDatas.value = csvParse(csvText.value)
  return getDataFromCsv(csvDatas.value)
})
const hearders = computed(() => _.keys(csvDatas.value[0]))
const selectedHeader = ref('Carry Flat - Length')
const fromZero = ref(false)


const shotData = computed(() => {
  return csvSampleData.value
})


const getDataFromCsv = (datas: object[]): Shot[] => {
  const clubAndDataValue = _.map(datas, data => {
    return {
      'Club': _.get(data, Header.club),
      'value': _.get(data, selectedHeader.value),
    }
  })

  const unit = clubAndDataValue[0]['value']

  const targetHeaderDatas = _.map(clubAndDataValue, data => {
    const value = data['value']
    if (_.isEmpty(value)) return undefined
    if (!_.isNumber(_.toNumber(value))) return undefined
    if (_.isNaN(_.toNumber(value))) return undefined

    const clubName: ClubCsvName | undefined = data['Club']
    if (!clubName) return undefined

    const clubType = csvClubNameToClubCode[clubName]
    const shotTime = new Date()
    const club = clubInstances[clubType]
    const dataValue = new DataValue(Math.floor(value))
    return new Shot({ shotTime: shotTime, club: club, data: dataValue, unit: unit })
  })

  return _.filter(targetHeaderDatas, data => data != undefined) as Shot[]
}



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

.radio-title {
  color: black;
  user-select: none;
  padding-right: 10px;
}
</style>./preference.ts