Meu Laboratório

Este repositório contém um site estático para apresentar projetos, experimentos e criações em biologia, tecnologia, música e outras áreas.

O que foi melhorado (atualização automática):

- Filtros por categorias (Biologia, TI, Música, Arte e Todas)
- Modal de detalhe do projeto com imagem e link
- Formulário para adicionar projetos localmente (salva no navegador via localStorage)
- Player de sintetizador simples (Web Audio) disponível no modal para testar sons e texturas
- Correção do script de Three.js para usar o bundle carregado via CDN

Como usar

- Edite projects.json para adicionar entradas permanentemente. Cada item do array deve conter: title, category, description, link, image (opcional).
- Você também pode usar o formulário "Adicionar" na página; ele salva temporariamente no seu navegador.

Publicando no GitHub Pages

1. Vá em Settings → Pages no repositório.
2. Escolha a branch: main e a pasta: root (/).
3. Salve; o site ficará disponível em https://brued25.github.io/meulaboratorio (pode levar alguns minutos).

Deseja que eu agora:
- Adicione uma galeria de imagens por projeto (criar diretório /assets com imagens)?
- Crie páginas individuais (projects/<slug>/index.html) para projetos que precisam de documentação?
- Integre um player de áudio com uploads (isso exigirá back-end ou armazenamento externo)?

Diga qual próximo passo prefere e eu implemento.