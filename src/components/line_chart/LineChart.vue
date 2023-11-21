<template>
  <div style="background-color: rgb(236, 242, 244);">
    <svg view-box="150 130 200 150" width="450" height="400">
      <g>

        <!-- leftline -->
        <g class="myYaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
          <line :x1="x(0)" :y1="y(0)" :x2="x(0)" :y2="y(maxHozyosenValue)" stroke="#000"></line>

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


        <!-- shot dots -->
        <template v-for="shot in shots" :key="shot">
          <circle :cx="clubIndexToX(clubIndex(shot.club.clubType))" :cy="y(shot.flyingDidtance.distance)" r="3"
            fill="red" />
        </template>

        <!-- avarage lines -->
        <!-- TODO -->
        <!-- lineで今の実装だと試打していないクラブの飛距離を保管できないから、pathで次に存在するshotのx, y座標を求めて線を引く-->
        <template v-for="(avarageShot, avarageShotIndex) in avarageFlyingDistanceShots" :key="avarageShotIndex">
          <path stroke="#ccc"
            :d="`
            M 
            ${clubIndexToX(clubIndex(avarageShot.club.clubType))},
            ${y(avarageShot.flyingDidtance.distance)} 
            L 
            ${avarageFlyingDistanceShots.length - 1 <= avarageShotIndex ? clubIndexToX(clubIndex(avarageShot.club.clubType)) : clubIndexToX(clubIndex(avarageFlyingDistanceShots[avarageShotIndex + 1].club.clubType))},
            ${avarageFlyingDistanceShots.length - 1 <= avarageShotIndex ? y(avarageShot.flyingDidtance.distance) : y(avarageFlyingDistanceShots[avarageShotIndex + 1].flyingDidtance.distance)}`" />
        </template>


        <!-- underline -->
        <g class="myXaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
          <line :x1="x(0)" :y1="y(0)" :x2="x(_.keys(Clubs).length)" :y2="y(0)" stroke="#000"></line>

          <template v-for="(club, clubIndex) in clubs" :key="club">

            <line :x1="clubIndexToX(clubIndex)" :y1="y(0)" :x2="clubIndexToX(clubIndex)" :y2="y(0) + 5" stroke="#000">
            </line>
            <text :x="clubIndexToX(clubIndex)" :y="y(0) + 5" text-anchor="middle" font="10px &quot;Arial&quot;"
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
import { Club, Clubs, ClubTypes, FlyingDistance, Shot } from './shot'
import * as d3 from 'd3'

const props = defineProps<{
  shots: Shot[]
}>()


// 各クラブの複数の飛距離の平均のShot[]
const avarageFlyingDistanceShots = computed(() => {
  const groupByClubType = _.groupBy(props.shots, shot => shot.club.clubType)
  return _.map(groupByClubType, shots => {
    const avarageFlyingDistance = _.meanBy(shots, shot => shot.flyingDidtance.distance)
    const shotTime = new Date()
    const club = new Club({ type: shots[0].club.clubType as ClubTypes, name: undefined })
    const flyingDistance = new FlyingDistance(avarageFlyingDistance)
    return new Shot({ shotTime: shotTime, club: club, flyingDistance: flyingDistance })
  })
})


/**
 * Y軸の補助線に関する者たち
 */
const maxHozyosen = 20
const hozyosenSteps = [1, 5, 10, 50, 100, 500, 1000]
const hozyosenStep = computed(() => {
  const maxFlyingDistance = _.max(_.map(props.shots, shot => shot.flyingDidtance.distance))
  if (!maxFlyingDistance) return 0

  const hozyosenStepIndex = _.findIndex(hozyosenSteps, step => step * maxHozyosen > maxFlyingDistance)
  return hozyosenSteps[hozyosenStepIndex]
})
const maxHozyosenValue = computed(() => {
  const maxFlyingDistance = _.max(_.map(props.shots, shot => shot.flyingDidtance.distance))
  if (!maxFlyingDistance) return 0

  return (Math.floor(maxFlyingDistance / hozyosenStep.value) + 1) * hozyosenStep.value
})
const shotDistanceScales = computed(() => {
  return _.range(0, maxHozyosenValue.value + 1, hozyosenStep.value)
})



// 素直にindexを渡すと、0番目のクラブがY軸と重なるためこの関数で調整している
const clubIndexToX = (index: number): number => {
  return x(index + 1)
}

const x = d3.scaleLinear([0, _.keys(Clubs).length], [40, 420]);
const y = d3.scaleLinear([0, maxHozyosenValue.value], [376.5, 20]);


const clubs = computed(() => {
  return _.keys(Clubs)
})

const clubIndex = (club: ClubTypes): number => {
  return _.findIndex(_.keys(Clubs), _club => _club == club)
}



</script>

<style scoped></style>./shot