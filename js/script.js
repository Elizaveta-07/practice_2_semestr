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


    _post({url: '/modules/registration.html'}, function(responseText) {
        content.innerHTML=responseText
        onloadPageChat()
        
        OnLoadPageAuthReg()
    })


 function onloadPageChat() {
    document.querySelector('.btn_4').addEventListener('click', function() {
        let fdata = new FormData();
        fdata.append('fam', document.querySelector('input[name="fam"]').value)
        fdata.append('name', document.querySelector('input[name="name"]').value)
        fdata.append('otch', document.querySelector('input[name="otch"]').value)
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)

        let xhr = new XMLHttpRequest();
        fdata.append('token', TOKEN)
        xhr.open('POST', `${HOST}/user/`)
        xhr.send(fdata)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    LoadPageChat()
                }
                if (xhr.status == 422) {
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

function OnLoadPageAuthReg() {
    document.querySelector('.btn_2').addEventListener('click', function() {
        _post({url: '/modules/authorization.html'}, function(responseText) {
        content.innerHTML=responseText
        OnLoadPageAuth()
    })

    })
}

function OnLoadPageAuth() {
    document.querySelector('.btn_auth').addEventListener('click', function() {
         let fdata = new FormData();
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)

        let xhr = new XMLHttpRequest();
        fdata.append('token', TOKEN)
        xhr.open('POST', `${HOST}/auth/`)
        xhr.send(fdata)
        xhr.onreadystatechange = function() {
                if (xhr.status == 200) {
                    LoadPageChat()
                }
                if (xhr.status == 401) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            
        }
    })
}