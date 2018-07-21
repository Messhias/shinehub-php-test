import Request from '../../utils/Request';

export default function GetSMS(id) {
    return Request.get(`/sms/${id}`);
}
