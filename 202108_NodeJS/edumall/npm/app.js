var _ = require('lodash');

var arr = [];
var other = _.concat(arr, 2, [3], [[4, 5]]);
console.log(other);

// Collection
var users = [
    { "user": "Tung", "age": 30, "active": true},
    { "user": "Meo", "age": 29, "active": true},
    { "user": "Jun", "age": 1, "active": true}
]
var user = _.find(users, function(user) {
    return user.age < 30;
});
console.log(user);

var user2 = _.filter(users, function(user) {
    return user.age < 30;
});
console.log(user2);

