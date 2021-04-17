export const URL = 'https://skydivenotes.sk';

export const LICENSES = [
    {id: 1, value: 'Študent'}, 
    {id: 2, value: 'A'}, 
    {id: 3, value: 'B'}, 
    {id: 4, value: 'C'}, 
    {id: 5, value: 'D'}
];

export const WEIGHTS = [...Array(150).keys()].map((e) => ({id: e+1, value: e+1}));

export const ALTITUDES = [
    {id: 1, value: 800}, 
    {id: 2, value: 1200}, 
    {id: 3, value: 1500}, 
    {id: 4, value: 2000}, 
    {id: 5, value: 3000}, 
    {id: 6, value: 4000}
]; 