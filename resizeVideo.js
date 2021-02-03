// Arquivo 1, será importado pelo outro
const del = require('del')
const renameOverwrite = require('rename-overwrite')
const fileExtension = require('file-extension')
const shell = require('shelljs')

// Função que diminui o vídeo usando o ffmpeg
const resizeVideo = (path) => {

	if (shell.exec(`ffmpeg -i ${path} -vf "scale=w=iw/2:h=ih/2:force_original_aspect_ratio=decrease,pad='iw+mod(iw\,2)':'ih+mod(ih\,2)'" ${path}-compressed.${fileExtension(path)}`).code !== 0) {
		shell.echo('Error: ffmpeg failed');
		shell.exit(1);
		return
	}
	console.log(`Arquivo ${path} criado com sucesso`);
	const deletedFilePaths = del.sync([path], {force: true});
	renameOverwrite.sync(`${path}-compressed.${fileExtension(path)}`, path)
	console.log(`Arquivo ${path} renomeado com sucesso`)

	/* try {
		// Instancia o processo.
		new ffmpeg(path, function (err, video) {
			// Vai setar o vídeo em 50% do tamanho original, 
			// tanto na altura quanto na largura, e depois vai salvar
			video
			.setVideoSize('50%', true, false)
			.save(`${path}-compressed.${fileExtension(path)}`, function (error, file) {
				
				// Se não der erro na hora de salvar, exibe o nome do arquivo criado
				if (!error) {
					console.log(`Arquivo ${file} criado com sucesso`);
					const deletedFilePaths = del.sync([path], {force: true});
					renameOverwrite.sync(`${path}-compressed.${fileExtension(path)}`, path)
					console.log(`Arquivo ${path} renomeado com sucesso`)
				}
				else
					console.log('Erro ao processar o arquivo', error)

			});
		})
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	} */
}

module.exports = resizeVideo