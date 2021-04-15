import {StyleSheet} from 'react-native';

const styleColors = {
    bgColor: '#ffffff',
    mainColor: '#3286ed',
    secondColor: '#ffffff',
    textColorContent: '#000000',
    textColorSpecial: '#ffffff',
    red: '#ff0000',
    green: '#00ff00',
    faded: '#cfcfcf',
    labelColor: '#afafaf'
};

const stackStyle = {
    headerStyle: {
        backgroundColor: styleColors.mainColor,
    },
    headerLeftContainerStyle: {
        paddingLeft: 10,
    },
    headerRightContainerStyle: {
        paddingRight: 10,
    },
    headerTintColor: styleColors.textColorSpecial,
    headerTitleStyle: {
        fontWeight: 'normal',
    },
};

const tabStyle = {
    activeTintColor: styleColors.mainColor,
    inactiveTintColor: styleColors.faded,
    style: {
        height: 60,
        paddingBottom: 5,
    }
};

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flex: 1,
        backgroundColor: styleColors.bgColor,
    },
    textError: {
        color: styleColors.red,
        fontSize: 14,
    },
    text1: {
        fontSize: 16,
        color: styleColors.textColorContent,
    },
    text2: {
        fontSize: 20,
        color: styleColors.textColorContent,
    },
    text3: {
        fontSize: 24,
        color: styleColors.textColorContent,
    },
    text4: {
        fontSize: 28,
        color: styleColors.textColorContent,
    },
    signInput: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: styleColors.faded,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: styleColors.textColorContent,
    },









    sideMenu: {
        width: 300,
        backgroundColor: styleColors.bgColor,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: styleColors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: styleColors.secondColor,
        padding: 30,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        elevation: 5,
    },
    profileJumpInfo: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    profileLicenseInfo: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    profileEditContainer: {
        alignSelf: 'stretch',
        marginTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: styleColors.secondColor,
        borderRadius: 15,
    },
    profilePersonalSettings: {
        alignSelf: 'stretch',
        marginHorizontal: 50,
        marginTop: 20,
    },
    personalItem: {
        display: 'flex',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 25,
        paddingLeft: 20,
        borderRadius: 8,
        marginVertical: 2,
        marginHorizontal: 5,
        backgroundColor: styleColors.secondColor,
    },
    editableRow: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
        marginHorizontal: 10,
    },
    textWhite1: {
        fontSize: 18,
        fontWeight: 'normal',
        color: styleColors.secondColor,
    },
    textWhite2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: styleColors.secondColor,
    },
    textWhite3: {
        fontSize: 30,
        fontWeight: 'bold',
        color: styleColors.secondColor,
    },
    label: {
        fontSize: 14,
        color: styleColors.labelColor,
    },
    recordsItem: {
        alignItems: 'flex-start',
        paddingTop: 25,
        paddingBottom: 10,
        paddingLeft: 40,
        borderRadius: 10,
        marginVertical: 2,
        marginHorizontal: 5,
        alignSelf: 'stretch',
        elevation: 5,
        backgroundColor: styleColors.secondColor,
    },
    recordsContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomModalView: {
        alignSelf: 'stretch',
        backgroundColor: styleColors.secondColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalView: {
        alignSelf: 'stretch',
        backgroundColor: styleColors.secondColor,
        margin: 30,
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
    },
});


export {styles, stackStyle, styleColors, tabStyle};
