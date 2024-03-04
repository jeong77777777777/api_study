async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

async function getProducts(pages, codename) {
  const url = `http://openapi.seoul.go.kr:8088/7072417a66666e7336314f6b6b7352/json/culturalEventInfo/${
    pages * 4 - 3
  }/${pages * 4}/${codename}`;

  // 요청시작위치 : 1페이지를 누르면 1~4, 2페이지를 누르면 5~8 등 으로 나오도록하는 과정
  // 페이지*4 -3 = 요청시작위치
  // 페이지*4 = 요청종료위치
  // 라는 수열 결론이 나옴
  // 1 = 1 2 3 4
  // 2 = 5 6 7 8
  // 3 = 9 10 11 12 에서 첫번째 1, 5, 9의 규칙은 page값의 +3, +6, +9 등 3의 배수
  // 발견하여 page = a, 요청시작위치 = x라 할 때 +되는 값이 x= 3(a-1)임
  // 따라서, 이렇게 됨

  try {
    // 데이터 요처 및 응답 시도 : 성공일 경우 첫번째 코드 블럭으로 이동
    const data = await getRequest(url);
    // console.log(data);

    const eventIdx = [0, 1, 2, 3];
    // const eventIdx = arr.indexOf(data.culturalEventInfo.row);
    const eventBoxWrapper = document.querySelector('.event-list');
    eventBoxWrapper.innerHTML = '';

    // console.log(data.culturalEventInfo.row);

    // const mainImgEl = `<img src=${data.culturalEventInfo.row.MAIN_IMG}>`;

    eventIdx.forEach((event) => {
      // console.log(event);
      eventData = data.culturalEventInfo.row[event];
      console.log(eventData);

      const mainEventEl = `
      <a href="detail.html?TITLE=${eventData.TITLE}" alt={}>
      <div class="event-box">
      <div class="img-box">
      <img src=${eventData.MAIN_IMG}>
      </div>
       <div class="info-list">
      <p class="title">${eventData.TITLE}</p>
      <p class="time">${eventData.PLACE}</p>
      <p class="fee">${eventData.IS_FREE}</p>
         </div></div></a>`;

      eventBoxWrapper.insertAdjacentHTML('beforeend', mainEventEl);
    });

    // imgBoxWrapper.insertAdjacentHTML('beforeend', mainImgEl);
  } catch (error) {
    // 실패할 경우 두번째 코드 블럭으로 이동
    console.log('Error : ', error);
  }
}
const pageBtns = document.querySelectorAll('.page button');
const category = document.getElementById('category');
// const categoryBtns = document.querySelectorAll('option');
category.addEventListener('change', function () {
  let selectValue = category.options[category.selectedIndex].value;
  getProducts(1, selectValue);
});

pageBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const thisBtn = Number(this.textContent);
    getProducts(thisBtn, '');
  });
});

category.addEventListener('change', function () {
  pageBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const thisBtn = Number(this.textContent);
      let selectValue = category.options[category.selectedIndex].value;
      // console.log(selectValue);
      getProducts(thisBtn, selectValue);
    });
  });
});

getProducts(1, '');
