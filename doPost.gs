function doPost(e)
{
  let update = JSON.parse(e.postData.contents);
  if (update.hasOwnProperty('message'))
  {
    let msg = update.message;
    let chat_id = msg.chat.id;
    let text = msg.text;
    let msg_array = msg.text.split(" ");
    let date = (msg.date/86400)+25569.125;
    let user = msg.from.username;

    //Demo.send(update,chat_id,API);
    
    if (text == "/getkeyboard") {
      let keyboardToSend = getKeyboard(chat_id);
      Demo.send_key("Галочки", chat_id, API, keyboardToSend)
    }
    if (text == "/save") {
      Demo.send("Клавиатура сохранена: \n" + sendKeyboard(chat_id), chat_id, API)
    }
  }

  if (update.hasOwnProperty('callback_query')) {
    let chat_id = update.callback_query.message.chat.id;
    let vote = update.callback_query.data;
    let username = update.callback_query.from.username;
    let msg_id = update.callback_query.message.message_id;
    //Demo.send(update,chat_id,API);

    if (vote >= 0 && vote <= 16) {
      //Test.getRange(1,5).setValue(msg_id);
      setKeyboard(chat_id,vote);
      edit_inline(chat_id, msg_id);
    }
  }
}