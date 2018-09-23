chrome.extension.sendRequest({
  'action': 'getOptions',
  'args': []
}, function (response) {
  var urlSite = document.location.href.toLowerCase()
  if (urlSite.indexOf('hextra') > -1) {
    $('input[name=password]').val('vvvvvv')
    $('input[name=agree]').attr('checked', true)

    var script = $('script:contains("hxt_to_btc")').html()
    var text = script.split('hxt_to_btc')[1]
    text = text.replace(/var/g, '')
    text = text.replace(/hxt_to_usd/g, '')
    text = text.replace(/btc_to_usd/g, '')
    text = text.replace(/=/g, '')
    text = text.replace(/;/g, '')
    text = text.replace(/ {4}/g, ' ')
    text = text.replace(/ {3}/g, ' ')
    text = text.replace(/ {2}/g, ' ')
    text = text.replace(/ /g, ' ')
    var params = text.split(' ')
   	var hxt_to_btc = parseFloat(params[1].trim()).toFixed(8)
   	var hxt_to_usd = parseFloat(params[2].trim()).toFixed(2)
   	var btc_to_usd = parseFloat(params[3].trim()).toFixed(8)
   	var hxt_amount = $('#helpBlock2').find('a').attr('data-fill-text')

    $('input[name=hxt_amount]').val(hxt_amount)
   	$('#btc_amount').val((hxt_amount * hxt_to_btc).toFixed(8))
    $('#total_usd').text((hxt_amount * hxt_to_usd).toFixed(2))
    $('#pay_btc').text((hxt_amount * hxt_to_btc).toFixed(8))
    $('#receive_hxt').text(hxt_amount)
    //focus on captcha input
    var captchaInputs = document.querySelectorAll('input[name="captcha_key"]');
    if(captchaInputs.length > 0){
        captchaInputs[0].focus();
    }
  }
})
