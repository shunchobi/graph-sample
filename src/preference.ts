import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';

export const usePreferenceStore = defineStore('preference', () => {


    const STORE_NAME = 'g-log-chart-sample-preference'

    const showLine = ref(true)
    const showDot = ref(true)
    const showBox = ref(false)

    const saveToLocalStorage = () => {
        localStorage.setItem(STORE_NAME, JSON.stringify({
            showLine: showLine.value,
            showDot: showDot.value,
            showBox: showBox.value,
        }))
    }

    const getFromLocalStorage = () => {
        const settings = localStorage.getItem(STORE_NAME)
        return settings ? JSON.parse(settings) : {
            showLine: showLine.value,
            showDot: showDot.value,
            showBox: showBox.value,
        }
    }

    onMounted(() => {
        const preferences = getFromLocalStorage()
        showLine.value = preferences.showLine
        showDot.value = preferences.showDot
        showBox.value = preferences.showBox
    })

    watch(
        () => [
            showLine.value,
            showDot.value,
            showBox.value,
        ],
        () => saveToLocalStorage()
    )

    return {
        showLine,
        showDot,
        showBox,
    }
});
