; (function () {
    'use strict';

    let structure = {
        username: '用户名',
        email: '邮箱',
        balance: '余额',
    };

    let list = [
        {
            username: 'whh',
            email: 'whh@gmail.com',
            balance: 100,
        },
        {
            username: 'lsd',
            email: 'lsd@gmail.com',
            balance: 102,
        },
    ];

    let actions =  {
        yo(){
            console.log('Yo');
        },
    };


    let form = document.querySelector('form');
    let bf = biaoForm('form');
    let bt = biaoTable('table', structure, list, actions);

    form.addEventListener('submit', e => {
        e.preventDefault();
        let b = bf.getData();
        console.log(b);
    })
    
})();