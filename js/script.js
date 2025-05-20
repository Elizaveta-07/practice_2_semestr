const HOST = 'http://api-messenger.web-srv.local';
let TOKEN=''
const content = document.querySelector('.content')

function _get(params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('GET', `${params.url}`);
    http_request.send();
    http_request.onreadystatechange = function (){
        if (http_request.readyState == 4) {
            callback(http_request.responseText)
        }
    }
}

function _post(params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('POST', `${params.url}`);
    http_request.send(params.data);
    http_request.onreadystatechange = function (){
         if (http_request.readyState == 4) {
            callback(http_request.responseText)
         }
    }
}


LoadPageAuth()

function LoadPageAuth() {
    _get({url: '/modules/registration.html'}, function(responseText) {
        content.innerHTML=responseText
        onloadPageAuth()
    })
}

 function onloadPageAuth() {
    document.querySelector('.btn_4').addEventListener('.click', function() {
        let request_data = new FormData()
        request_data.append('fam', document.querySelector('input[name="fam"]').value)
        request_data.append('name', document.querySelector('input[name="name"]').value)
        request_data.append('otch', document.querySelector('input[name="otch"]').value)
        request_data.append('email', document.querySelector('input[name="email"]').value)
        request_data.append('pass', document.querySelector('input[name="pass"]').value)
        let xhr = new XMLHttpRequest();
        request_data.append('token', TOKEN)
        xhr.open('POST', `${HOST}/user/`)
        xhr.send(request_data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(this.responseText);
                if (xhr.status == 200) {
                    LoadPageChat()
                }
                if (xhr.status == 401) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
        }
    })
}

function LoadPageChat() {
    _get({url: '/modules/chat.html'}, function(responseText) {
        content.innerHTML=responseText
    })
}