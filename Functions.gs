function getKeyboard (chat_id) { //забирает клаву из табл
  //let chat_id = 2245262;
  let ind = getInd(chat_id,Test); //1
  let lc = Test.getLastColumn(); //12
  let cur_keyboard = [];
  let key = [];
  let KEYBOARD = {};
  
  if (ind > 0) {
    key = Test.getRange(ind+1,2,1,lc-1).getValues();
    key = key.flat();
    for (i=0; i<key.length; i++) {
      cur_keyboard.push( [{"text":key[i], "callback_data":i}]);
    }
    if (cur_keyboard != "") {
      KEYBOARD = 
        {
          "inline_keyboard": cur_keyboard,
          "resize_keyboard": true
        }
    } else {
      KEYBOARD = FLAGS;
    }
  } else {
    KEYBOARD = FLAGS;
  }
  return KEYBOARD
  //Logger.log(KEYBOARD)
}


function getInd(chat_id,sheet) { //возвращает индекс строки, в которой нах-ся chat_id //chat_id,sheet,range
  /*let chat_id = 311157431;
  let sheet = Test;
  let range = "A1:B10";*/

  let lr = sheet.getLastRow();
  let chat_id_arr = sheet.getRange(1,1,lr).getValues();
  chat_id_arr = chat_id_arr.flat();
  let ind = chat_id_arr.indexOf(chat_id);
  
  return ind;
  
  //Logger.log(ind)
}

function setKeyboard(chat_id,vote) { //записывает текст клавы в табл
  //let vote = 1;
  //let chat_id = 157456331;
  let ind = getInd(chat_id,Test);  //индекс строки в кейбордс
  
  let KEYBOARD = getKeyboard(chat_id);  //получить клаву согласно инд
  let key = KEYBOARD.inline_keyboard[vote][0].text; 
  let flag = key.split(' ');
  switch (flag[0])
    {
      case '✅' : flag.splice(0,1,'➖'); break;
      case '➖' : flag.splice(0,1,'✅'); break;
    }
  flag = flag.join(' ');
  KEYBOARD.inline_keyboard[vote][0].text = flag;
  let new_arr = [];
  new_arr = KEYBOARD.inline_keyboard.flat();
  
  if (ind < 0) { //если ид нет в табл
    let new_ind = Test.getLastRow()+1; //строка для записи нового ид
    Test.getRange(new_ind,1).setValue(chat_id);
    for (i=0; i<new_arr.length; i++) {
      Test.getRange(new_ind,2+i).setValue(new_arr[i].text) // заполнение ячеек клавой
    }
  } else {
      for (i=0; i<new_arr.length; i++) {
      Test.getRange(ind+1,2+i).setValue(new_arr[i].text) //заполнение строк клавы для нового ид
    }
  }
}

function sendKeyboard(chat_id) { //вернет клаву в виде текста
  let ind_keyboard = getInd(chat_id,Test);
  let msg = Test.getRange(ind_keyboard+1,2,1,Test.getLastColumn()).getValues();
  msg = msg.flat();
  msg = msg.join(",\n");

  return msg
}

function del_inline(chat_id, msg_id) {
  var payload = {
    'method': 'editMessageReplyMarkup',
    'chat_id': String(chat_id),
    'message_id': String(msg_id)
  }
  
  var Data = {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
  //Logger.log(typeof keyboard)
}


function edit_inline(chat_id, msg_id) {
  //let msg_id=161
  //let chat_id = 311157431
  let keyboard = getKeyboard(chat_id);
  var payload = {
    'method': 'editMessageReplyMarkup',
    'chat_id': String(chat_id),
    'message_id': String(msg_id),
    'reply_markup': JSON.stringify(keyboard)
  }
  
  var Data = {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
}





