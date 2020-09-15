function reportWithXHR(flag, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/report', flag);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(data);
}
function reportWithImage(data) {
    var img = new Image();
    img.src = "http://localhost:3000/report?data" + data;
}
window.addEventListener('beforeunload', function () {
    console.log('1234');
    return '123';
});
window.addEventListener('unload', function () {
    reportWithXHR(false, JSON.stringify({
        closedTime: +new Date(),
        type: 'xhr'
    }));
    var now = +new Date();
    // 阻塞2s
    while (+new Date() - now <= 100000) { }
});
