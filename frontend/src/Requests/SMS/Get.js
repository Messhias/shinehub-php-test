import Request from '../../utils/Request';

export default function GetCycle(id) {
    return Request.get(`/sms/${id}`);
}
