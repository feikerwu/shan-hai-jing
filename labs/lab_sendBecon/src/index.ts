function reportWithXHR(flag: boolean, data: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/report', flag);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(data);
}

function reportWithImage(data: string) {
  let img = new Image();
  img.src = `http://localhost:3000/report?data${data}`;
}

function reportWithBeacon() {
  let data = new FormData();
  data.append('type', 'beacon');
  navigator.sendBeacon(`http://localhost:3000/report`, data);
}

// window.onunload = () => {};

window.addEventListener(
  'beforeunload',
  function(event) {
    const now = +new Date();
    let count = 0;
    // 阻塞 100s
    while (+new Date() - now <= 100000) {
      // console.log('here');
      count++;
    }
    reportWithXHR(
      false,
      JSON.stringify({
        closedTime: +new Date(),
        type: 'xhr'
      })
    );
    reportWithBeacon();
  },
  {
    passive: true
  }
);
