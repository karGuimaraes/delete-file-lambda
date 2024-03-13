# Função Lambda para Processamento de Arquivos no Amazon S3

Esta função Lambda é projetada para processar arquivos armazenados em um bucket do Amazon S3. Ele verifica se os arquivos têm mais de 10 MB de tamanho e, se forem, os exclui do bucket.


## Configuração

1. **Crie uma Função Lambda na AWS**:
   - Acesse o Console de Gerenciamento da AWS.
   - Vá para o serviço Lambda e clique em "Criar função".
   - Escolha o ambiente de execução Node.js e configure a função conforme necessário.
   - Cole o código fornecido neste repositório na interface de edição da função Lambda.

2. **Permissões**:
   - Certifique-se de que a função Lambda tenha as permissões adequadas para acessar o bucket do Amazon S3. Você precisará de permissões de leitura e escrita.

3. **Configuração do Evento de Gatilho**:
   - Configure um evento de gatilho para acionar a função Lambda sempre que um novo arquivo for carregado no bucket do Amazon S3.

## Uso

- Carregue arquivos para o bucket do Amazon S3 configurado como gatilho para esta função Lambda.
- A função processará automaticamente os arquivos carregados, verificando se eles têm mais de 10 MB de tamanho.
- Os arquivos com mais de 10 MB serão excluídos do bucket, e um registro será feito no console.