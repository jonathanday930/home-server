const fs = require('fs')
const express = require('express')
const util = require('util')
const path = require('path')
const auth = require('../middleware/auth')
router = express.Router()



const config= require('config')

const homeDirectory = config.get("fileRoot")

const stat = util.promisify(fs.stat)

function isVideo(fileName){

  videoExtensions = ['.mp4','.mkv']
  extension = path.extname(fileName)
  return videoExtensions.includes(extension)
}

router.get('/view/:path(*)',auth,async (req,res)=> {
  renderParams = {}
  renderParams.user=req.user

  console.log(`file params are ${req.params.path}`)

  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`searching file ${pathRequested}`)

  fileStat = await stat(pathRequested)
  if (fileStat.isDirectory()){
    fs.readdir(pathRequested,(err,files)=>{
      if (! files== null){
        console.log('this is important')
      files = []
    }

      links = []
      for (i in files){
        links.push({link:path.join('/files/view/',req.params.path,files[i]), title: files[i]})
        console.log(path.join('/',req.params.path,files[i]))
      }
      renderParams.files = links
      renderParams.title = req.params.path

      res.render('files/folder',renderParams )
    });

  }else{

    // renderParams = Object.defineProperties(renderParams,)
    renderParams.fileName=req.params.path
    renderParams.link = path.join('/files/download/',req.params.path)
    if (isVideo(req.params.path)){
      renderParams.videoLink= path.join('/files/video/',req.params.path)
    }

    res.render('files/file',renderParams)
    // res.redirect(path.join('/download',req.params.path))

    console.log('rendering complete')

  }


});

router.get('/video/:path(*)',auth,async (req,res) => {

  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`video called for ${path.join(homeDirectory,req.params.path)}`)

    const chunksize = 300 * 1024
    const stat = fs.statSync(pathRequested)
    const fileSize = stat.size
    const bytesbuffer = 160
    const range = req.headers.range
    console.log(`range ${range}`)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
      console.log(`start: ${start} end: ${end}`)
      // const chunksize = (end-start)+1
      const file = fs.createReadStream(pathRequested, {start:start, end:end,highWaterMark: bytesbuffer })
      // file.read(bytesbuffer)
      // chunksize = stat.size
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {

      const head = {
        'Content-Length': 1000,
        'Content-Type': 'video/mp4'

      }
      res.writeHead(200, head)
      const file = fs.createReadStream(pathRequested)
      // file.read(bytesbuffer)
      file.pipe(res)

    }

    // res.render('video',{fileName:req.params.path,videoLink: path.join('/file/video/',req.params.path) ,link:path.join('/file/download/',req.params.path)})








});



router.get('/download/:path(*)',auth,async (req,res) => {
  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`Download called for ${path.join(homeDirectory,req.params.path)}`)

  fileStat = await stat(pathRequested)
  if(fileStat.isFile()){
  res.download(path.join(homeDirectory,req.params.path));
}

});







module.exports = router
