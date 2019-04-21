import React from 'react';
import axios from 'axios';

import 'babel-polyfill';

class WeatherApp extends React.Component {

    async componentDidMount() {
        console.log(1);
        const res = await axios.get('/weather');
        const a = res.data.forecasts;
        const b = a.map(({ parts: { day: { temp_avg } }}) => temp_avg);
        console.log(b);
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default WeatherApp;
