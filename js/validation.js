/*
validation : 인증함수??
조건을 정해서 만족하면 return true;
조건에 만족하지 않으면 return false;

판별하는 시점이 submit을 클릭할때
인증함수의 결과값이 하나라도 false라는게 나온다면 action으로 넘어가지 못하게
e.preventDefault(); 으로 막습니다 
모두 참이면 그때 action으로 이동
*/
const form = document.querySelector("#member")
const btnSubmit = document.querySelector("input[type=submit]");
let toggleBtn = document.getElementById("toggleBtn");
let pwd = document.querySelector("#pwd1");

btnSubmit.addEventListener("click", (e) => {
    //인증함수들을 거쳐서 ture혹은 false를 가지고 validation을 진행
    if (!isText("userid", 5)) e.preventDefault();
    if (!isText("comments", 20)) e.preventDefault();
    if (!isEmail("email")) e.preventDefault();

    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("hobby")) e.preventDefault();

    if (!isSelect("edu")) e.preventDefault();

    if (!isPwd("pwd1", "pwd2", 8)) e.preventDefault();

})


//1. type이 text인  form요소의 인증함수
function isText(el, len) {
    //만약 len이라는 초기값을 설정하지 않았을경우를 대비해서 오류를 사전대비하는 코드
    if (len === undefined) len = 5;

    let input = form.querySelector(`[name=${el}]`);
    //input태그중에 name이 userid인 대상을 특정이어서 해당 input에 value값을 추적할예정
    //input을 찾아서 해당 input에 사용자가 어떤 값을 작성하였는지 value를 가져와야합니다
    //input을 찾는데 어떤 input이냐면 name= 매개변수로 넣은 값을 찾는다는 것
    let txt = input.value;
    console.log(txt);
    //찾은 input의 안에 사용자가 적은 값을 변수로 저장합니다

    let ggg = input.closest("td");
    console.log(ggg);

    if (txt.length >= len) {
        //일단 에러메세지를 담은 p요소가 있는지는 판별합니다
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //있으면 제거합니다
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    } else {
        //에러메세지를 만들전에 에러메세지를 담은 p요소가 있는지를 판별합니다
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //있으면 바로 false를 return합니다
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
        input.closest("td").append(errMsg);
        return false;
    }
}

//2. type이 text인데 email인증함수
function isEmail(el) {
    let input = form.querySelector(`[name=${el}]`)
    let txt = input.value;

    //이메일인증함수 로직은 @이가 있는가??
    //    /@/.test(txt)   
    if (/@/.test(txt)) {
        const isErrMsg = input.closest("td").querySelectorAll('p');
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove()
        return true
    } else {
        const isErrMsg = input.closest("td").querySelectorAll("p")
        if (isErrMsg.length > 0) return false;


        const errMsg = document.createElement('p');
        errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
        input.closest("td").append(errMsg)
        return false
    }

}
//3. checkbox인증함수
function isCheck(el) {
    let input = form.querySelectorAll(`[name=${el}]`)
    let isCheck = false;

    //check가 되어있는지는 추적하는 코드 ,  하나라도 체크가 되어있다면??
    for (let el of input) {
        if (el.checked) isCheck = true;
    }

    if (isCheck) {
        const isErrMsg = input[0].closest("td").querySelectorAll("p")
        if (isErrMsg.length > 0) input[0].closest("td").querySelector("p").remove()
        return true
    } else {
        const isErrMsg = input[0].closest("td").querySelectorAll("p")
        if (isErrMsg.length > 0) return false

        const errMsg = document.createElement("P")
        errMsg.append("필수 입력 항목을 체크해주세요")
        input[0].closest("td").append(errMsg)
        return false
    }
}

//4. select 인증함수)

function isSelect(el) {
    let sel = form.querySelector(`[name=${el}`);
    let sel_index = sel.options.selectedIndex;
    //셀렉트 요소에 접근해서 자식요소인 option들 중에 선택이 되어진 index를
    //찾아서 해당인덱스 값을 변수로 담는다
    let val = sel[sel_index].value;

    if (val != "") {
        const isErrMsg = sel.closest("td").querySelectorAll("p")
        if (isErrMsg.length > 0) sel.closest("td").querySelector("p").remove()
        return true;
    } else {

        const isErrMsg = sel.closest("td").querySelectorAll("p")
        if (isErrMsg.length > 0) return false

        const errMsg = document.createElement("P")
        errMsg.append("항목을 선택해 주세요")
        sel.closest("td").append(errMsg)
        return false;
    }
}

