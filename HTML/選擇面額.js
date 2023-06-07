// const mykey1 = 'KEY1'
// const mykey2 = 'KEY2'
function apple() {
    let text = localStorage.getItem(mykey1)
    let text1 = localStorage.getItem(mykey2)
    // console.log(text)
    let titlemoney = document.getElementById("a")
    let blockmoney = document.getElementById("b")
    let valMatch = document.getElementById("currency")

    titlemoney.innerHTML = text
    blockmoney.innerHTML = text
    valMatch.innerHTML = text1
}
function banana() {
    document.getElementById("bn").onclick = function () {
        let text1 = parseInt(document.getElementById("text1").value)
        let taiwandollar = document.getElementById("taiwandollar")
        let text2 = parseFloat(document.getElementById("currency").innerHTML)
        console.log(text2)
        if (isNaN(text1) == false && text1 > 0 && isNaN(text2) == false) {
            taiwandollar.innerHTML = text1
            let result = text1 * text2
            console.log(result)
            document.getElementById("result").innerHTML = parseInt(result);
            if (parseInt(result) < 1000 || parseInt(result) > 10000000) {
                alert("應繳新台幣應為1000至1000萬!")
                // clearInput();
                document.getElementById('text1').value = ""
                document.getElementById('taiwandollar').innerHTML = ""
                document.getElementById('result').innerHTML = ""
            }
        } else {
            alert("請輸入正確的'數字'!")
            // clearInput();
            document.getElementById('text1').value = ""
            document.getElementById('taiwandollar').innerHTML = ""
            document.getElementById('result').innerHTML = ""
        }
    }
}
function orange() {
    const submitButton = document.getElementById('submit1');
    submitButton.addEventListener('click', (event) => {
        resultmoney = document.getElementById("result").innerHTML
        if (resultmoney < 1000) {
            alert('請確實填寫金額!');
            event.preventDefault();
        }
    })
}

