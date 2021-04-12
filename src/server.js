import React from 'react';
import {Alert} from 'react-native';

const getFromServer = (url, callback) => {
    return (
        fetch(url, {method: 'GET'})
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

const postToServer = (url, sendData, callback) => {
    return (
        fetch(url, {
            method: 'POST',
            headers: {
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

export {getFromServer, postToServer};