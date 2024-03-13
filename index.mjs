import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client();

export const handler = async (event) => {
  try {
    // Obtém o evento de upload do S3
    const s3Event = event.Records[0].s3;
    const bucketName = s3Event.bucket.name;
    const objectKey = s3Event.object.key;
    
    // Obtém informações sobre o arquivo do S3
    const params = {
      Bucket: bucketName,
      Key: objectKey
    };
    
    // Obtem o tamanho do arquivo
    const fileInfo = await s3Client.send(new HeadObjectCommand(params)); // para isso essa função lambda precisa de permissão de leitura no bucket da s3
    const fileSizeInBytes = fileInfo.ContentLength;
    
    // Converte o tamanho para MB
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    
    // Verifica se o arquivo é maior que 10MB
    const isFileLargerThan10BM = fileSizeInMB > 10;
    
    // Imprime o resultado
    console.log(`O arquivo ${objectKey} tem tamanho: ${fileSizeInMB.toFixed(2)} MB.`);
    console.log(`O arquivo ${objectKey} é ${isFileLargerThan10BM ? 'maior' : 'menor'} que 10 MB`);
    
    if(isFileLargerThan10BM) {
      // Exclua o arquivo do bucket
      await s3Client.send(new DeleteObjectCommand(params)); // para isso essa função lambda precisa de permissão de escrita no bucket da s3
      console.log(`O arquivo ${objectKey} foi excluído do bucket.`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Arquivo processado com sucesso.' })
    };
    
  } catch (error) {
    console.log('Erro ao processar o arquivo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar o arquivo.' })
    };
  }
};