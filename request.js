async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

async function getProducts(codename) {
  const url = `http://openapi.seoul.go.kr:8088/7072417a66666e7336314f6b6b7352/json/culturalEventInfo/1/8/${codename}`;

  try {
    // 데이터 요처 및 응답 시도 : 성공일 경우 첫번째 코드 블럭으로 이동
    const data = await getRequest(url);
    // console.log(data);

    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    getRandom(0, 100);

    const eventIdx = [0, 1, 2, 3];
    // const eventIdx = arr.indexOf(data.culturalEventInfo.row);
    const eventBoxWrapper = document.querySelector('.event-list');

    // console.log(data.culturalEventInfo.row);

    // const mainImgEl = `<img src=${data.culturalEventInfo.row.MAIN_IMG}>`;

    eventIdx.forEach((event) => {
      // console.log(event);
      eventData = data.culturalEventInfo.row[event];

      const mainEventEl = `<div class="event-box">
      <div class="img-box">
      <img src=${eventData.MAIN_IMG}>
      </div>
       <div class="info-list">
      <p class="title">${eventData.TITLE}</p>
      <p class="time">${eventData.DATE}</p>
      <p class="fee">${eventData.IS_FREE}</p>
         </div></div>`;

      eventBoxWrapper.insertAdjacentHTML('beforeend', mainEventEl);
    });

    // imgBoxWrapper.insertAdjacentHTML('beforeend', mainImgEl);
  } catch (error) {
    // 실패할 경우 두번째 코드 블럭으로 이동
    console.log('Error : ', error);
  }
}

getProducts('국악');
