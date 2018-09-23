var urlSite = document.location.href.toLowerCase();
var amountMultiplier;
var priceMultiplier;
var t;
  if (urlSite.indexOf('gogo') > -1) {
        fuckBgogo()
        window.setInterval(kickBgogo, 20 * 1000);
  }

  function kickBgogo(){
       cancelOrder()
       var timeToSleep = getRandomArbitrary(100,3200);
       console.log("timeToSleep: "+ timeToSleep)
       setTimeout(fuckBgogo,timeToSleep);
  }

  function fuckBgogo(){
    //    get market price
        ///
        var marketPriceSpan = document.getElementById("market-order-price");
        if(marketPriceSpan != null){
            var marketPrice = marketPriceSpan.innerText;
            console.log(marketPrice)
            //    fill market price in sell price order
            var sellPriceInput = document.getElementById("price19260818");
            var buyPriceInput = document.getElementById("price19260817");
            var availableSellBalance = document.getElementsByClassName("base-available clickable-balance")
            var availableBuyBalance = document.getElementsByClassName("quote-available clickable-balance")
            var sellAmountInput = document.getElementById("amount19260818");
            var buyAmountInput = document.getElementById("amount19260817")
            var ask1Price = document.getElementById("ask-1-price")
            var bid1Price = document.getElementById("bid-1-price")
            console.log("ask1Price:"+ ask1Price.innerHTML + " ; bid1Price:"+ bid1Price.innerHTML)
            if(sellPriceInput!= null && buyPriceInput != null && sellAmountInput!= null && buyAmountInput!= null){
                 if(urlSite.indexOf("usdt")>-1){
//                    console.log("USDT")
                    amountMultiplier = 1000000 // eth/usdt = 100000
                    priceMultiplier = 100 // eth/usdt = 100000
                 }else {
//                    console.log("ETHBTC")
                    amountMultiplier = 1000 //ETH/btc = 1000, eth/usdt = 100000
                    priceMultiplier = 1000000 //ETH/btc = 1000, eth/usdt = 100000
                 }
                var tradePrice = Math.round(priceMultiplier * (parseFloat(ask1Price.innerHTML)+ parseFloat(bid1Price.innerHTML)))/(2*priceMultiplier)
                tradePrice = Math.round(tradePrice * priceMultiplier)/priceMultiplier
//                console.log("tradePrice:"+tradePrice)
                sellPriceInput.value = tradePrice // marketPrice;
                buyPriceInput.value =  tradePrice//marketPrice;
                //get available balance
                availableBuyBalance = parseFloat(availableBuyBalance[0].innerHTML)
                availableSellBalance = parseFloat(availableSellBalance[0].innerHTML)

//                availableBuyBalance = 0.033788/2
//                availableSellBalance = 0.4992940
                //set buy and sell amount
                var buyAmount = Math.round(0.99 * availableBuyBalance * amountMultiplier / tradePrice) / amountMultiplier
                var buySellAvarage = (buyAmount + availableSellBalance)/5
//                console.log("availableBuyBalance: "+ availableBuyBalance)
//                console.log("availableSellBalance: "+ availableSellBalance)
//                console.log("buyAmount: "+ buyAmount)
//                console.log("buySellAvarage: "+ buySellAvarage)
                //buy rat nho
                if(buyAmount < buySellAvarage){
                    console.log("buy rat nho --> sell 1/2")
                    availableSellBalance = availableSellBalance / 2
                }else if(availableSellBalance < buySellAvarage) {
                    console.log("sell rat nho --> buy 1/2")
                    buyAmount = buyAmount/2
                }else {
                    console.log("buy = sell -> buy and sell")
                }
                //sell rat nho
                //buy - sell = nhau
                buyAmountInput.value = buyAmount
                sellAmountInput.value = Math.round(0.99 * availableSellBalance * amountMultiplier) / amountMultiplier
//                console.log("buyAmountInput.value = "+ buyAmountInput.value + " - sellAmountInput.value = "+ sellAmountInput.value)

                //click sell button
                var sellButtons = document.getElementsByClassName("sell")[8] //co 2 sell button
//                var sellButtons = document.getElementsByClassName("sell primary button spin") //co 2 sell button
//                for (i = 0; i < sellButtons.length; i++) {
                     sellButtons.click()
//                     console.log(new Date().getTime() + " click SELL ")
//                }
                setTimeout(clickBuy, 200)

            }
        }
  }

  function clickBuy(){
        var buyButton = document.getElementsByClassName("buy")[4]
  //      for (i = 0; i < buyButtons.length; i++) {
             buyButton.click()
//             console.log(new Date().getTime() + " click BUY")
  //      }
     }

  function cancelOrder(){
    var myOrders = document.getElementById("orders-list").querySelectorAll(".open");
    for(var i = 0; i < myOrders.length; i++) {
      var myOrder = myOrders[i].innerText;
      var myOrderArr = myOrder.split("  ");
      var orderTimeCreate = myOrderArr[0];
      var orderSide = myOrderArr[1];
        myOrders[i].lastElementChild.firstElementChild.click();
      //Only cancel the Buy order
//      if(Math.round(getTimeOrderPending(orderTimeCreate)) > 2 && orderSide == 'Buy'  ){
//        myOrders[i].lastElementChild.firstElementChild.click();
//      }
       /*
      if(Math.round(getTimeOrderPending(orderTimeCreate)) > 5 && orderSide == 'Sell'  ){
        var orderPrice = myOrderArr[2];
        console.log( " >> orderPrice = " + orderPrice);
        var askPrice = document.getElementById ("ask-1-price").textContent;
        console.log( " >> askPrice = " + askPrice);
        var percentLoss = 100 - roundValue(askPrice / orderPrice * 100) ;
        console.log( " >>  percentLoss = " + percentLoss);
        if(percentLoss < 0.5 ) {
          myOrders[i].lastElementChild.firstElementChild.click();
        }
      }*/
    }
  }
  function getTimeOrderPending(timeCreateOrder){
      var dateSysNow = new Date(); //"now"
    var year = dateSysNow.getFullYear();
    var month = dateSysNow.getMonth() + 1;
    var day = dateSysNow.getDate();
    var timeCreateOrder = year + "-" + month + "-" + day + " " + timeCreateOrder;
    var dateCreateOrder = new Date(timeCreateOrder)  // some date
    var timePending = Math.abs(dateSysNow-dateCreateOrder) / 1000 / 60;
    console.log("----------------------------------------");
    console.log(" ===> Order pending minutes = " + timePending);
    console.log("----------------------------------------");
    return timePending;
  }



   function getRandomArbitrary(min, max) {
     return Math.random() * (max - min) + min;
   }

  function checkCaptchaInput(){
        //check to click bit or eth
        var coinValues = document.querySelectorAll('div[class="div-user-coin-item"]');
        if(coinValues.length > 0){
            var bitcoinValue = coinValues[0].innerText;
            if(bitcoinValue.includes("0.0000")){
                //console.log("click eth");
                var ethButton = document.getElementById("btn-ethereum");
                if(ethButton != null) ethButton.click()
            }else {
                   //console.log("click bit");
                 var bitButton = document.getElementById("btn-bitcoin");
                if(bitButton != null) bitButton.click()
            }
        }

        //click max label
        var maxLabel = document.getElementById("max--coin-label");
        if(maxLabel != null){
            maxLabel.click();
            clearInterval(t);
            console.log("stop loop");
        }

      //get input captcha by id
      var inputCaptcha = document.getElementById("input-captcha");
      if(inputCaptcha == null){
            //get input captcha by name
          var captchaInputs = document.querySelectorAll('input[name="captcha"]');
          if(captchaInputs.length > 0){
              inputCaptcha = captchaInputs[0];
          }
      }
      //enter captcha
      if(inputCaptcha != null){
              console.log("has input captcha");
              var captcha = document.getElementById("img-new-captcha");
              if(captcha != null){
                inputCaptcha.focus();
                var buyUCHDiv = document.getElementById("div-buy-uch");
                var imageCaptcha = document.getElementById("img-new-captcha");
                //console.log("imageCaptcha: "+imageCaptcha):
                var srcCaptcha = imageCaptcha.getAttribute("src");
                var _captchaBuy = getCaptcha(srcCaptcha);
                if(_captchaBuy === ''){
                    console.log('Không lấy được captcha, tu fill thoi hehe');
                }else{
                    console.log('Lấy được thông tin captcha: ' + _captchaBuy);
                    if(_captchaBuy !== undefined){
                        inputCaptcha.value = _captchaBuy;
                        console.log('click buy now');
                    }
                }

              }
        }else {
            //console.log("there is no captcha");
        }

  }










