import React from 'react';
import {Alert} from 'react-native';
import { call } from 'react-native-reanimated';
import {URL} from '../constants';


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
    fetch(`${URL}/token?email=${email}&password=${password}`, {method: 'GET'})
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => {
            if (status == 200) {
                success(data['token']);
            } else {
                fail(status);
            }
        })
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
}

const getData = ({route, token, success, fail}) => {
    fetch(`${URL}/${route}`, {method: 'GET', headers: {'Authorization': token},})
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }

        })
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]));
}

const updateData = ({route, token, sendData, success, fail}) => {
    fetch(`${URL}/${route}`, {method: 'PUT', headers: {'Authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(sendData)})
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        })
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]));
}

const getRecords = ({token, success, fail}) => { 
    fetch(`${URL}/record?limit=10`, {method: 'GET', headers: {'Authorization': token}})
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => {
            if (status == 200) {
                data.sort((a, b) => b['jumpNumber'] - a['jumpNumber']);
                success(data);
            } else {
                fail();
            }
        })
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
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
    fetch(`${URL}/record`, {method: 'PUT', headers: {'Authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(record)})
        .then(response => {
            let statusCode = response.status;
            let data = null;
            if (statusCode == 200) {
                data = response.json();
            }
            return Promise.all([statusCode, data]);
        })
        .then(([status, data]) => {
            if (status == 200) {
                success(data);
            } else {
                fail();
            }
        })
        .catch((err) => Alert.alert('Chyba!', 'Niečo sa pokazilo', [{text: 'Ok'}]))
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
    postToServer,
    signInUser, 
    getData, 
    updateData, 
    getRecords, 
    addRecord, 
    updateRecord, 
    deleteRecord
};