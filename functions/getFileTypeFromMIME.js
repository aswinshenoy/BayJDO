export default (mime) => {
    const ImagePattern = /image-*/;
    const VideoPattern = /video-*/;
    const AudioPattern = /audio-*/;
    if(mime)
    {
        if(mime.match(ImagePattern))
            return 'image';
        if(mime.match(VideoPattern))
            return 'video';
        if(mime.match(AudioPattern))
            return 'audio';
    }
    return 'file';
};