const fs = require('fs')
const express = require('express')
const util = require('util')
const path = require('path')
router = express.Router()

const homeDirectory = '/home/jonathan/node-projects/home-server'

const stat = util.promisify(fs.stat)


router.get('/view/:path(*)',async (req,res)=> {

  console.log(`file params are ${req.params.path}`)

  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`searching file ${pathRequested}`)

  fileStat = await stat(pathRequested)
  console.log(`file file is directory: ${fileStat.isDirectory()}`)

  if (fileStat.isDirectory()){
      console.log('NEED IMPLEMENT REDIRECT TO FOLDER')
  }else{
    console.log('rendering page')
    res.render('file',{fileName:req.params.path,link:path.join('/file/download/',req.params.path)})
    // res.redirect(path.join('/download',req.params.path))

    console.log('rendering complete')

  }


});

router.get('/download/:path(*)',async (req,res) => {
  pathRequested = req.params.path

  fileStat = await stat(pathRequested)
  if(fileStat.isFile()){
  res.download(req.params.path);
}

});







module.exports = router
