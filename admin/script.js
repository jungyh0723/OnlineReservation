document.addEventListener('DOMContentLoaded', async function() {
    console.log("content loaded")
    const reservationList = document.getElementById('reservation-list');

    try {
        // 모든 예약 정보를 가져오기
        const response = await fetch('/reserve/all');
        const reservations = await response.json();
        var fruit = 0;
        var lemonade = 0;
        var sandwhich = 0;
        // 예약 정보를 리스트에 추가
        reservations.forEach(reservation => {
            const reservationItem = document.createElement('div');
            reservationItem.innerHTML = `
            <div id="${reservation.sNum}">
                <h3>${reservation.sName} (학번: ${reservation.sNum})</h3>
                <p><strong>전화번호:</strong> ${reservation.pNum}</p>
                <p><strong>날짜:</strong> ${reservation.pDate}</p>
                <p><strong>메뉴:</strong></p>
                <ul>
                    <li>과일상자: ${reservation.sMenu.fruit}</li>
                    <li>레모네이드: ${reservation.sMenu.lemonade}</li>
                    <li>샌드위치: ${reservation.sMenu.sandwhich}</li>
                </ul>
                <p><strong>준비:</strong> ${reservation.prepared}</p>
                <p><strong>완료:</strong> ${reservation.served} </p>
                <div>
                    <button onclick="deleteOne(\'${reservation.sNum}\')">지우기 </button>
                    <button onclick="prepare(\'${reservation.sNum}\')"> 준비완료 </button>
                    <button onclick="serve(\'${reservation.sNum}\')"> 서빙완료 </button>
                <div>
                <label> ${reservation.sMenu.fruit*1500 + reservation.sMenu.lemonade*1000 + reservation.sMenu.sandwhich*1500} 원 </label>
            </div>
            `;
            reservationList.appendChild(reservationItem);
            if(!reservation.prepared) {
                fruit += reservation.sMenu.fruit;
                lemonade += reservation.sMenu.lemonade;
                sandwhich += reservation.sMenu.sandwhich;
            }
        });
        const fl = document.getElementById("fruitL");
        fl.innerText = "과일상자 : " + fruit + "  /  ";
        const ll = document.getElementById("lemonadeL");
        ll.innerText = "레모네이드 : " + lemonade + "  /  ";
        const sl = document.getElementById("sandwhichL");
        sl.innerText = "샌드위치 : " + sandwhich + "  /  ";
    } catch (error) {
        console.error("Error loading reservations:", error);
        reservationList.innerHTML = `<p style="color: red;">Failed to load reservations. Please try again later.</p>`;
    }
});

async function deleteOne(st) {
    const res = confirm("진짜로 삭제하시겠습니까?") 
    if(res) {
        console.log(st)
        result = await fetch("api/delete?sNum="+st, {method: 'DELETE'})
        console.log(result)
        document.getElementById(st).remove()
    } else {
        alert("취소되었습니다.")
    }
}

async function prepare(num) {
    const res = confirm("준비완료되었습니까?");
    if(res) {
        result = await fetch("api/prepare?sNum="+num, {method: 'POST'});
        document.getElementById(num).remove()
    } else {
        alert("취소되었습니다.")
    }
}

async function serve(num) {
    const res = confirm("서빙완료되었습니까?");
    if(res) {
        result = await fetch("api/serve?sNum="+num, {method: 'POST'});
        document.getElementById(num).remove()
    } else {
        alert("취소되었습니다.")
    }
}
