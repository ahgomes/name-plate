let pg_body = document.querySelector('body');

let left = document.createElement('ul');
left.classList.add('notify', 'left');
pg_body.appendChild(left);

let center = document.createElement('ul');
center.classList.add('notify', 'center');
pg_body.appendChild(center);

let right = document.createElement('ul');
right.classList.add('notify', 'right');
pg_body.appendChild(right);


class Notification {
    constructor(message, type, location, rude, btnName, yesAct, noAct, btnAct, submitAct) {
        this.message = message || '<b>Error</b>';
        this.type = type || 'text';
        this.location = location || 'right';
        this.rude = rude;
        this.btnName = btnName || '';
        this.yesAct = yesAct || '';
        this.noAct = noAct || '';
        this.btnAct = btnAct || '';
        this.submitAct = submitAct || '';

        this.note = document.createElement('li');
        this.note.classList.add(this.type);
        if(this.rude) this.note.classList.add('rude');

        switch (this.type) {
            case 'text':
                this.note.innerHTML = '<b>' + this.message + '</b>';
                break;
            case 'btn':
                this.note.innerHTML = '<b>' + this.message + '</b>' +
                '<button onclick="' + this.btnAct + '">'
                    + this.btnName +
                '</button>';
                break;
            case 'yesorno':
                this.note.innerHTML = (!this.rude) ?
                '<b>' + this.message + '</b>' +
                '<button class="no" onclick="' + this.noAct + '">no</button>' +
                '<button class="yes" onclick="' + this.yesAct + '">yes</button>'
                :
                '<b>' + this.message + '</b>' +
                '<button class="yes" onclick="' + this.yesAct + '">yes</button>'
                + '<button class="no" onclick="' + this.noAct + '">no</button>';
                break;
            case 'typeable':
                this.note.innerHTML = '<b>' + this.message + '</b>' +
                '<br>' +
                '<input type="text" value="" placeholder="Type here" onkeypress="if(event.keyCode == 13){' + this.submitAct + ';}" autocomplete="off">' +
                '<button onclick="' + this.submitAct + '">submit</button>';
                break;
        }
    }

    show() {
        document.querySelector('.' + this.location).insertBefore(this.note, document.querySelector('.' + this.location).childNodes[0]);
    }

    animate(open) {
        if (!open) {
            this.note.style.transform = 'rotate(0) scale(1)';
            this.note.style.webkitTransform = 'rotate(0) scale(1)';
        } else {
            this.note.style.webkitTransform = 'rotate(0) scale(0.5)';
            this.note.style.opacity = '0';
        }
    }

    dismiss() {
        this.note.remove();
    }

}

function notify(o) {
    let note = new Notification(o.message, o.type, o.location, o.rude, o.btnName, o.yesAct, o.noAct, o.btnAct, o.submitAct);
    note.show();
    setTimeout(function() {
        note.animate(false);
    }, 10);

    if(o.end !== undefined) {
        setTimeout(function() {
            note.animate(true);
            setTimeout(function() {
                note.dismiss();
            }, 410);
        }, o.end);
    }
}

function yes(el, state) {
    el.style.transform = 'rotate(0) scale(0.5)';
    el.style.opacity = '0';
    setTimeout(function() {
        el.remove();
        script(state);
    }, 410);

}

function no(el, state) {
    el.style.transform = 'rotate(0) scale(0.5)';
    el.style.opacity = '0';
    setTimeout(function() {
        el.remove();
        script(state);
    }, 410);

}

function submit(el) {
    let helpTxt = el.childNodes[2].value;
    el.style.transform = 'rotate(0) scale(0.5)';
    el.style.opacity = '0';
    setTimeout(function() {
        el.remove();
        notify({
            message: 'Is this what you want? :<br><i>"' + helpTxt + '"</i>',
            type: 'yesorno',
            yesAct: 'yes(this.parentNode, 3)',
            noAct: 'no(this.parentNode, 4)'
        });
    }, 410);
}
