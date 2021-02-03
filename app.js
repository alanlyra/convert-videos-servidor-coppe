// Arquivo 2, importa o anterior. O 'node nomeDoArquivo.js' será para esse arquivo
const walk = require('walkdir')
const resizeVideo = require('./resizeVideo.js')
const isVideo = require('is-video');

const videosDir = "/mnt/videos/midia-backup"

// Usando o walkdir pra pegar todos os vídeos de uma pasta
// Fiz uma requisição síncrona pra ter menos problema de erro, mas assíncrona deve ser melhor
// Pra fazer assíncrona, só tirar o '.sync' abaixo
walk.sync(videosDir, function(path, stat) {
    console.log('Achou o arquivo:', path);
    if(isVideo(path)) {
        console.log('É arquivo de video. Processando...');
        return resizeVideo(path)
    }
    console.log("Não é arquivo de video")
    
});