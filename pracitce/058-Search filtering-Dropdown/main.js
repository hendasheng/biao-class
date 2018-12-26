let list = [
    {
        id: 1,
        name: '王花花',
    },
    {
        id: 2,
        name: '李拴蛋',
    },
    {
        id: 3,
        name: '赵可爽',
    },
];

biaoDrop.boot('main', list, {
    onSelect(it) {
        console.log(it);
    },
});