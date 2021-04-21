import React from 'react';
import {Alert} from 'react-native';
import { call } from 'react-native-reanimated';
import {URL} from '../constants';

const getFromServer = ({url, headers, callback}) => {
    return (
        fetch(url, {method: 'GET', headers: headers})
            .then(response => {
                let statusCode = response.status;
                let data = null;
                if (statusCode == 200) {
                    data = response.json();
                }
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => callback(status, data))
            .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
    );
}

const postToServer = (url, sendData, headers, callback) => {
    return (
        fetch(url, {
            method: 'POST',
            headers: {
                ...headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
        })
            .then(response => {
                let statusCode = response.status;
                let data = null;
                if (statusCode == 200) {
                    data = response.json();
                }
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => callback(status, data))
            .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
    );
}

const putToServer = (url, sendData, headers, callback) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData)
    })
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => callback(status, data))
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
}

const deleteFromServer = (url, sendData, headers, callback) => {
    fetch(url, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData)
    })
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => callback(status, data))
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
}


const signInUser = ({email, password, success, fail}) => {
    getFromServer({
        url: `${URL}/token?email=${email}&password=${password}`, 
        callback: (status, data) => {
            if (status == 200) {
                success(data['token']);
            } else {
                fail(status);
            }
        }
    });
}

const getUserData = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/user`, 
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const updateUserData = ({token, userData, success, fail}) => {
    putToServer(`${URL}/user`, {user: userData}, {'Authorization': token}, (status, data) => {
        if (status == 200) {
            success(data);
        } else {
            fail();
        }
    });
}

const getParachutes = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/parachute`,
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const getCategories = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/category`,
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const getDropzones = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/dropzone`,
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const getPlanes = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/plane`,
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const updateAsset = ({token, asset, success, fail}) => {
    putToServer(`${URL}/asset`, {asset: asset}, {'Authorization': token}, (status, data) => {
        if (status == 200) {
            success(data);
        } else {
            fail();
        }
    });
}

const getRecords = ({token, success, fail}) => {
    getFromServer({
        url: `${URL}/record`,
        headers: {'Authorization': token},
        callback: (status, data) => {
            if (status == 200) {
                data.sort((a, b) => b['jumpNumber'] - a['jumpNumber']);
                success(data);
            } else {
                fail();
            }
        } 
    });
}

const addRecord = ({token, record, quantity, success, fail}) => {
    postToServer(`${URL}/record`, {record: record, quantity: quantity}, {'Authorization': token}, (status, data) => {
        if (status == 200) {
            data.sort((a, b) => b['jumpNumber'] - a['jumpNumber']);
            success(data);
        } else {
            fail();
        }
    })
}

const updateRecord = ({token, record, success, fail}) => {
    putToServer(`${URL}/record`, {record: record}, {'Authorization': token}, (status, data) => {
        if (status == 200) {
            success(data);
        } else {
            fail();
        }
    });
}

const deleteRecord = ({token, record, success, fail}) => {
    deleteFromServer(`${URL}/record`, {id: record.id}, {'Authorization': token}, (status, data) => {
        if (status == 200) {
            success(data);
        } else {
            fail();
        }
    });
}

export {
    getFromServer, postToServer, putToServer, signInUser, getUserData, updateUserData, 
    getParachutes, getCategories, getDropzones, getPlanes,
    updateAsset, 
    getRecords, addRecord, updateRecord, deleteRecord};