/*
정규표현식????
-특정한 문자열 즉 개발자가 원하는 문자를 집합으로 표현하기 위해서 사용하는 형식언어
 /@/.test(txt) 정규식 중에 하나   
*/

//5. password인증함수 - 1

// function isPwd(el1, el2, len) {
//     let pwd1 = form.querySelector(`[name=${el1}]`)
//     let pwd2 = form.querySelector(`[name=${el2}]`)
//     let pwd1_val = pwd1.value
//     let pwd2_val = pwd2.value

//     //숫자, 문자(영어), 특수문자 조건을 정규표현식으로 변수로 저장합니다
//     const num = /[0-9]/;
//     const eng = /[a-zA-Z]/;
//     const spc = /[~!@#$%^&*()_+?><]/


//     /*
//     or 연산자
//     true || true = true
//     true || false = true 
//     false || false = false

//     and연산자
//     true && true = true
//     true && false = false
//     false && false = false
//     */


//     if (pwd1_val === pwd2_val && pwd1_val.length >= len && eng.test(pwd1_val) && num.test(pwd1_val) && spc.test(pwd1_val)) {
//         const isErrMsg = pwd1.closest("td").querySelectorAll("p");
//         if (isErrMsg.length > 0) pwd1.closest("td").querySelector("p").remove();

//         return true;
//     } else {
//         const isErrMsg = pwd1.closest("td").querySelectorAll("p");
//         if (isErrMsg.length > 0) return false;

//         const errMsg = document.createElement("p");
//         errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`);
//         pwd1.closest("td").append(errMsg);

//         return false
//     }

// }


//5. password인증함수 - 2
function isPwd(el1, el2, len) {
    let pwd1 = form.querySelector(`[name=${el1}]`)
    let pwd2 = form.querySelector(`[name=${el2}]`)
    let pwd1_val = pwd1.value
    let pwd2_val = pwd2.value

    //숫자, 문자(영어), 특수문자 조건을 정규표현식으로 변수로 저장합니다
    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?><]/

    const errMsgWrap = pwd1.closest("td");

    //오류메세지를 제거하는 함수
    function removeErrMsg() {
        const errMsg = errMsgWrap.querySelector("p");
        if (errMsg) {
            errMsg.remove();
        }
    }
    function OkErrMsg() {
        const errMsg = errMsgWrap.querySelector("span");
        if (errMsg) {
            errMsg.remove();
        }
    }
    //오류메세지를 추가하는 함수
    function addErrMsg(msg) {
        const errMsg = document.createElement("p");
        errMsg.textContent = msg;
        /*
        textContent : 내부에 컨텐츠를 넣는것 <- 가장 최신, 좋은 방법(최신브라우저만 가능)
        append로 text를 넣는것
        innerText로 text를 넣는 것
        innerHTML 로 넣는 것 <-- 최악의 단점 : 보안이 좋지 않음, 
                                validation을 사용할떄 사용금지, 
                                XCC(크로스 사이트 스크립팅)

        */
        errMsgWrap.append(errMsg);
    }
    function addOkMsg(msg) {
        const errMsg = document.createElement("span");
        errMsg.textContent = msg;
        errMsgWrap.append(errMsg);
    }
    if (pwd1_val === pwd2_val &&
        pwd1_val.length >= len &&
        eng.test(pwd1_val) &&
        num.test(pwd1_val) &&
        spc.test(pwd1_val)) {

        OkErrMsg()
        removeErrMsg();
        let ok = "확인되었습니다"
        addOkMsg(ok)
        return true;
    } else {
        OkErrMsg()
        removeErrMsg();

        let err = "비밀번호는 ";
        if (pwd1_val.length < len) {
            err += `${len}글자 이상,`
        }
        if (!num.test(pwd1_val)) {
            err += "숫자를 포함,"
        }
        if (!eng.test(pwd1_val)) {
            err += "영어를 포함,"
        }
        if (!spc.test(pwd1_val)) {
            err += "특수문자를 포함,"
        }


        err += "동일하게 입력하세요"
        addErrMsg(err);
        return false;
    }

}





toggleBtn.addEventListener("click", () => {
    //클릭했을때 password type을 text로 변경해서 비밀번호가 보이도록
    if (pwd.type === 'password') {
        pwd.setAttribute("type", "text");
        toggleBtn.classList.add("hide");
    } else {
        pwd.setAttribute("type", "password");
        toggleBtn.classList.remove("hide");
    }

})