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
    _get({url: '/modules/authorization.html'}, function(responseText) {
        content.innerHTML=responseText
        onloadPageAuth()
    })
}

 function onloadPageAuth() {
    document.querySelector('.btn').addEventListener('.click', function() {
        let request_data = new FormData()
        request_data.append('fam', document.querySelector('input[name="fam"]').value)
        request_data.append('name', document.querySelector('input[name="name"]').value)
        request_data.append('Email', document.querySelector('input[name="Email"]').value)
        request_data.append('password', document.querySelector('input[name="password"]').value)
        let xhr = new XMLHttpRequest();
        request_data.append('token', token)
        xhr.open('POST', `${host}/user/`)
        xhr.send(request_data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(this.responseText);
                if (xhr.status == 200) {
                    onloadPageAuth()
                }
                if (xhr.status == 401) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
        }
    })
}

