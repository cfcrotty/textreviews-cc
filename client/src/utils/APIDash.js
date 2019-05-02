import axios from 'axios';

export default {
    getUserDashData: (userId, locationPhone) => {
        return axios.post('/dashboard', { userId, locationPhone });
    },
    getUserDashMonthlyData: (userId, locationPhone) => {
        return axios.post('/api/dashboardMonthly', { userId, locationPhone });
    },
    getUserDashInvalidData: (userId, locationPhone) => {
        return axios.post('/api/dashboardInvalid', { userId, locationPhone });
    }
}

