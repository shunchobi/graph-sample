import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';

export const usePreferenceStore = defineStore('preference', () => {


    const STORE_NAME = 'g-log-chart-sample-preference'

    const graphType = ref<'line' | 'box'>('line')
    const dataType = ref<'sample' | 'custom'>('sample')

    const saveToLocalStorage = () => {
        localStorage.setItem(STORE_NAME, JSON.stringify({
            graphType: graphType.value,
            dataType: dataType.value,
        }))
    }

    const getFromLocalStorage = () => {
        const settings = localStorage.getItem(STORE_NAME)
        return settings ? JSON.parse(settings) : {
            graphType: graphType.value,
            dataType: dataType.value,
        }
    }

    onMounted(() => {
        const preferences = getFromLocalStorage()
        graphType.value = preferences.graphType
        dataType.value = preferences.dataType
    })

    watch(
        () => [graphType.value, dataType.value],
        () => saveToLocalStorage()
    )

    return {
        graphType,
        dataType,
    }
});
