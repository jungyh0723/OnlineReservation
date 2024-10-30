document.addEventListener('DOMContentLoaded', async function() {
    console.log("content loaded")
    const reservationList = document.getElementById('reservation-list');

    try {
        // 모든 예약 정보를 가져오기
        const response = await fetch('/reserve/all');
        const reservations = await response.json();

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
                <button onclick="deleteOne(\'${reservation.sNum}\')">지우기 </button>
            </div>
            `;
            reservationList.appendChild(reservationItem);
        });
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
