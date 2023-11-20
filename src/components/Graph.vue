<template>
  <svg class="graph"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import d3 from '../d3';

const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

onMounted(() => {

  const x = d3.scale.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scale.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.selection.select(".graph")
    .attr("width", width)
    .attr("height", height);

  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axis.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axis.axisLeft(y));

})

</script>

<style scoped></style>