const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function compressVideo(inputPath, quality, crf, speed) {
    const fileName = path.parse(inputPath).name;
    const dirName = path.parse(inputPath).dir;
    const outputPath = path.join(dirName, `${fileName}_output.mp4`);

    ffmpeg()
        .input(inputPath)
        .inputOptions('-hwaccel', 'auto')  // Moved here as an input option
        .outputOptions('-vf', `scale=-1:${quality}`)
        .outputOptions('-c:v', 'libx264')
        .outputOptions('-crf', `${crf}`)
        .outputOptions('-preset', `${speed}`)
        .output(outputPath)
        .on('error', function(err, stdout, stderr) {
            console.error(err.message);
            console.error("stdout:\n" + stdout);
            console.error("stderr:\n" + stderr);
            // Handling the error appropriately
        })
        .on('end', function() {
            console.log('\n' + outputPath + ' is ready!');
        })
        .on('progress', function(progress) {
            process.stdout.write('Processing: ' + progress.percent.toFixed(2) + '% done\r');
        })
        .run();
}

function showHelp() {
    console.log(`
Usage: node compressVideo.js <input-file> <quality> <crf> <speed>

Parameters:
  <input-file>: The path to the video file to be compressed.
  <quality>: The height in pixels to which the video should be resized (e.g. 480 for 480p, 768).
  <crf>: The Constant Rate Factor (CRF) to control the quality of the video (0-51, where 0 is lossless, 23 is default, and 51 is the worst possible).
  <speed>: The preset to determine the encoding speed to compression ratio (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow).
    `);
}

const args = process.argv.slice(2);

if (args[0] === '--help') {
    showHelp();
} else if (args.length < 4) {
    console.log('Insufficient arguments. Use --help for usage information.');
} else {
    compressVideo(args[0], args[1], args[2], args[3]);
}
