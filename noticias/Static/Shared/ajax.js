'use strict';

class AjaxRequest {
    constructor(location, action) {
        this.location = location;
        this.action = action;
    }

    send(method, data) {
        if (!method) {
            throw 'method not set, use: get, post, put, patch, delete';
        }
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, '/' + this.location + '/' + this.action, true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    const res = (this.response && typeof this.response == 'string') ? JSON.parse(this.response) : this.response;
                    resolve(res);
                } else {
                    const errorText = document
                        .createRange()
                        .createContextualFragment(request.responseText)
                        .querySelector('i')
                        .innerText;
                    reject(errorText);
                }
            }
            request.onerror = error => reject(error);
            request.send(JSON.stringify(data) || null);
        });
    }

    get(data) {
        return this.send('GET', data);
    }
    post(data) {
        return this.send('POST', data);
    }
    put(data) {
        return this.send('PUT', data);
    }
    patch(data) {
        return this.send('PATCH', data);
    }
    delete(data) {
        return this.send('DELETE', data);
    }
}
