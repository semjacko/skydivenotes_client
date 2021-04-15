import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ScrollPicker} from './scrollpicker';
import {styles, styleColors} from '../styles';
import {ModalUpperButtons} from './modal-buttons';
import {date2USformat} from './functions';

const YEARS = [...Array(60).keys()].map((e) => ({key: e + 1, value: e + 1990}));

const MONTHS = [
    {key: 1, value: 'Január'},
    {key: 2, value: 'Február'},
    {key: 3, value: 'Marec'},
    {key: 4, value: 'Apríl'},
    {key: 5, value: 'Máj'},
    {key: 6, value: 'Jún'},
    {key: 7, value: 'Júl'},
    {key: 8, value: 'August'},
    {key: 9, value: 'September'},
    {key: 10, value: 'Október'},
    {key: 11, value: 'November'},
    {key: 12, value: 'December'}
];

const getDaysOfMonthYear = (month, year) => {
    let len = 31;
    if (month === 2) {
        len = year % 4 ? 28 : 29;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        len = 30;
    }
    return [...Array(len).keys()].map((e) => ({key: e+1, value: e+1}));
}

// onConfirm: ('yyyymmdd') => onConfirm
const DatePicker = ({isVisible, hide, initialDate, onConfirm}) => {
    if (typeof(initialDate) !== 'string' || initialDate.length != 8) {
        return null
    }
    
    let date = {
        year: initialDate.slice(0, 4),
        month: initialDate.slice(4, 6),
        day: initialDate.slice(6, 8)
    };

    const [day, setDay] = useState(date.day);  // od 1 po 31
    const [month, setMonth] = useState(date.month);  // od 1 po 12
    const [year, setYear] = useState(date.year);  // od 1990 po 2050

    return (
        <Modal
            style={{margin: 0}}
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackButtonPress={() => { hide(); }}
        >
            <View style={styles.bottomModal}>
                <View style={styles.bottomModalView}>
                    <ModalUpperButtons
                        onConfirm={() => {
                            let result = date2USformat(`${day}/${month}/${year}`);
                            onConfirm(result);
                            hide();
                        }}
                        onCancel={() => {
                            hide();
                        }}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <ScrollPicker
                            data={getDaysOfMonthYear(month, year)}
                            initialKey={date.day}
                            width={60}
                            highlightColor={styleColors.mainColor}
                            onSelect={(obj) => { setDay(parseInt(obj.value)); }}
                        />
                        <ScrollPicker
                            data={MONTHS}
                            initialKey={MONTHS.find(e => e.key == date.month).key}
                            height={200}
                            width={110}
                            highlightColor={styleColors.mainColor}
                            onSelect={(obj) => { setMonth(obj.key); }}
                        />
                        <ScrollPicker
                            data={YEARS}
                            initialKey={date.year - 1989}
                            height={200}
                            width={80}
                            highlightColor={styleColors.mainColor}
                            onSelect={(obj) => { setYear(parseInt(obj.value)); }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export {DatePicker};
