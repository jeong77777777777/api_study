async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

async function getProducts() {
  const url = `http://openapi.seoul.go.kr:8088/7072417a66666e7336314f6b6b7352/json/culturalEventInfo/1/5/`;

  try {
    // 데이터 요처 및 응답 시도 : 성공일 경우 첫번째 코드 블럭으로 이동
    const data = await getRequest(url);
    console.log('Data:', data);
  } catch (error) {
    // 실패할 경우 두번째 코드 블럭으로 이동
    console.log('Error : ', error);
  }
}

getProducts();
