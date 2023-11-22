<template>
  <div style="background-color: rgb(236, 242, 244);">
    <svg view-box="150 130 200 150" width="450" height="400">
      <g>

        <!-- leftline -->
        <g class="myYaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
          <line :x1="x(0)" :y1="y(minHozyosenValue)" :x2="x(0)" :y2="y(maxHozyosenValue)" stroke="#000"></line>

          <template v-for="scale in shotDistanceScales" :key="scale">
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
        <!-- TODO 飛距離データがない場合の保管に対応する -->
        <template v-for="(shot, avarageShotIndex) in flyingDidtanceSummary" :key="shot.clubIndex">
          <path stroke="#ccc"
            :d="`
            M ${clubIndexToX(clubIndex(shot.club.clubType))},${y(shot.average)} 
            L 
                                                            ${flyingDidtanceSummary.length - 1 <= avarageShotIndex ? clubIndexToX(clubIndex(shot.club.clubType)) : clubIndexToX(clubIndex(flyingDidtanceSummary[avarageShotIndex + 1].club.clubType))},
                                                            ${flyingDidtanceSummary.length - 1 <= avarageShotIndex ? y(shot.average) : y(flyingDidtanceSummary[avarageShotIndex + 1].average)}`" />
        </template>

        <!-- box plot -->
        <!-- クラブの飛距離の最大値、最小値 -->
        <template v-for="shot in flyingDidtanceSummary" :key="shot.clubIndex">
          <template v-if="graphType == 'box' || graphType == 'linebox' ">
            <line :x1="clubIndexToX(shot.clubIndex)" :y1="y(shot.max!)" :x2="clubIndexToX(shot.clubIndex)" :y2="y(shot.min!)" stroke="#000"></line>
            <line :x1="clubIndexToX(shot.clubIndex) - 2" :y1="y(shot.min!)" :x2="clubIndexToX(shot.clubIndex) + 2" :y2="y(shot.min!)" stroke="#000"></line>
            <line :x1="clubIndexToX(shot.clubIndex) - 2" :y1="y(shot.max!)" :x2="clubIndexToX(shot.clubIndex) + 2" :y2="y(shot.max!)" stroke="#000"></line>
            <rect 
              :x="clubIndexToX(shot.clubIndex) - 5" 
              :y="y(shot.q75!)"
              :height="shot.q75! - shot.q25!"
              width="10" 
              stroke="#000"/>
          </template>
        </template>


        <!-- distance dots -->
        <template v-if="graphType == 'line'|| graphType == 'linebox' " v-for="shot in shots" :key="shot">
          <circle :cx="clubIndexToX(clubIndex(shot.club.clubType))" :cy="y(shot.flyingDidtance.distance)" r="3"
            fill="red" />
        </template>


        <!-- underline -->
        <g class="myXaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
          <line :x1="x(0)" :y1="y(minHozyosenValue)" :x2="x(_.keys(Clubs).length)" :y2="y(minHozyosenValue)" stroke="#000"></line>

          <template v-for="(club, clubIndex) in clubs" :key="club">

            <line :x1="clubIndexToX(clubIndex)" :y1="y(minHozyosenValue)" :x2="clubIndexToX(clubIndex)" :y2="y(minHozyosenValue) + 5" stroke="#000">
            </line>
            <text :x="clubIndexToX(clubIndex)" :y="y(minHozyosenValue) + 5" text-anchor="middle" font="10px &quot;Arial&quot;"
              stroke="none" fill="#888888"
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
import { Clubs, ClubTypes, Shot } from './shot'
import * as d3 from 'd3'

const props = defineProps<{
  shots: Shot[]
  graphType: 'line' | 'box' | 'linebox'
  fromZero: boolean
}>()


// 各クラブの複数の飛距離の平均のShot[]
const flyingDidtanceSummary = computed(() => {
  const groupByClubType = _.groupBy(props.shots, shot => shot.club.clubType)
  const summaries = _.map(groupByClubType, shots => {
    const distances = _.map(shots, shot => shot.flyingDidtance.distance)

    const average = _.mean(distances)
    const min = d3.min(distances)
    const max = d3.max(distances)
    const q25 = d3.quantile(distances, 0.25)
    const q75 = d3.quantile(distances, 0.75)

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


/**
 * Y軸の補助線に関する者たち
 */
const maxHozyosen = 20
const hozyosenSteps = [0.5, 1, 5, 10, 50, 100, 500, 1000]
const hozyosenStep = computed(() => {
  const maxFlyingDistance = _.max(_.map(props.shots, shot => shot.flyingDidtance.distance))
  const minFlyingDistance = _.min(_.map(props.shots, shot => shot.flyingDidtance.distance))

  if (!maxFlyingDistance || !minFlyingDistance) return 0

  const diff = maxFlyingDistance - minFlyingDistance

  const hozyosenStepIndex = _.findIndex(hozyosenSteps, step => step * maxHozyosen > diff)
  return hozyosenSteps[hozyosenStepIndex]
})
const maxHozyosenValue = computed(() => {
  const maxFlyingDistance = _.max(_.map(props.shots, shot => shot.flyingDidtance.distance))
  if (!maxFlyingDistance) return 0

  return (Math.floor(maxFlyingDistance / hozyosenStep.value) + 1) * hozyosenStep.value
})
const minHozyosenValue = computed(() => {
  if(props.fromZero) return 0
  const minFlyingDistance = _.min(_.map(props.shots, shot => shot.flyingDidtance.distance))
  if (!minFlyingDistance) return 0

  return (Math.floor(minFlyingDistance / hozyosenStep.value) - 1) * hozyosenStep.value
})
const shotDistanceScales = computed(() => {
  return _.range(minHozyosenValue.value, maxHozyosenValue.value + 1, hozyosenStep.value)
})



// 素直にindexを渡すと、0番目のクラブがY軸と重なるためこの関数で調整している
const clubIndexToX = (index: number): number => {
  return x.value(index + 1)
}

const x = computed(() => d3.scaleLinear([0, _.keys(Clubs).length], [40, 420]))
const y = computed(() => d3.scaleLinear([minHozyosenValue.value, maxHozyosenValue.value], [376.5, 20]));


const clubs = computed(() => {
  return _.keys(Clubs)
})

const clubIndex = (club: ClubTypes): number => {
  return _.findIndex(_.keys(Clubs), _club => _club == club)
}



</script>

<style scoped></style>