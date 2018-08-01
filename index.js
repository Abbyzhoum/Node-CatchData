const fs = require('fs')
// const request = require('request')        
const cheerio = require('cheerio')
const superagent = require('superagent')
const userAgent = require('./src/userAgent.js')

const reptileUrl = 'https://club.jd.com/comment/productPageComments.action?callback=fetchJSON_comment98vv337&productId=3311073&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0'

superagent.get(reptileUrl)
.set({ 'User-Agent': userAgent })
.end(function(err, res) {
  if (err) {
    throw Error(err)
  }
  let $ = cheerio.load(res.text)
  let data = []
  data.push(res.text)
  console.log(data)

  fs.writeFile(__dirname + '/data/article_JD.json', JSON.stringify({
    status: 0,
    data: data
  }), function (err) {
    if (err) throw err
    console.log('写入完成')
  })
})