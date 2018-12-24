biaoPage.boot({
    selector: '.footer',
    amount: 50,
    limit: 10,
    currentPage: 2,
    onChange(page,state) {
        console.log(page);
    },
});


biaoPage.boot({
    selector: '#a',
    amount: 100,
    limit: 15,
    currentPage: 3,
    onChange(page,state) {
        console.log(page);
    },
});



biaoPage.boot({
    selector: '#b',
    amount: 100,
    limit: 20,
    currentPage: 1,
    onChange(page,state) {
        console.log(page);
    },
});