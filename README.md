Código-fonte das aulas como criar o CRUD com [React](https://www.youtube.com/watch?v=R0bgEq8tT_A&list=PLmY5AEiqDWwA95rq9NnDTvKnnF_D7_Ax0&index=1).<br>

## Requisitos

* Conferir a versão do Node.js 22 ou superior: node -v
* Conferir se está instalado o npx: npx -v
* Conferir se está instalado o GIT: git -v

## Como rodar o projeto baixado

Baixar os arquivos do GitHub.
```
git clone <repositorio_url> .
```
```
git clone https://github.com/celkecursos/tutorial-aula-crud-react19-typescript.git .
```

Alterar o endereço da API no arquivo src/services/api.tsx.

Instalar todas as dependências indicadas pelo package.json.
```
npm install
```

Rodar o projeto React.
```
npm run dev
```

Acessar no navegador a URL.
```
http://localhost:3000
```

## Sequencia para criar o projeto

Criar o projeto com React e Next.js. O ponto "." indica que deve ser criado no próprio diretório. 
```
npx create-next-app@latest .
```

Rodar o projeto React.
```
npm run dev
```

Acessar no navegador a URL.
```
http://localhost:3000
```

Pacote para conectar a aplicação à API.
```
npm install axios
```

## Como enviar o projeto para o GitHub.

Inicializar um novo repositorio GIT.
```
git init
```

Alterar o usuário globalmente "--global" (para todos os repositórios) ou alterar o usuário apenas para um repositório "--local".
```
git config --global user.name "SeuNomeDeUsuario"
git config --global user.email "seuemail@exemplo.com"
```

Adicionar todos os arquivos modificados na área de preparação.
```
git add .
```

Commit registra as alterações feitas nos arquivos que foram adicionados na área de preparação.
```
git commit -m "Base do projeto"
```

Verificar em qual branch está.
```
git branch
```

Renomear a branch atual no GIT para main.
```
git branch -M main
```

Adicionar um repositório remoto ao repositório local.
```
git remote add origin https://github.com/celkecursos/tutorial-aula-crud-react19-typescript.git
```

Enviar os commits locais para um repositório remoto.
```
git push -u origin main
```

## Autor

Este projeto foi desenvolvido por [Cesar Szpak](https://github.com/cesarszpak) e está hospedado no repositório da organização [Celke](https://github.com/celkecursos).

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE.txt) para mais detalhes.