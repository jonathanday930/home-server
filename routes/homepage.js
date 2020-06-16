const fs = require('fs')
const express = require('express')
const util = require('util')
const path = require('path')
router = express.Router()

const config= require('config')

const homeDirectory = config.get("fileRoot")

const stat = util.promisify(fs.stat)

function isVideo(fileName){

  videoExtensions = ['.mp4','.mkv']
  extension = path.extname(fileName)
  return videoExtensions.includes(extension)
}



router.get('/',async (req,res)=> {
  paramObject = {link:'/files/view/'}

  res.render('homepage',paramObject)

})








module.exports = router
