import axios from 'axios';

class HttpService {

    getFlightDetails(){
        let Url = 'data/flight.json';
    return  axios.get(Url);
    }

}

export default HttpService;