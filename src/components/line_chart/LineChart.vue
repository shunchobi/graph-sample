<template>
  <div style="background-color: rgb(236, 242, 244);">
    <svg view-box="150 130 200 150" width="450" height="420">
      <g>

        <!-- unit -->
        <text :x="x(0) - 20" :y="y(maxHozyosenValue) - 20" text-anchor="middle" font="10px &quot;Arial&quot;"
          stroke="none" fill="#888888"
          style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 12px sans-serif;"
          font-size="12px" font-family="sans-serif" font-weight="normal" transform="matrix(1,0,0,1,0,9)">
          <tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="-5">{{ unitName }}</tspan>
        </text>

        <!-- leftline -->
        <g class="myYaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
          <line :x1="x(0)" :y1="y(minHozyosenValue)" :x2="x(0)" :y2="y(maxHozyosenValue)" stroke="#000"></line>
          <template v-for="scale in shotDataValueScales" :key="scale">
            <line :x1="x(0)" :y1="y(scale)" :x2="x(_.keys(Clubs).length) + 5" :y2="y(scale)" stroke="#ccc"></line>
            <text :x="x(0) - 20" :y="y(scale)" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none"
              fill="#888888"
              style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 12px sans-serif;"
              font-size="12px" font-family="sans-serif" font-weight="normal" transform="matrix(1,0,0,1,0,9)">
              <tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="-5">{{ scale }}</tspan>
            </text>
          </template>
        </g>

        <!-- avarage lines -->
        <template v-if="preferenceStore.showLine">
          <path :d="getPathD(
            _.map(dataSummaries, data => data.clubIndex),
            _.map(dataSummaries, data => data.average)
          )" stroke="#ccc" fill="none" />
        </template>

        <!-- dots -->
        <template v-if="preferenceStore.showDot" v-for="shot in shots" :key="shot">
          <circle :cx="clubIndexToX(clubIndex(shot.club.clubType))" :cy="y(shot.data.value)" r="3" fill="red" />
          {{ shot.data.value }}
        </template>

        <!-- box plot -->
        <template v-if="preferenceStore.showBox" v-for="shot in dataSummaries" :key="shot.clubIndex">
          <line :x1="clubIndexToX(shot.clubIndex)" :y1="y(shot.max!)" :x2="clubIndexToX(shot.clubIndex)"
            :y2="y(shot.q75!)" stroke="#000"></line>
          <line :x1="clubIndexToX(shot.clubIndex)" :y1="y(shot.min!)" :x2="clubIndexToX(shot.clubIndex)"
            :y2="y(shot.q25!)" stroke="#000"></line>

          <line :x1="clubIndexToX(shot.clubIndex) - 2" :y1="y(shot.min!)" :x2="clubIndexToX(shot.clubIndex) + 2"
            :y2="y(shot.min!)" stroke="#000"></line>
          <line :x1="clubIndexToX(shot.clubIndex) - 2" :y1="y(shot.max!)" :x2="clubIndexToX(shot.clubIndex) + 2"
            :y2="y(shot.max!)" stroke="#000"></line>
          <rect :x="clubIndexToX(shot.clubIndex) - 5" :y="y(shot.q75!)" :height="Math.abs(y(shot.q75!) - y(shot.q25!))"
            width="10" stroke="#000" fill="none" />
        </template>


        <!-- avarage dots -->
        <template v-if="preferenceStore.showLine || preferenceStore.showBox" v-for="data in dataSummaries"
          :key="data.clubIndex">
          <line :x1="clubIndexToX(data.clubIndex) - 2" :y1="y(data.average) - 2" :x2="clubIndexToX(data.clubIndex) + 2"
            :y2="y(data.average) + 2" stroke="black"></line>
          <line :x1="clubIndexToX(data.clubIndex) + 2" :y1="y(data.average) - 2" :x2="clubIndexToX(data.clubIndex) - 2"
            :y2="y(data.average) + 2" stroke="black"></line>
        </template>

        <!-- underline -->
        <g class="myXaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
          <line :x1="x(0)" :y1="y(minHozyosenValue)" :x2="x(_.keys(Clubs).length)" :y2="y(minHozyosenValue)"
            stroke="#000"></line>

          <template v-for="(club, clubIndex) in clubs" :key="club">
            <line :x1="clubIndexToX(clubIndex)" :y1="y(minHozyosenValue)" :x2="clubIndexToX(clubIndex)"
              :y2="y(minHozyosenValue) + 5" stroke="#000">
            </line>
            <text :x="clubIndexToX(clubIndex)" :y="y(minHozyosenValue) + 5" text-anchor="middle"
              font="10px &quot;Arial&quot;" stroke="none" fill="#888888"
              style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 12px sans-serif;"
              font-size="12px" font-family="sans-serif" font-weight="normal" transform="matrix(1,0,0,1,0,9)">
              <tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">{{ club }}</tspan>
            </text>
          </template>
        </g>

      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import _ from 'lodash'
