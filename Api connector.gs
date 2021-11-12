function api_connector ()
{
  let App_link = "https://script.google.com/macros/s/AKfycbxdwh5_QhpYnSZulKD-Ah2EsdIUbeGVl27aLCM2P9oOXJbf4tDznRMdyElMZ87dED2H/exec";
  UrlFetchApp.fetch("https://api.telegram.org/bot"+API+"/setWebHook?url="+App_link); 
}