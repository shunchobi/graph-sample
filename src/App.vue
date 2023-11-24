<template>
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
    <LineChart :shots="shotData" :from-zero="fromZero" />
  </div>

  <div style="margin-top: 30px;">
    <textarea style="width: 460px; height: 250px;" v-model="csvText"></textarea>
  </div>

  <div style="margin: 10px;">
    <button @click="csvText = sampleData" style="margin-right: 15px;">提供データ1</button>
    <button @click="csvText = ramdomCsvData">サンプルデータ</button>
  </div>
</template>

<script setup lang="ts">
import LineChart from './components/line_chart/LineChart.vue';
import _ from 'lodash'
import { usePreferenceStore } from './components/preference'
import { computed, ref } from 'vue'
import { sampleData } from "./sampleData"
import { csvParse } from './parser'
import { Club, DataValue, Shot } from './components/line_chart/shot';
import { ramdomCsvData } from './components/randomCsv.ts'

import { ClubCodes } from './components/line_chart/csvType.ts'

const preferenceStore = usePreferenceStore()

const csvText = ref(sampleData)
const csvDatas = ref<object[]>([])
const csvSampleData = computed(() => {
  csvDatas.value = csvParse(csvText.value)
  return getClubAndFlyingDirectionDatasFromCsv(csvDatas.value)
})
const hearders = computed(() => _.keys(csvDatas.value[0]))
const selectedHeader = ref('Carry Flat - Length')
const fromZero = ref(false)


const shotData = computed(() => {
  return csvSampleData.value
})


const getClubAndFlyingDirectionDatasFromCsv = (datas: object[]): Shot[] => {
  const clubAndDataValue = _.map(datas, data => {
    return {
      'Club': _.get(data, 'Club'),
      'value': _.get(data, selectedHeader.value),
    }
  })

  const unit = clubAndDataValue[0]['value']

  const targetHeaderDatas = _.map(clubAndDataValue, data => {
    const value = data['value']
    if (_.isEmpty(value)) return undefined
    if (!_.isNumber(_.toNumber(value))) return undefined
    if (_.isNaN(_.toNumber(value))) return undefined

    const clubName = data['Club']
    const clubType = getClubType(clubName!)
    const shotTime = new Date()
    const club = new Club({ type: clubType, name: undefined })
    const dataValue = new DataValue(Math.floor(value))
    return new Shot({ shotTime: shotTime, club: club, data: dataValue, unit: unit })
  })

  return _.filter(targetHeaderDatas, data => data != undefined) as Shot[]
}

const getClubType = (club: string): ClubCodes => {
  switch (club) {
    case '9 iron':
      return '9I';
    case '8 iron':
      return '8I';
    case '7 iron':
      return '7I';
    case '6 iron':
      return '6I';
    case '5 iron':
      return '5I';
    case '4 iron':
      return '4I';


    case '5 wood':
      return '5W';
    case '2 wood':
      return '2W';

    case '4 ut':
      return '4UT'
    case '3 ut':
      return '3UT'

    case 'ピッチングウェッジ':
      return 'PW'
    case 'サンドウェッジ':
      return 'SW'

    case '56°':
      return '7WG'
    case '60°':
      return '9WG'


    case 'ドライバー':
      return 'DR'
    default:
      console.log(`CSVから取得したクラブの名前が予想されていない名前です。: ${club}`)
      return 'XXX'
  }
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
</style>