import { Clubs, Shot } from './shot'
import * as d3 from 'd3'
import { usePreferenceStore } from '../preference';
import { ClubCodes } from './csvType';

const preferenceStore = usePreferenceStore()

const props = defineProps<{
  shots: Shot[]
  fromZero: boolean
}>()

const unitName = computed(() => {
  if (_.isEmpty(props.shots)) return ''
  return props.shots[0].unit
})

// 各クラブの複数の飛距離の平均のShot[]
const dataSummaries = computed(() => {
  const groupByClubType = _.groupBy(props.shots, shot => shot.club.clubType)
  const summaries = _.map(groupByClubType, shots => {
    const dataValue = _.map(shots, shot => shot.data.value)

    const average = _.mean(dataValue)
    const min = d3.min(dataValue)
    const max = d3.max(dataValue)
    const q25 = d3.quantile(dataValue, 0.25)
    const q75 = d3.quantile(dataValue, 0.75)

    return {
      clubIndex: clubIndex(shots[0].club.clubType),
      club: shots[0].club,
      average,
      min,
      max,
      q25,
      q75,
    }
  })
  return _.sortBy(summaries, 'clubIndex')
})

const getPathD = (xPoints: number[], yPoints: number[]) => {
  if (_.isEmpty(xPoints) || _.isEmpty(yPoints)) {
    console.log('getLinePathの引数の配列要素がありません。')
    return ''
  }
  if (xPoints.length != yPoints.length) {
    console.log('getLinePathの引数の配列要素数が異なります。')
    return ''
  }

  const vxs = _.map(xPoints, xp => clubIndexToX(xp))
  const vys = _.map(yPoints, yp => y.value(yp))

  let path = `M ${vxs[0]} ${vys[0]} L `
  for (let index = 1; index < vxs.length; index++) {
    const x = vxs[index]
    const y = vys[index]
    path += `${x},${y} `
  }

  return path
}

/**
 * Y軸の補助線に関する者たち
 */
const maxHozyosen = 20
const hozyosenSteps = [0.5, 1, 5, 10, 50, 100, 500, 1000]
const hozyosenStep = computed(() => {
  const maxDataValue = _.max(_.map(props.shots, shot => shot.data.value))
  const minDataValue = _.min(_.map(props.shots, shot => shot.data.value))

  if (!maxDataValue || !minDataValue) return 0

  const diff = maxDataValue - minDataValue

  const hozyosenStepIndex = _.findIndex(hozyosenSteps, step => step * maxHozyosen > diff)
  return hozyosenSteps[hozyosenStepIndex]
})
const maxHozyosenValue = computed(() => {
  const maxDataValue = _.max(_.map(props.shots, shot => shot.data.value))
  if (!maxDataValue) return 0

  return (Math.floor(maxDataValue / hozyosenStep.value) + 1) * hozyosenStep.value
})
const minHozyosenValue = computed(() => {
  if (props.fromZero) return 0
  const minDataValue = _.min(_.map(props.shots, shot => shot.data.value))
  if (!minDataValue) return 0

  return (Math.ceil(minDataValue / hozyosenStep.value) - 1) * hozyosenStep.value
})
const shotDataValueScales = computed(() => {
  return _.range(minHozyosenValue.value, maxHozyosenValue.value + hozyosenStep.value, hozyosenStep.value)
})



// 素直にindexを渡すと、0番目のクラブがY軸と重なるためこの関数で調整している
const clubIndexToX = (index: number): number => {
  return x.value(index + 1)
}

const x = computed(() => d3.scaleLinear([0, clubs.value.length], [40, 420]))
const y = computed(() => d3.scaleLinear([minHozyosenValue.value, maxHozyosenValue.value], [396.5, 40]));


const clubs = computed(() => {
  return _.keys(Clubs)
})

const clubIndex = (club: ClubCodes): number => {
  return _.findIndex(_.keys(Clubs), _club => _club == club)
}



</script>

<style scoped></style>