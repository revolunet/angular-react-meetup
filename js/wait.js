
module.exports =function wait(duration, cb) {
    duration = duration || 1;
    var start = new Date(),
        now = new Date();
        x = 0;
    while (now-start < duration) {
        x++;
        now = new Date();
    }
    if (cb) {
        cb();
    }
}
