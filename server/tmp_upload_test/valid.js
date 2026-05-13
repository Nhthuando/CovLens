// sample.js
function simple(x, y) {
    return x + y;
}

function withIf(x) {
    if (x > 0) {
        return x;
    } else if (x < 0) {
        return -x;
    }
    return 0;
}

function withFor(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(i);
    }
}

function withForIn(obj) {
    for (const key in obj) {
        console.log(key);
    }
}

function withForOf(arr) {
    for (const item of arr) {
        console.log(item);
    }
}

function withWhile(x) {
    while (x > 0) {
        x--;
    }
}

function withDoWhile(x) {
    do {
        x--;
    } while (x > 0);
}

function withTernary(x) {
    return x > 0 ? x : -x;
}

function withLogical(x, y) {
    return x && y || false;
}

function withSwitch(type) {
    switch (type) {
        case 'a': return 1;
        case 'b': return 2;
        default: return 0;
    }
}

function withCatch(fn) {
    try {
        fn();
    } catch (e) {
        console.error(e);
    }
}