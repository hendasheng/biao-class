biaoPage.boot({
    // 选择器
    selector: '.footer',
    // 数量
    amount: 50,
    // 限制
    limit: 10,
    currentPage: 2,
    // 更改
    onChange(page,state) {
        console.log(page);
    },
});



// biaoPage.boot({
//     selector: '#a',
//     amount: 100,
//     limit: 15,
//     currentPage: 3,
//     onChange(page,state) {
//         console.log(page);
//     },
// });



// biaoPage.boot({
//     selector: '#b',
//     amount: 100,
//     limit: 20,
//     currentPage: 1,
//     onChange(page,state) {
//         console.log(page);
//     },
// });