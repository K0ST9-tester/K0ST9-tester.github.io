let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let tabsParent = document.querySelector('.inner'),
    tabsContent = document.querySelectorAll('.block-button'),
    tabsQuantity = document.querySelectorAll('.div-item-quantity'),
    tabsDecrease = document.querySelectorAll('.btn-decrease'),
    tabsIncrease = document.querySelectorAll('.btn-increase'),
    tabs = document.querySelectorAll('.btn');

let resultSuma = 0,
    itemQuantity = document.querySelectorAll('.p-item-quantity');

let data = {
    '0': 5,
    '1': 3.5,
    '2': 8,
    '3': 1.5,
    '4': 2.5,
    '5': 1
};


function showTabContent(elem) {
    tabs[elem].classList.add('hide');
    tabsContent[elem].classList.remove('hide');
    tabsQuantity[elem].classList.remove('hide');
};


function decreaseNumberOrder(elem) {
    let currentData = itemQuantity[elem],
        quantity = itemQuantity[elem].innerHTML;

    if (quantity > 0) {
        quantity = +quantity - 1;
        resultSuma -= data[elem];
    }

    currentData.innerHTML = quantity;
};


function increaseNumberOrder(elem) {
    let currentData = itemQuantity[elem],
        quantity = itemQuantity[elem].innerHTML;

    if (quantity < 99) {
        quantity = +quantity + 1;
        resultSuma += data[elem];
    };

    currentData.innerHTML = quantity;
};


tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.parentElement.classList.contains('item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                showTabContent(i);
                increaseNumberOrder(i);
                tg.MainButton.setText("Підтвердити");
                tg.MainButton.show();
            }
        });
    } else if (target && target.parentElement.classList.contains('block-button')) {
        tabsDecrease.forEach((item, i) => {
            if (target == item) {
                decreaseNumberOrder(i);
            }
        });
        tabsIncrease.forEach((item, i) => {
            if (target == item) {
                increaseNumberOrder(i);
            }
        });
    }
});

Telegram.WebApp.onEvent('mainButtonClicked', function(){
    tg.sendData(resultSuma);
});


