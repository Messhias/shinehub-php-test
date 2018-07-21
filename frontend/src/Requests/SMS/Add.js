import Request from '../../utils/Request';

export default function AddSMS(data) {
    return Request.post(`/sms/`,{
        sms: data
    });
}
