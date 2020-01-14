const fs = require('fs')
const express = require('express')
const util = require('util')
router = express.Router()

const homeDirectory = '/home/jonathan/node-projects/home-server'

const stat = util.promisify(fs.stat)


router.get('/:path(*)',async (req,res)=> {

  console.log(`file params are ${req.params.path}`)

  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`searching file ${pathRequested}`)

  fileStat = await stat(pathRequested)
  console.log(`file is directory: ${fileStat.isDirectory()}`)

  if (fileStat.isDirectory()){
      console.log('NEED IMPLEMENT REDIRECT TO FOLDER')
  }else{

    res.render('file',{fileName:req.params.path})
    res.download(req.params.path);

  }


});





module.exports = router
