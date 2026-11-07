# Portfólio — Natã Pires

Portfólio pessoal de Natã Pires, com apresentação profissional, experiência, projetos freelance e formas de contato.

A interface oferece temas claro e escuro, segue a preferência do sistema na primeira visita e salva a escolha feita pelo visitante.
Os projetos são exibidos em um carrossel manual com setas e indicadores, compatível com teclado e telas pequenas.
O formulário de integração de projetos, currículo e WhatsApp fica em `site-config.js`; os links opcionais só aparecem quando os dados necessários forem preenchidos.

## Tecnologias

- HTML semântico
- CSS responsivo
- JavaScript nativo

O projeto não requer instalação de dependências nem etapa de build. Para visualizar, abra `index.html` no navegador ou publique os arquivos em um serviço de hospedagem estática.

## Navegação por endereço

As seções podem ser acessadas por caminhos como `/sobre`, `/experiencia`, `/projetos` e `/contato`, sem fragmentos `#`. O `vercel.json` encaminha esses caminhos para `index.html`, permitindo abrir ou atualizar cada endereço diretamente na hospedagem Vercel.

## Configurações a preencher

Edite `site-config.js`:

- `siteUrl`: domínio público completo do portfólio, começando com `https://` (configurado como `https://natapiresdev.com.br/`).
- `socialImageUrl`: URL pública HTTPS da imagem para previews sociais. Se ficar vazio e `siteUrl` for informado, a foto `assets/images/Nata.png` será usada.
- `resumeUrl`: caminho do PDF dentro do site. Já está configurado para o currículo atual em `assets/`.
- `whatsappNumber`: número com código do país e DDD, somente dígitos. O botão só aparece com um número válido (já configurado).
- `projects.sabrina.url`: endereço HTTPS da landing page (já configurado).
- `projects.sabrina.repositoryUrl`: repositório HTTPS, se puder ser divulgado (opcional).
- `projects.sabrina.image`: caminho relativo da captura de tela ou URL HTTPS da imagem do projeto.
- `projects.sabrina.description`: resumo curto do projeto.
- `projects.sabrina.role`: sua participação no desenvolvimento.
- `projects.sabrina.challenge`: necessidade ou desafio que o projeto resolveu.
- `projects.sabrina.technologies`: tecnologias efetivamente usadas, em uma lista de textos. Não inclua ferramentas que não fizeram parte do projeto.

O case da Sabrina só é adicionado ao carrossel quando URL, imagem, resumo, atuação e desafio estiverem preenchidos. Os links de currículo e WhatsApp também permanecem ocultos até serem configurados.

Para compatibilidade com geradores de preview que não executam JavaScript, depois de publicar, copie o domínio final para `siteUrl` e atualize `og:url` e `og:image` no `<head>` de `index.html` com URLs absolutas HTTPS do site e da imagem.

## Projetos em destaque

- [Dra. Beatriz Cardoso](https://drabeatrizcardoso.vercel.app/) — página de links para agendamento, pedidos e loja.
- [Plann.er API](https://github.com/Natapires/Plann.er) — API para gerenciamento de viagens.
- Gerenciador de clientes e ambientes — painel para organizar ambientes e acompanhar tarefas, acessos e tickets.
- [Landing page Sabrina Duarte](https://sabrinaduarte.vercel.app/) — página de serviços, valores e inspirações com contato pelo WhatsApp.

## Contato

- [GitHub](https://github.com/Natapires)
- [LinkedIn](https://www.linkedin.com/in/natapiresferreira/)
- [E-mail](mailto:pires.nata1998@gmail.com)

## Teste rápido com usuários

Compartilhe a página em um celular e peça a duas pessoas para navegar sem orientação. Pergunte:

1. Ficou claro com o que trabalho e que tipo de projeto freelance faço?
2. Você conseguiu encontrar um projeto e abrir o site ou o código dele?
3. Foi fácil encontrar uma forma de entrar em contato?
4. Algo ficou difícil de ler ou usar no celular?

Anote as dificuldades observadas e ajuste primeiro os problemas que se repetirem.
