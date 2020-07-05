import getFileTypeFromMIME from "./getFileTypeFromMIME";

export default (mime) => {

    const fileTypeData = {
        'audio/x-aac': 'aac',
        'audio/mp4': 'audio',
        'audio/ogg': 'ogg',
        'audio/mpeg': 'mp3',
        'audio/wav': 'wav',
        'application/x-7z-compressed': '7z',
        'application/x-rar-compressed': 'rar',
        'application/x-tar': 'tar',
        'application/zip': 'zip',
        'application/octet-stream': 'bin',
        'application/pdf': 'pdf',
        'application/mp4': 'video',
        'application/msword': 'word',
        'application/msexcel': 'xls',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xls',
        'application/vnd.microsoft.portable-executable': 'exe',
        'application/vnd.android.package-archive': 'apk',
        'application/json': 'json',
        'application/xls': 'xls',
        'application/x-xls': 'xls',
        'font/otf': 'otf',
        'font/ttf': 'ttf',
        'font/woff': 'woff',
        'font/woff2': 'woff',
        'image/bmp': 'image',
        'image/gif': 'gif',
        'image/jpeg': 'jpeg',
        'image/pjpeg': 'jpeg',
        'image/png': 'png',
        'image/x-png': 'png',
        'image/tiff': 'tif',
        'image/webp': 'image',
        'image/vnd.adobe.photoshop': 'psd',
        'image/svg+xml': 'image',
        'text/plain': 'txt',
        'text/css': 'css',
        'text/csv': 'csv',
        'text/html': 'html',
        'video/x-msvideo': 'avi',
        'video/3gpp': 'video',
        'video/3gpp2': 'video',
        'video/x-flv': 'video',
        'video/h261': 'video',
        'video/h263': 'video',
        'video/h264': 'video',
        'video/x-m4v': 'video',
        'video/x-ms-wmv': 'video',
        'video/mpeg': 'mpg',
        'video/mp4': 'video',
        'video/ogg': 'ogg',
        'video/webm': 'video',
        'video/x-matroska': 'mkv'
    };

    if(fileTypeData.hasOwnProperty(mime))
        return require('../images/icons/file/' + fileTypeData[mime] + '.png');
    else {
        const type = getFileTypeFromMIME(mime);
        return require('../images/icons/file/' + type + '.png');
    }

};