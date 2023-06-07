let selectedMoney
const mykey1 = 'KEY1'
const mykey2 = 'KEY2'
const areaUrl = 'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/AllData.json';
const locationUrl = 'https://raw.githubusercontent.com/yang87924/JsonDB/main/ATM.json';
// let map      這是因為google map的地圖放在html
let markers = []
// async function fetchLocation(complete) {
//     await fetch(locationUrl)
//         .then(response => response.json())
//         .then(datas => {
//             complete(datas)
//         })
// }
// function geoLocation(latitude, longitude) {
//     let lat = parseFloat(latitude)
//     let lng = parseFloat(longitude)
//     return { lat, lng }
// }

// function initMap() {
//     const taiwan = { lat: 23.975126479012527, lng: 120.9795655805013 };
//     const map = new google.maps.Map($('#map')[0], {
//         zoom: 7,
//         center: taiwan,
//         mapId: '4509fb7061beb415'
//         //   Google規定要放的map id
//     });

//     //調整紅色標籤的大小顏色與加入數字(aqi)
//     fetchLocation(function (records) {
//         records.forEach(function (datas) {
//             const pinViewScaled = new google.maps.marker.PinView({
//                 scale: 0.8,
//                 // glyph: datas.所屬銀行簡稱,
//                 //放上字
//             });

