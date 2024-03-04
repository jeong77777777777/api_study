// // 현재 주소창의 URL을 가져옵니다.
const currentUrl = window.location.href;

// // URL에서 query string을 추출합니다.
const queryString = currentUrl.split('?')[1];

// query string을 파싱하여 객체로 변환합니다.
const queryParams = new URLSearchParams(queryString);

// TITLE의 값을 가져옵니다.
const titleValue = queryParams.get('TITLE');

// 가져온 TITLE 값을 출력합니다.
console.log('TITLE 값:', titleValue);

async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

async function getDetails() {
  const url = `http://openapi.seoul.go.kr:8088/7072417a66666e7336314f6b6b7352/json/culturalEventInfo/1/1/%20/${titleValue}`;

  try {
    // 데이터 요처 및 응답 시도 : 성공일 경우 첫번째 코드 블럭으로 이동

    const data = await getRequest(url);
    console.log(data);

    const infoWrapper = document.querySelector('.main-info');
    const dataInfo = data.culturalEventInfo.row[0];

    const infoEl = `<div class="img-box">
    <img src="${dataInfo.MAIN_IMG}" alt="" />
  </div>
<div class="info">
<div class="info-name">
<p class="guname">자치구</p>
<p class="datename">날짜</p>
<p class="placename">장소</p>
<p class="usertrgtname">연령</p>
<p class="rgstdatename">신청일</p>

</div>
  <div class="info-box">
    <p class="gu">${dataInfo.GUNAME}</p>
    <p class="date">${dataInfo.DATE}</p>
    <p class="place">${dataInfo.ORG_NAME}</p>
    <p class="usertrgt">${dataInfo.USE_TRGT}</p>
    <p class="rgstdate">${dataInfo.RGSTDATE}</p>
  </div></div>
  <div class="homepage">
    <p class="hp">홈페이지</p>
    <a href="${dataInfo.HMPG_ADDR}">바로가기</a>

  </div>`;

    infoWrapper.insertAdjacentHTML('beforeend', infoEl);
  } catch (error) {
    // 실패할 경우 두번째 코드 블럭으로 이동
    console.log('Error : ', error);
  }
}

getDetails();
