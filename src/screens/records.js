import {StatusBar, View, Text, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {connect} from 'react-redux';
import {addRecord, getRecords} from '../server';
import {ScrollDownButton} from '../components/scroll-down-button';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import {date2SKformat, altitude2seconds, date2USformat} from '../components/functions';

const RecordsContainer = (props) => {
    let flatList = React.createRef();

    const [isUpdate, setIsUpdate] = useState(false);  // update flatlistu
    const [isScrolled, setIsScrolled] = useState(false);  // ak je true tak sa zobrazi sipka dole
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getRecords({
                token: props.globalState.token,
                success: (data) => {
                    props.dispatch({type: 'UPDATE_RECORDS', records: data});
                    setIsUpdate(!isUpdate);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
        });
        return unsubscribe;
    }, [props.navigation]);

    const onFastAddPress = () => {
        let dateRaw = new Date();
        let newRecord = {
            parachuteID: props.globalState.user['parachuteID'], 
            categoryID: props.globalState.user['categoryID'], 
            dropzoneID: props.globalState.user['dropzoneID'], 
            planeID: props.globalState.user['planeID'], 
            date: date2USformat(`${dateRaw.getDate()}/${dateRaw.getMonth() + 1}/${dateRaw.getFullYear()}`), 
            altitude: props.globalState.user['altitude'], 
            timeFreeFall: altitude2seconds(props.globalState.user['altitude']), 
            cutaway: false, 
            note: '',
        };

        addRecord({
            token: props.globalState.token,
            record: newRecord,
            success: (data) => {
                props.dispatch({type: 'UPDATE_RECORDS', records: data});
                setIsUpdate(!isUpdate);
            },
            fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
        });
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                // po stlaceni zaznamu sa naviguje do cesty recordsDetail a parameter cesty je kluc zaznamu
                onPress={() => { props.navigation.navigate('recordsDetail', {record: item}); }}
            >
                <View style={styles.recordsItem}>
                    { /* ABSOLUTNE POZICIE begin */}
                    <Text style={[styles.text1, {position: 'absolute', top: 5, left: 10}]}>#{item['jumpNumber']}</Text>
                    <Text style={{position: 'absolute', top: 10, right: 10}}>{date2SKformat(item['date'])}</Text>
                    <Text style={{position: 'absolute', bottom: 10, right: 10}}>{item['dropzoneTitle']}</Text>
                    {item['cutaway'] == 1 && <FontAwesome name={'cut'} size={18} color={styleColors.red} style={{position: 'absolute', bottom: 10, left: 10}}/>}
                    { /* ABSOLUTNE POZICIE end */}
                    { /* INFO O ZOSKOKU begin */}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                        <MaterialIcons name={'category'} size={18} color={'black'}/>
                        <Text style={{marginLeft: 5}}>{item['categoryTitle']}</Text>
                        <FontAwesome style={{marginLeft:30}} name="info-circle" size={18} color="black"/>
                        <Text style={{marginLeft: 5}}>{`${item['altitude']}m  ${item['timeFreeFall']}s`}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="parachute" size={18} color={'black'}/>
                        <Text style={{marginLeft: 5}}>{item['parachuteTitle']}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                        <MaterialCommunityIcons name={'airplane'} size={18} color={'black'} />
                        <Text style={{marginLeft: 5}}>{item['planeTitle']}</Text>
                    </View>
                    { /* INFO O ZOSKOKU end */}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle='light-content'/>
            {/* ZOZNAM ZAZNAMOV begin */}
            <FlatList
                inverted={true}
                extraData={isUpdate}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}  // aby isiel odhora (je inverted)
                ref={flatList}
                data={props.globalState.records}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onScroll={({nativeEvent}) => {
                    // ak je nascrollovane viac ako o 10 pixelov tak sa zobrazi sipka dole
                    if (nativeEvent.contentOffset.y > 10) {
                        setIsScrolled(true);
                    } else {
                        setIsScrolled(false);
                    }
                }}
            />
            {/* ZOZNAM ZAZNAMOV end */}
            {/* MIESTO PRE TLACITKA begin */}
            <View style={{alignSelf: 'stretch'}}>
                <TouchableOpacity
                    onPress={onFastAddPress}
                    style={{alignSelf: 'center', margin: 10}}>
                    <Ionicons name="add-circle-sharp" size={70} color={styleColors.mainColor} />
                </TouchableOpacity>
                <ScrollDownButton
                    flatList={flatList}
                    isVisible={isScrolled}
                    bottom={50}
                    right={10}
                    size={40}
                    color={styleColors.mainColor}
                />
            </View>
            {/* MIESTO PRE TLACITKA end */}
        </View>
    );
}

const Records = connect(state => ({ globalState: state }))(RecordsContainer);

export {Records};