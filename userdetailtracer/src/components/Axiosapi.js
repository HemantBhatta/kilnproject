import axios from 'axios'

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue)
    return cookieValue;
};

const csrftoken = getCookie('csrftoken');
console.log(process.env.REACT_APP_BASE_URL);

export default axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}/api`,
    headers: {
        'X-CSRFToken':csrftoken
    }
});

export {csrftoken}