document.getElementById("student_number").addEventListener("input", function() {
    this.setCustomValidity(this.validity.patternMismatch ? "학번은 5자리 숫자만 입력하세요." : "");
});

document.getElementById("student_name").addEventListener("input", function() {
    this.setCustomValidity(this.validity.patternMismatch ? "이름은 한글 2-4자만 입력하세요." : "");
});

document.getElementById("phone_number").addEventListener("input", function() {
    this.setCustomValidity(this.validity.patternMismatch ? "전화번호는 11자리 숫자만 입력하세요." : "");
});

function minus(s) {
    label = document.getElementById(s)
    if(label.innerText <= 0) 
        label.innerText = 0
    else
        label.innerText -= 1
}

function plus(s) {
    label = document.getElementById(s)
    cnt = parseInt(label.innerText, 10)
    if(cnt < 2)
        label.innerText = cnt + 1
    else
        alert("1인당 최대 2개까지 주문 가능합니다.")
}

function orderMenu() {
    const inputFields = document.querySelectorAll('input[required]');
    let allValid = true;

    inputFields.forEach(input => {
        if (!input.checkValidity()) {
            allValid = false;
            input.reportValidity(); // 유효성 검사 메시지 표시
        }
    });

    if(allValid) {
        fruitSaladNum = document.getElementById("fruitSalad").innerText;
        sandwichNum = document.getElementById("sandwich").innerText;
        fruitJuiceNum = document.getElementById("fruitJuice").innerText;
        studentNumber = document.getElementById("student_number").value;
        studentName = document.getElementById("student_name").value;
        phoneNumber = document.getElementById("phone_number").value;
        pDate = document.querySelector('input[name="option"]:checked').value;
        console.log(pDate)
        menuText = "과일샐러드 : " + fruitSaladNum + "\n샌드위치 : " + sandwichNum + "\n생과일주스 : " + fruitJuiceNum
        menu = fruitSaladNum+fruitJuiceNum+sandwichNum
        orderer = studentNumber + " / " + studentName + " / " + phoneNumber;
        
        var result = confirm("주문하시겠어요 ?");
            
        if(result)
        {
            console.log("주문 : \n" + menu + "\n" + orderer);
            alert("주문되었습니다.");
            url = location.href + "reserve?snum="+studentNumber+"&sname="+studentName+"&pnum="+phoneNumber+"&menu="+menu+"&date=11/5";
            location.href = url;
        }
        else
        {
            console.log("취소");
            alert("취소되었습니다.");
        }
    }
}

function inquir() {
    alert("010-4041-8691로 문의 주세요");
}