function getCaptcha(urlCaptcha){

	if(urlCaptcha === undefined){
		return '';
	}

	var _numberCaptchar = urlCaptcha.split('-')[urlCaptcha.split('-').length - 1].split('.')[0];
    console.log("_numberCaptchar:"+_numberCaptchar);
	var _listCaptcha = {
		'1': 'f7gkb',
		'2': '8tjku',
		'3': 'uqcxp',
		'4': 'g9ga9',
		'5': 'kphhb',
		'6': 'tcucd',
		'7': 'zkuuj',
		'8': 'zyux8',
		'9': 'nen3v',
		'10': '2k888',
		'11': '6vu1n',
		'12': '01xya',
		'13': 'ppgah',
		'14': 'jjd7d',
		'15': '7veph',
		'16': 'fz4xj',
		'17': 'q36vj',
		'18': 'a7gx9',
		'19': 'af8dx',
		'20': '9d8ug',
		'50': 'rrhnu',
		'51': 'bjd7b',
		'52': '2k9pp',
		'53': '9uglk',
		'54': 'qrrvj',
		'55': 'kv8bf',
		'56': '7j7k8',
		'57': 'yrfvd',
		'58': '2ujly',
		'59': 'cauq3',
		'60': '7ffxr',
		'61': 'y26gx',
		'62': '2nbvb',
		'63': 'qxejc',
		'64': '7nbq9',
		'65': 'zt666',
		'66': 'dzh1a',
		'67': 'v2rnk',
		'68': 'thhx6',
		'69': 'okedg',
		'150': '2u9zh',
		'151': '0bn9z',
		'152': 'z3u8v',
		'153': '82v71',
		'154': 'z36ec',
		'155': 'apu71',
		'156': 'cfkke',
		'157': 'fzt1b',
		'158': 'vpfrh',
		'159': '3t6zj',
		'160': '7nhaq',
		'161': 'gvtqe',
		'162': '2xd9a',
		'163': 'h8pu1',
		'164': '9krej',
		'165': 'bh3jt',
		'166': 'c27qq',
		'167': 'd7ykq',
		'168': '4q193',
		'169': 'yprp7',
		'250': '2u9zh',
        '251': '0bn9z',
        '252': 'z3u8v',
        '253': '82v71',
        '254': 'z36ec',
        '255': 'apu71',
        '256': 'cfkke',
        '257': 'fzt1b',
        '258': 'vpfrh',
        '259': '3t6zj',
        '260': '7nhaq',
        '261': 'gvtqe',
        '262': '2xd9a',
        '263': 'h8pu1',
        '264': '9krej',
        '265': 'bh3jt',
        '266': 'c27qq',
        '267': 'd7ykq',
        '268': '4q193',
        '269': 'yprp7',
        '350': '2u9zh',
        '351': '0bn9z',
        '352': 'z3u8v',
        '353': '82v71',
        '354': 'z36ec',
        '355': 'apu71',
        '356': 'cfkke',
        '357': 'fzt1b',
        '358': 'vpfrh',
        '359': '3t6zj',
        '360': '7nhaq',
        '361': 'gvtqe',
        '362': '2xd9a',
        '363': 'h8pu1',
        '364': '9krej',
        '365': 'bh3jt',
        '366': 'c27qq',
        '367': 'd7ykq',
        '368': '4q193',
        '369': 'yprp7',
        '450': '2u9zh',
        '451': '0bn9z',
        '452': 'z3u8v',
        '453': '82v71',
        '454': 'z36ec',
        '455': 'apu71',
        '456': 'cfkke',
        '457': 'fzt1b',
        '458': 'vpfrh',
        '459': '3t6zj',
        '460': '7nhaq',
        '461': 'gvtqe',
        '462': '2xd9a',
        '463': 'h8pu1',
        '464': '9krej',
        '465': 'bh3jt',
        '466': 'c27qq',
        '467': 'd7ykq',
        '468': '4q193',
        '469': 'yprp7',
        '550': '2u9zh',
        '551': '0bn9z',
        '552': 'z3u8v',
        '553': '82v71',
        '554': 'z36ec',
        '555': 'apu71',
        '556': 'cfkke',
        '557': 'fzt1b',
        '558': 'vpfrh',
        '559': '3t6zj',
        '560': '7nhaq',
        '561': 'gvtqe',
        '562': '2xd9a',
        '563': 'h8pu1',
        '564': '9krej',
        '565': 'bh3jt',
        '566': 'c27qq',
        '567': 'd7ykq',
        '568': '4q193',
        '569': 'yprp7',
        '650': '2u9zh',
        '651': '0bn9z',
        '652': 'z3u8v',
        '653': '82v71',
        '654': 'z36ec',
        '655': 'apu71',
        '656': 'cfkke',
        '657': 'fzt1b',
        '658': 'vpfrh',
        '659': '3t6zj',
        '660': '7nhaq',
        '661': 'gvtqe',
        '662': '2xd9a',
        '663': 'h8pu1',
        '664': '9krej',
        '665': 'bh3jt',
        '666': 'c27qq',
        '667': 'd7ykq',
        '668': '4q193',
        '669': 'yprp7',
        '750': '2u9zh',
        '751': '0bn9z',
        '752': 'z3u8v',
        '753': '82v71',
        '754': 'z36ec',
        '755': 'apu71',
        '756': 'cfkke',
        '757': 'fzt1b',
        '758': 'vpfrh',
        '759': '3t6zj',
        '760': '7nhaq',
        '761': 'gvtqe',
        '762': '2xd9a',
        '763': 'h8pu1',
        '764': '9krej',
        '765': 'bh3jt',
        '766': 'c27qq',
        '767': 'd7ykq',
        '768': '4q193',
        '769': 'yprp7',
        '850': '2u9zh',
        '851': '0bn9z',
        '852': 'z3u8v',
        '853': '82v71',
        '854': 'z36ec',
        '855': 'apu71',
        '856': 'cfkke',
        '857': 'fzt1b',
        '858': 'vpfrh',
        '859': '3t6zj',
        '860': '7nhaq',
        '861': 'gvtqe',
        '862': '2xd9a',
        '863': 'h8pu1',
        '864': '9krej',
        '865': 'bh3jt',
        '866': 'c27qq',
        '867': 'd7ykq',
        '868': '4q193',
        '869': 'yprp7',
        '950': '2u9zh',
        '951': '0bn9z',
        '952': 'z3u8v',
        '953': '82v71',
        '954': 'z36ec',
        '955': 'apu71',
        '956': 'cfkke',
        '957': 'fzt1b',
        '958': 'vpfrh',
        '959': '3t6zj',
        '960': '7nhaq',
        '961': 'gvtqe',
        '962': '2xd9a',
        '963': 'h8pu1',
        '964': '9krej',
        '965': 'bh3jt',
        '966': 'c27qq',
        '967': 'd7ykq',
        '968': '4q193',
        '969': 'yprp7',
        '1050': '2u9zh',
        '1051': '0bn0z',
        '1052': 'z3u8v',
        '1053': '82v71',
        '1054': 'z36ec',
        '1055': 'apu71',
        '1056': 'cfkke',
        '1057': 'fzt1b',
        '1058': 'vpfzh',
        '1059': '3t6zj',
        '1060': '7nhaq',
        '1061': 'gvtqe',
        '1062': '2xd9a',
        '1063': 'h8pu1',
        '1064': '9krej',
        '1065': 'bh3jt',
        '1066': 'c27qq',
        '1067': 'd7ykq',
        '1068': '4q193',
        '1069': 'yprp7',
        '1150': '2u9zh',
        '1151': '0bn0z',
        '1152': 'z3u8v',
        '1153': '82v71',
        '1154': 'z36ec',
        '1155': 'apu71',
        '1156': 'cfkke',
        '1157': 'fzt1b',
        '1158': 'vpfzh',
        '1159': '3t6zj',
        '1160': '7nhaq',
        '1161': 'gvtqe',
        '1162': '2xd9a',
        '1163': 'h8pu1',
        '1164': '9krej',
        '1165': 'bh3jt',
        '1166': 'c27qq',
        '1167': 'd7ykq',
        '1168': '4q193',
        '1169': 'yprp7',
        '1250': '2u9zh',
        '1251': '0bn0z',
        '1252': 'z3u8v',
        '1253': '82v71',
        '1254': 'z36ec',
        '1255': 'apu71',
        '1256': 'cfkke',
        '1257': 'fzt1b',
        '1258': 'vpfzh',
        '1259': '3t6zj',
        '1260': '7nhaq',
        '1261': 'gvtqe',
        '1262': '2xd9a',
        '1263': 'h8pu1',
        '1264': '9krej',
        '1265': 'bh3jt',
        '1266': 'c27qq',
        '1267': 'd7ykq',
        '1268': '4q193',
        '1269': 'yprp7',
        '1350': '2u9zh',
        '1351': '0bn9z',
        '1352': 'z3u8v',
        '1353': '82v71',
        '1354': 'z36ec',
        '1355': 'apu71',
        '1356': 'cfkke',
        '1357': 'fzt1b',
        '1358': 'vpfrh',
        '1359': '3t6zj',
        '1360': '7nhaq',
        '1361': 'gvtqe',
        '1362': '2xd9a',
        '1363': 'h8pu1',
        '1364': '9krej',
        '1365': 'bh3jt',
        '1366': 'c27qq',
        '1367': 'd7ykq',
        '1368': '4q193',
        '1369': 'yprp7'
	};

	return _listCaptcha[_numberCaptchar];
}





















/*
//set so luong hex
var amountHex = document.getElementById("hxt_amount");
amountHex.value="300";

//set password field
var password = document.getElementById("password");
password.value = "vvvvvv";
password.focus();

//tick checkbox
var agreeCheckbox = document.getElementById("agree");
agreeCheckbox.checked = true;

//focus on captcha input
var captchaInputs = document.querySelectorAll('input[name="captcha_key"]');
if(captchaInputs.length > 0){
    captchaInputs[0].focus();
}

//set password field
//var passwordElements = document.getElementsByName("password");
//if(passwordElements.length > 0){
//    passwordElements[0].value = "vvvvvv";
//}
//tick checkbox
//var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//if(checkboxes.length > 0){
//    for(var i = 0; i< checkboxes.length;i++){
//        var check = checkboxes[i];
//        if(!check.disabled){
//            check.checked = true;
//        }
//    }
//}



//document.getElementById("id1").click();


//nhap captcha

//click buy
//document.getElementById("buy").click();

*/