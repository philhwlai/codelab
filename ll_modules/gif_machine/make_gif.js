const fs = require('fs');
const path = require('path');
const cp = require('child_process');
var colors = require('colors/safe');

require('dotenv').config();
console.log(process.env.FFMPEG_PATH);
console.log(process.env.BASEDIR);
const workingDir = path.join(process.env.BASEDIR, 'public/images/temp/video');
const gifDir = path.join(process.env.BASEDIR, 'public/images/gif');

function ffprobeVideoSync(videoFilePath){
  // this is equivalent of running "ffprobe -v quiet -print_format json -show_format -show_streams [file]"
  var output = cp.spawnSync(process.env.FFPROBE_PATH, ['-v', 'quiet', '-print_format', 'json', '-show_format', '-select_streams', 'V',  '-show_streams', videoFilePath], { encoding : 'utf8' });
  // console.log('\n\n\nGoing to add this, we hope.\n\n');
  // console.log(output.stdout);
  // var video_meta = JSON.parse(output.stdout);
  return JSON.parse(output.stdout);
  // console.log(video_meta.streams[0].codec_long_name);
}

function makeGif(filePath, outputWidth){
  console.log("\n\n . . . starting the makeGif function . . . \n\n");
  var fileName = path.basename(filePath, path.extname(filePath));
  var fileInfo = ffprobeVideoSync(filePath);
  console.log(colors.gray(JSON.stringify(fileInfo, null, 4)));
  console.log("the dimensions for " + filePath + " are " + fileInfo.streams[0].width + " x " + fileInfo.streams[0].height);
  var aspectRatio = fileInfo.streams[0].width/fileInfo.streams[0].height;
  console.log("aspectRatio is " + aspectRatio);
  var newHeight = outputWidth/aspectRatio;
  if (fs.existsSync(path.join(gifDir, (fileName+'.gif')))) {
    console.log(colors.red("this gif already exists--take a look and try again?"));
    return;
  }
  cp.spawnSync(process.env.FFMPEG_PATH, [
    '-i', filePath,
    '-vf', 'palettegen', (path.join(gifDir, (fileName + '-palette.png')))],
    {encoding:'utf8'});
  cp.spawnSync(process.env.FFMPEG_PATH, [
      '-i', filePath,
      '-i', (path.join(gifDir, (fileName + '-palette.png'))),
      '-vf', ('scale=' + outputWidth + ':' + newHeight),
      '-y', (path.join(gifDir, (fileName+'.gif'))) ],
      {encoding:'utf8'});
  fs.unlinkSync((path.join(gifDir, (fileName + '-palette.png'))))
}

function makeGifFromPngs(filePath, outputWidth){
  console.log("\n\n . . . starting the makeGif function . . . \n\n");
  var fileName = path.basename(filePath, path.extname(filePath));
  var fileInfo = ffprobeVideoSync(filePath);
  console.log(colors.gray(JSON.stringify(fileInfo, null, 4)));
  console.log("the dimensions for " + filePath + " are " + fileInfo.streams[0].width + " x " + fileInfo.streams[0].height);
  var aspectRatio = fileInfo.streams[0].width/fileInfo.streams[0].height;
  console.log("aspectRatio is " + aspectRatio);
  var newHeight = outputWidth/aspectRatio;
  if (fs.existsSync(path.join(gifDir, (fileName+'.gif')))) {
    console.log(colors.red("this gif already exists--take a look and try again?"));
    return;
  }
  cp.spawnSync(process.env.FFMPEG_PATH, [
    '-i', filePath,
    '-vf', ('scale=' + outputWidth + ':' + newHeight),
    "/Users/mk/Development/_tests/png/frames/%03d.png"
    ],
    {encoding:'utf8'});
  cp.spawnSync(process.env.FFMPEG_PATH, [
    '-i', "/Users/mk/Development/_tests/png/frames/%03d.png",
    '-vf', 'palettegen', (path.join(gifDir, (fileName + '-palette.png')))],
    {encoding:'utf8'});
  cp.spawnSync(process.env.FFMPEG_PATH, [
      '-i', "/Users/mk/Development/_tests/png/frames/%03d.png",
      '-i', (path.join(gifDir, (fileName + '-palette.png'))),
      '-lavfi', 'paletteuse,setpts=2*PTS',
      '-y', (path.join(gifDir, (fileName+'.gif'))) ],
      {encoding:'utf8'});
  // fs.unlinkSync((path.join(gifDir, (fileName + '-palette.png'))))
}

function folderToGifs(folderPath, outputWidth){
  console.log("\n\n . . . starting the folderToGifs function . . . \n\n");
  var videoFiles = fs.readdirSync(folderPath);
  videoFiles.forEach(function(videoFile){
    var ext = path.extname(videoFile).toLowerCase();
    console.log(ext);
    if (ext == ".mov" || ext == ".mp4" || ext == ".m4v") {
      console.log("converting " + videoFile + " to gif");
      makeGif(path.join(folderPath, videoFile), outputWidth)
    }
  })
}

function io2gif(videoFilePath, inPoint, outPoint, maxWidth){
  videoSegment = makeVideoSegment(videoFilePath, inPoint, outPoint);
  makeGif(videoSegment.videoFilePath, maxWidth);
}

function makeVideoSegment(videoFilePath, inPoint, outPoint){
  var fileName = path.basename(videoFilePath, path.extname(videoFilePath));
  cp.spawnSync(process.env.FFMPEG_PATH,
    [
      '-i', videoFilePath,
      '-ss', inPoint, // -ss 00:00:30
      '-c:v', 'prores',
      '-c:a', 'copy',
      '-to', outPoint, // -t 00:00:05
      (path.join(workingDir, (fileName+'-segment.mov')))
    ]);
  return {rootDir: workingDir, videoFileName: (fileName+'-segment.mov'), videoFilePath: (path.join(workingDir, (fileName+'-segment.mov')))}
}

module.exports.makeGif = makeGif;
module.exports.io2gif = io2gif;
module.exports.fcpxmlToGif = fcpxmlToGif;
module.exports.folderToGifs = folderToGifs;
module.exports.makeGifFromPngs = makeGifFromPngs;
