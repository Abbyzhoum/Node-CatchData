// # - * - coding:utf-8 - * -

const fs = require('fs')
// const request = require('request')        
const cheerio = require('cheerio')
const superagent = require('superagent')
const userAgent = require('./src/userAgent.js')
const gbk = require('gbk') //处理乱码,基于二级制
const url = require('url')    //原生处理url
var charset = require('superagent-charset') //处理乱码
charset(superagent)
// 京东评论数据
// const reptileUrl = 'https://club.jd.com/comment/productPageComments.action?callback=fetchJSON_comment98vv337&productId=3311073&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0'
// superagent.get(reptileUrl)
// .set({ 'User-Agent': userAgent })
// .end(function(err, res) {
//   if (err) {
//     throw Error(err)
//   }
//  var utf8String = gbk.toString('utf-8',res.text)

//   fs.writeFile(__dirname + '/data/article_JD.json',JSON.stringify(utf8String)), 
//     function (err) {
//     if (err) throw err
//     console.log('写入完成')
//   }
// })


// 博客园的某个数据网页
// const cnblogs= 'https://www.cnblogs.com/snandy/archive/2011/03/13/1981611.html'
// superagent.get(cnblogs)
//           .set({ 'User-Agent': userAgent })
//           .end(function (err,res) {
//               if(err){
//                 throw err
//               }
//               // console.log(res.text)
//              let $ = cheerio.load(res.text)
//               $.prototype.logoHtml = function () {
//                   return this.html()
//               }
//               var body = $('body').html()
//                console.log(body)

//             //把发送请求数据写到文件中
//             fs.writeFile(__dirname + '/data/cnblogs.html',body)
//           })

//一棵树的微博，获取他的信息=
// const url = 'https://blog.csdn.net/q3585914/article/details/79999039'
// superagent.get(url)
//           .set({'user-agent':userAgent})
//           .end(function (err,res) {
//             if(err){
//               throw err
//             }
//             let $ = cheerio.load(res.text)
//             var user = $('head>script[type="text/javascript"]').first()

//             var data = []
//             data.push({
//               username:
//             })
//             console.log(data)
//             fs.writeFile(__dirname + '/data/userForm.html',user,
//                 function (err) {
//               if(err) throw err
//               console.log('写入完成')
//             })
//           })


// var tbUrl = 'https://detail.tmall.com/item.htm?spm=a230r.1.14.6.68624507tWuF7E&id=560257961625&cm_id=140105335569ed55e27b&abbucket=18&sku_properties=10004:709990523'
// function getUrl(aUrl){
//    var urlObj = url.parse(aUrl)
// }

// superagent.get(tbUrl)
//           .set({'user-agent':userAgent})
//           .end(function(err,res){
//               if(err){
//                 throw err
//               }

//           })


var JdUrl = 'https://item.jd.com/1555771170.html'
superagent.get(JdUrl)
  .set({
    'user-agent': userAgent
  })
  .charset('gb2312')
  .end(function (err, res) {
    if (err) {
      throw err
    }
    let $ = cheerio.load(res.text)

    var shopTel = $('.phone-num').text().trim()
    var shopName = $('.contact > .J-hove-wrap > div:nth-child(1) > .name > a').text()
    var data = []
    data.push({
      name: shopName,
      tel: shopTel
    })
    console.log(data)

    fs.writeFile(__dirname + '/data/testUrl.json',JSON.stringify({
      // status:200,
      data:data
    }) , function (err) {
      if (err) throw err
      console.log('文件写好了@')
    })

  })