//             //冒號前的都是功能(不能改)後接變數
//             //加入字串
//             const marker = new google.maps.marker.AdvancedMarkerView({
//                 position: geoLocation(datas.座標Y軸, datas.座標X軸),
//                 map: map,
//                 title: datas.所屬銀行簡稱,
//                 // label: record.aqi
//                 content: pinViewScaled.element,
//                 //把樣式加載上去
//             });
//         })
//     })
// }
// 
// function showMark(datas,place) {
//     // const taiwan = { lat: 23.975126479012527, lng: 120.9795655805013 };
//     // const map = new google.maps.Map($('#map')[0], {
//     //     zoom: 7,
//     //     center: taiwan,
//     //     mapId: '4509fb7061beb415'
//     //     //   Google規定要放的map id
//     // });
//     datas.forEach(function (record) {
//         const pinViewScaled = new google.maps.marker.PinView({
//             scale: 0.8,
//             // glyph: record.aqi,
//             // background: getColor(record.aqi)
//         });
//         const marker = new google.maps.marker.AdvancedMarkerView({
//             position: place,
//             map: map,
//             // title: record.county + record.sitename,
//             // label: record.aqi
//             content: pinViewScaled.element,
//             //把樣式加載上去
//         });
//     })
// }
function initMap() {
    const taiwan = { lat: 23.975126479012527, lng: 120.9795655805013 };
    map = new google.maps.Map($('#map')[0], {
        zoom: 7,
        center: taiwan,
        mapId: '4509fb7061beb415'
        //   Google規定要放的map id

    });
}
window.onload = function () {
    fetch(locationUrl)
        .then(response => response.json())
        .then(datas => {
            fetch(areaUrl)
                .then(response => response.json())
                .then(data => {
                    const countySelect = document.getElementById('county');
                    const areaSelect = document.getElementById('area');
                    const submitButton = document.getElementById('submit');
                    const resultDiv = document.getElementById('result');
                    const locationSelect = document.getElementById('location');

                    //111
                    // 產生縣市選單
                    data.forEach(item => {
                        const countyOption = document.createElement('option');
                        countyOption.value = item.CityName;
                        countyOption.text = item.CityName;
                        countyOption.style = "background-color: white; font-size:30px;";
                        countySelect.add(countyOption);
                    });

                    // 當縣市選項改變時，動態產生區域選單
                    countySelect.addEventListener('change', () => {
                        const selectedCounty = countySelect.value;
                        // 先清空區域選單的內容
                        areaSelect.innerHTML = '<option value="" style="background-color: white;">請選擇行政區</option>';

                        // 根據所選擇的縣市，產生相對應的區域選項
                        const areaList = data.find(item => item.CityName === selectedCounty).AreaList;
                        areaList.forEach(area => {
                            const areaOption = document.createElement('option');
                            areaOption.value = area.ZipCode;
                            areaOption.text = area.AreaName;
                            areaOption.style = "background-color: white; font-size:30px;";
                            areaSelect.add(areaOption);
                        });
                    });
                    areaSelect.addEventListener('change', () => {
                        // const selectedCounty = areaSelect.value;
                        // 先清空區域選單的內容並改變內容
                        locationSelect.innerHTML = '<option value="">請選擇分行</option>';

                        // 根據所選擇的縣市與區域產生相對應的分行
                        //  const areaList = data.find(item => item.CityName === selectedCounty).AreaList;
                        const selectedCounty = countySelect.value;
                        const selectedArea = areaSelect.value ? areaSelect.options[areaSelect.selectedIndex].text : '';
                        datas.forEach(items => {
                            if (items.所屬縣市 === selectedCounty && items.鄉鎮縣市別 === selectedArea) {
                                const itemsOption = document.createElement('option');
                                // console.log(items)
                                itemsOption.value = items.裝設地點
                                itemsOption.text = items.裝設地點
                                itemsOption.style = "background-color: white; font-size:30px;";
                                locationSelect.add(itemsOption);
                            }
                        })
                    });


                    locationSelect.addEventListener('change', function () {
                        selectedLocation = locationSelect.value;
                        datas.forEach(function (item) {
                            if (item.裝設地點 === selectedLocation) {

                                const latitude = item.座標Y軸
                                const longitude = item.座標X軸
                                let lat = parseFloat(latitude)
                                let lng = parseFloat(longitude)
                                let place = { lat: lat, lng: lng }
                                deleteMarkers()
                                showMark(place)

                            }
                        })
                    })
                    function deleteMarkers() {
                        setMapOnAll();
                        markers = [];
                    }
                    function setMapOnAll() {
                        for (let i = 0; i < markers.length; i++) {
                            markers[i].map = null;
                        }
                    }
                    function showMark(place) {
                        // 如果之前已經有標記，就更新它的位置
                        // const taiwan = { lat: 23.975126479012527, lng: 120.9795655805013 };
                        // const map = new google.maps.Map($('#map')[0], {
                        //     zoom: 7,
                        //     center: taiwan,
                        //     mapId: '4509fb7061beb415'
                        //     //   Google規定要放的map id
                        // });
                        // datas.forEach(function (record) {
                        const pinViewScaled = new google.maps.marker.PinView({
                            scale: 0.8,
                            // glyph: record.aqi,
                            // background: getColor(record.aqi)
                        });

                        const marker = new google.maps.marker.AdvancedMarkerView({
                            position: place,
                            map: map,
                            // title: datas.裝設地點,
                            // label: record.aqi
                            content: pinViewScaled.element,
                            //把樣式加載上去

                        });
                        markers.push(marker);
                        // })
                    }
                    window.initMap = initMap;
                    // 當按鈕點擊時，顯示選擇結果(偵查錯誤)
                    submitButton.addEventListener('click', (event) => {
                        const selectedCounty = countySelect.value;
                        const selectedArea = areaSelect.value ? areaSelect.options[areaSelect.selectedIndex].text : '';
                        //這個三元運算子的語法是 condition ? value1 : value2，其中 condition 是一個要被評估的條件，如果這個條件成立，就會回傳 value1，否則就會回傳 value2。
                        const selectedLocation = locationSelect.value;
                        if (!selectedCounty || !selectedArea || !selectedLocation) {
                            event.preventDefault();
                            alert('請確實選擇幣別、縣市、鄉鎮以及分行! 謝謝!');
                            return;
                        }

                    })
                })
        })
    let data = JSON.parse(obj)
    const moneySelect = document.getElementById('money');
    // const valDisplay = document.getElementById('currency');
    data.forEach(item => {
        const moneyOption = document.createElement('option');
        moneyOption.value = item.currency;
        moneyOption.text = item.currency;
        moneyOption.style = "background-color: white; font-size:30px;";
        moneySelect.add(moneyOption);
        // currency.innerHTML = item.val
    });
    moneySelect.addEventListener('change', function () {
        const selectedCurrency = moneySelect.value;
        data.forEach(item => {
            if (item.currency === selectedCurrency) {
                // valDisplay.value = item.val
                // valDisplay.text = item.val
                // const apple = valDispla
                matchedVal = item.val;

            }
        });

        moneySelect.addEventListener('change', () => {
            localStorage.clear()
            selectedMoney = moneySelect.value;
            valMatched = matchedVal;
            // currencyValue = apple.value
            // text2Value.innerHTML = selectedMoney;
            // window.location.href = "選擇面額.html";
            localStorage.setItem(mykey1, selectedMoney)
            localStorage.setItem(mykey2, valMatched)
            // localStorage.setItem(mykey2, currencyValue)
            // let text = localStorage.getItem(mykey1)
            // let text1 = localStorage.getItem(mykey2)
            // let titlemoney = document.getElementById("a")
            // titlemoney.innerHTML = text
            // console(text)
        })
        // var selectedValue = "";

        // function saveSelectedValue() {
        //     selectedValue = document.getElementById("money").value;
        //     window.location.href = "選擇面額.html";
        // }
    })
}

window.initMap = initMap;
