<template>
  <div id="my_dataviz">
    <svg width="460" height="400">
      <g transform="translate(50,10)">
        <g transform="translate(0,360)" class="myXaxis" fill="none" font-size="10" font-family="sans-serif"
          text-anchor="middle">
          <path class="domain" stroke="#000" d="M0.5,6V0.5H380.5V6"></path>
          <g class="tick" opacity="1" transform="translate(0.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">0.0</text>
          </g>
          <g class="tick" opacity="1" transform="translate(25.833333333333332,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">0.2</text>
          </g>
          <g class="tick" opacity="1" transform="translate(51.166666666666664,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">0.4</text>
          </g>
          <g class="tick" opacity="1" transform="translate(76.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">0.6</text>
          </g>
          <g class="tick" opacity="1" transform="translate(101.83333333333333,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">0.8</text>
          </g>
          <g class="tick" opacity="1" transform="translate(127.16666666666666,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">1.0</text>
          </g>
          <g class="tick" opacity="1" transform="translate(152.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">1.2</text>
          </g>
          <g class="tick" opacity="1" transform="translate(177.83333333333331,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">1.4</text>
          </g>
          <g class="tick" opacity="1" transform="translate(203.16666666666666,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">1.6</text>
          </g>
          <g class="tick" opacity="1" transform="translate(228.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">1.8</text>
          </g>
          <g class="tick" opacity="1" transform="translate(253.83333333333331,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2.0</text>
          </g>
          <g class="tick" opacity="1" transform="translate(279.1666666666667,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2.2</text>
          </g>
          <g class="tick" opacity="1" transform="translate(304.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2.4</text>
          </g>
          <g class="tick" opacity="1" transform="translate(329.83333333333337,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2.6</text>
          </g>
          <g class="tick" opacity="1" transform="translate(355.16666666666663,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2.8</text>
          </g>
          <g class="tick" opacity="1" transform="translate(380.5,0)">
            <line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">3.0</text>
          </g>
        </g>
        <g class="myYaxis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
          <path class="domain" stroke="#000" d="M-6,360.5H0.5V0.5H-6"></path>
          <g class="tick" opacity="1" transform="translate(0,360.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">0</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,315.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">2</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,270.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">4</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,225.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">6</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,180.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">8</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,135.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">10</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,90.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">12</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,45.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">14</text>
          </g>
          <g class="tick" opacity="1" transform="translate(0,0.5)">
            <line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">16</text>
          </g>
        </g>
        <path class="lineTest" d="M38,270L253.33333333333331,0L380,180" fill="none" stroke="rgb(70, 130, 180)"
          stroke-width="2.5"></path>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as d3 from 'd3'

</script>

<style scoped></style>