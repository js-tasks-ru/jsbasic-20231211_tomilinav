function checkSpam(str) {
  // ваш код...

  let lowerStr = str.toLowerCase();
  return lowerStr.includes('1xbet') || lowerStr.includes('xxx') ;


}
alert (checkSpam('1XbeT now')===true)
alert (checkSpam(' xxx')===true)
alert (checkSpam('innocent rabbit')===false)


