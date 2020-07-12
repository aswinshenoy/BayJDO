import { toast } from 'react-toastify';

export default (type, message) => {
    const config = {
        autoClose: 1000, hideProgressBar: true, closeButton: false,
        position: toast.POSITION.BOTTOM_CENTER,
    };
    if(type === 'error') toast.error(message, config);
    else if(type === 'success') toast.success(message, config);
};
