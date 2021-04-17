import React from 'react';
import {Alert} from 'react-native';
import { call } from 'react-native-reanimated';

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
    //callback(200, null);
}


export {getFromServer, postToServer, putToServer};