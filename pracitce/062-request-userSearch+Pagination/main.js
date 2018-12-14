biaoPage.boot({
    selector: '.footer',
    amount: 1000,
    limit: 10,
    onChange(page) {
        console.log(page);
    },
});

biaoPage.render();
