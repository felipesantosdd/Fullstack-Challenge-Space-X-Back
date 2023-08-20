# Fullstack-Challenge-Space-X-Back

# 1° Dia

Dividi as tarefas no Trello, para me organizar e saber o que eu deveria fazer.
após, decidi começar pelo backend.
O Primeiro Passo foi configurar o ambiente de desenvolvimento, definir as estruturas de pasta, e as dependencias que seriam usadas.
Após isso, pesquisei sobre os requisitos que eu não conhecia, começando pelo CRON, rapidamente encontrei as respostas que procurava sobre o assunto e coloquei em pratica, sendo essa a primeira feature do peojeto.

# 2° Dia

Ao finalizar o agendamento com o CRON, sofri com um erro inusitado, onde apos a primeira requisição a aplicação caia com a mensagem de erro que "Não é possível ler as propriedades de indefinido (lendo 'status')", busquei formas de resolver, mas sem sucesso, então para evitar que a aplicação caia, eu defini que se status for undefined ele apenas ira retornar void.

Apos inpmenetar a busca, me deparei com o erro na query de valor, a aplicação nao cai mas os dados nao sao retornados
