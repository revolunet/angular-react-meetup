var first = ['Anthony', 'Alexandre', 'Arielle', 'Véro', 'Claudine', 'Jean', 'Fred', 'Danny', 'Alexis', 'Guillaume', 'Rémi', 'Julien', 'Tony', 'Douglas', 'Olivier', 'Patrick', 'Raphaël', 'Camille', 'Emilie', 'Sophie', 'Céline', 'Audrey'];
var last = ['Daniel', 'Robert', 'Dubois', 'Dupont', 'Morob', 'Bucher', 'Machin', 'Truc', 'Delarue', 'Tranc', 'Lolipop', 'Marcadet', 'Baer', 'Malek'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function getRandomRangeInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createItem() {
    var item = {};
    item.id = data.length + 1;
    item.first = getRandomItem(first);
    item.last = getRandomItem(last);
    item.email = item.first.toLowerCase() + '@' + item.last.toLowerCase() + '.com';
    item.ddn = getRandomRangeInt(1970, 1990) + '/' + getRandomRangeInt(1, 12) + '/' + getRandomRangeInt(1, 30);
    return item;
}
var data = [],
    records = 1000;

for (var i=0; i<records;i++) {
    data.push(createItem());
}


module.exports = data;
