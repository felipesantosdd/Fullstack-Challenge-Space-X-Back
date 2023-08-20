# Usando a imagem oficial do Node.js como base
FROM node:20.5

# Criando e definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalando as dependências do projeto
RUN yarn install --legacy-peer-deps

# Copiando todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# Expondo a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "start"]
