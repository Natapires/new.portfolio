// script.js

// 1. Seleciona os elementos
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');

// 2. Adiciona o "ouvinte" de clique
darkModeToggle.addEventListener('click', () => {
    
    // 3. Adiciona/Remove a classe 'dark-mode' do <body>
    body.classList.toggle('dark-mode');

    // 4. Muda o ícone do botão
    // Seleciona o ícone DENTRO do botão
    const icone = darkModeToggle.querySelector('i');

    if (body.classList.contains('dark-mode')) {
        // Se ESTÁ em dark mode, mostra o ícone do SOL
        icone.classList.remove('fa-moon');
        icone.classList.add('fa-sun');
    } else {
        // Se NÃO ESTÁ em dark mode, mostra o ícone da LUA
        icone.classList.remove('fa-sun');
        icone.classList.add('fa-moon');
    }
});
/*===== TOGGLE ICON NAVBAR =====*/
// Toggle para ativar/desativar a navegação

/*const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-times');  // Alterna o ícone para "fechar"

    // Alterna a visibilidade do menu
    navbar.classList.toggle('active'); 

    // Se a tela for maior que 768px, o menu deve permanecer visível sem alterar a estrutura
    if (window.innerWidth > 768) {
        navbar.style.display = 'flex';
    } else {
        // Se o menu for clicado em telas menores, a visibilidade muda
        if (navbar.classList.contains('active')) {
            navbar.style.display = 'block';
        } else {
            navbar.style.display = 'none';
        }
    }
}); */