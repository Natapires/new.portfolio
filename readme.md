# Portfólio — Natã Pires

Site pessoal para apresentar minha atuação profissional, experiência, projetos de desenvolvimento e formas de contato.

**Site:** [natapiresdev.vercel.app](https://natapiresdev.vercel.app/)

## Sobre o site

- Layout responsivo feito com HTML semântico, CSS e JavaScript nativo.
- Temas claro e escuro, com preferência salva no navegador.
- Navegação entre seções sem recarregar a página.
- Navegação pelas seções com URLs limpas: `/sobre`, `/experiencia`, `/projetos` e `/contato`.
- Carrossel de projetos com controles por teclado e toque.
- Links de currículo e WhatsApp exibidos quando configurados.

## Visualizar localmente

O projeto não requer dependências nem etapa de build. Abra `index.html` no navegador para ver a página. O Live Server não aplica o `vercel.json`; portanto, ao testar nele, as URLs das seções podem não funcionar ao recarregar ou abrir diretamente. Teste os caminhos limpos na implantação da Vercel ou com um servidor configurado para reescrevê-los.

## Publicação

O site pode ser publicado como um projeto estático, sem comando de build. Na Vercel, `vercel.json` encaminha as URLs das seções para `index.html`, permitindo navegar, abrir diretamente e recarregar endereços como `/sobre` e `/projetos`.

## Configuração do site

Edite `site-config.js` para ajustar as integrações:

| Propriedade | Uso |
| --- | --- |
| `siteUrl` | URL pública do portfólio, usada nos metadados e links canônicos. |
| `socialImageUrl` | Imagem para previews sociais. Se estiver vazia, é usada `assets/images/Nata.png`. |
| `resumeUrl` | Caminho do PDF do currículo dentro do site. |
| `whatsappNumber` | Número com código do país e DDD, somente dígitos. |
| `projects.sabrina.url` | Endereço público da landing page da Sabrina. |
| `projects.sabrina.repositoryUrl` | Repositório do projeto, se puder ser divulgado. |
| `projects.sabrina.image` | Caminho ou URL da imagem usada no cartão do projeto. |
| `projects.sabrina.description` | Descrição curta do projeto. |
| `projects.sabrina.role` | Atuação no desenvolvimento. |
| `projects.sabrina.challenge` | Desafio ou objetivo do projeto. |
| `projects.sabrina.technologies` | Lista das tecnologias usadas. |

O cartão da Sabrina só aparece quando seus campos obrigatórios estão preenchidos. Os projetos apresentados diretamente no HTML são editados em `index.html`.

Ao alterar o domínio do site ou a imagem de preview, atualize também os metadados correspondentes no `<head>` de `index.html`, para que previews gerados sem executar JavaScript mostrem as informações corretas.

## Estrutura principal

```text
.
├── assets/       # Imagens, ícone e currículo
├── index.html    # Conteúdo e cartões dos projetos estáticos
├── script.js     # Navegação, tema, carrossel e integrações
├── site-config.js
├── style.css     # Estilos responsivos e temas
└── vercel.json   # Regras das URLs amigáveis na Vercel
```

## Contato

- [GitHub](https://github.com/Natapires)
- [LinkedIn](https://www.linkedin.com/in/natapiresferreira/)
- [E-mail](mailto:pires.nata1998@gmail.com)
