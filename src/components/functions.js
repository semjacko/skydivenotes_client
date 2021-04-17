import AsyncStorage from '@react-native-async-storage/async-storage';

// 20200504 => 4/5/2020
const date2SKformat = (date) => {
    if (typeof(date) !== 'string' || date.length != 8) {
        return '';
    }
    let [day, month, year] = [date.slice(6, 8), date.slice(4, 6), date.slice(0, 4)];
    let skDate = `${parseInt(day)}/${parseInt(month)}/${year}`;  // parseInt kvoli  '06' => 6
    return skDate;
}

// 4/5/2020 => 20200504
const date2USformat = (date) => {
    if (typeof(date) !== 'string') {
        return '';
    }
    let [day, month, year] = date.split('/');
    month = month.length < 2 ? `0${month}` : month;
    day = day.length < 2 ? `0${day}` : day;
    let usDate = `${year}${month}${day}`;
    return usDate;
}

const altitude2seconds = (altitude) => {
    let altitudeInt = parseInt(altitude);

    if (isNaN(altitudeInt) || altitudeInt <= 800) {
        return 0;
    } else if (altitudeInt <= 1200) {
        return 5;
    } else if (altitudeInt <= 1500) {
        return 10;
    } else if (altitudeInt <= 2000) {
        return 20;
    } else if (altitudeInt <= 3000) {
        return 40;
    } else if (altitudeInt > 3000) {
        return 60;
    }

    return -1;
}

const seconds2HHMMSS = (secondsRaw) => {
    let hours   = Math.floor(secondsRaw / 3600);
    let minutes = Math.floor((secondsRaw - (hours * 3600)) / 60);
    let seconds = secondsRaw - (hours * 3600) - (minutes * 60);

    hours = hours < 10 ?  `0${hours}` : hours;
    minutes = minutes < 10 ?  `0${minutes}` : minutes;
    seconds = seconds < 10 ?  `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

const calcWingLoad = (weight, wingSize) => parseFloat(((weight * 2.2) / wingSize).toFixed(2));

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // todo
    }
}

const getStoredData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}
  

export {date2SKformat, date2USformat, calcWingLoad, altitude2seconds, storeData, getStoredData, seconds2HHMMSS};