import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ScrollPicker} from './scrollpicker';
import {styles, styleColors} from '../styles';
import {ModalUpperButtons} from './modal-buttons';
import {date2USformat} from './functions';


const months = [
    'Január',
    'Február',
    'Marec',
    'Apríl',
    'Máj',
    'Jún',
    'Júl',
    'August',
    'September',
    'Október',
    'November',
    'December',
];

const getDaysOfMonthYear = (month, year) => {
    let len = 31;
    if (month === 2) {
        len = year % 4 ? 28 : 29;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        len = 30;
    }
    return Array.from({length: len}, (_, i) => i + 1);
}


// onConfirm: ('yyyymmdd') => onConfirm
const DatePicker = ({isVisible, setIsVisible, initialDate, onConfirm}) => {
    let dateArr = initialDate.split('/');
    let date = {
        year: parseInt(dateArr[0]),
        month: parseInt(dateArr[1]),
        day: parseInt(dateArr[2])
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
            onBackButtonPress={() => { setIsVisible(!isVisible); }}
        >
            <View style={styles.bottomModal}>
                <View style={styles.bottomModalView}>
                    <ModalUpperButtons
                        onConfirm={() => {
                            setIsVisible(false);
                            let result = date2USformat(`${day}/${month}/${year}`);
                            onConfirm(result);
                        }}
                        onCancel={() => {
                            setIsVisible(false);
                        }}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <ScrollPicker
                            data={getDaysOfMonthYear(month, year)}
                            initialIndex={date.day - 1}
                            width={60}
                            highlightColor={styleColors.mainColor}
                            onSelect={(text) => { setDay(parseInt(text)); }}
                        />
                        <ScrollPicker
                            data={months}
                            initialIndex={date.month - 1}
                            height={200}
                            width={110}
                            highlightColor={styleColors.mainColor}
                            onSelect={(text) => { setMonth(months.indexOf(text) + 1); }}
                        />
                        <ScrollPicker
                            data={Array.from({length: 61}, (_, i) => i + 1990)}
                            initialIndex={date.year - 1990}
                            height={200}
                            width={80}
                            highlightColor={styleColors.mainColor}
                            onSelect={(text) => { setYear(parseInt(text)); }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export {DatePicker};
