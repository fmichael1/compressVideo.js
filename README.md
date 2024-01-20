# Video Compression Utility

This JavaScript utility leverages `fluent-ffmpeg` to compress video files. It allows for customizable settings like quality, CRF (Constant Rate Factor), and encoding speed.

## Installation

Before running the script, ensure you have Node.js installed. Then, install `fluent-ffmpeg`:

```bash
npm install fluent-ffmpeg
```

## Usage
To use this script, run it via Node.js, passing the required arguments:

```bash
node compressVideo.js <input-file> <quality> <crf> <speed>
```

### Arguments
* <code><input-file></code>: Path to the video file to be compressed.
* <quality>: The height in pixels for the output video (e.g., 480 for 480p).
* <crf>: Constant Rate Factor for quality control (0-51; 0 is lossless, 23 is default).
* <speed>: Preset for encoding speed (values like ultrafast, superfast, etc.).
