import _ from 'lodash';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Club, ClubTypes, Clubs, DataValue, Shot } from './line_chart/shot';

export const useSampleDataStore = defineStore('sampleData', () => {

    const shots = ref()

    const generateShotDatas = () => {
        const shotedClubs = _.flatten(_.map(_.keys(Clubs), club => _.map(Array(10), _ => club)))
        shots.value = _.map(shotedClubs, (clubType, index) => {
            const shotTime = randomShotTime(index)
            const club = new Club({ type: clubType as ClubTypes, name: undefined })
            const flyingDistance = new DataValue(sampleData[clubType as ClubTypes]())
            return new Shot({ shotTime: shotTime, club: club, data: flyingDistance })
        })
    }

    const now = new Date()
    const randomShotTime = (index: number) => {
        return new Date(`${now.getMilliseconds() - index * 1000}`)
    }

    const sampleData: { [K in ClubTypes]: () => number } = {
        'SW': () => _.random(40, 100),
        'PW': () => _.random(50, 120),
        '9I': () => _.random(90, 140),
        '8I': () => _.random(100, 150),
        '7I': () => _.random(110, 160),
        '6I': () => _.random(120, 170),
        '5I': () => _.random(130, 180),
        '4I': () => _.random(140, 190),
        '5W': () => _.random(150, 220),
        '4UT': () => _.random(170, 230),
        '3UT': () => _.random(180, 240),
        '2W': () => _.random(180, 250),
        'DR': () => _.random(200, 300),
    }

    return {
        shots,
        generateShotDatas,
    }
});
