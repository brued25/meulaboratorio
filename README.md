Meu Laboratório

Este repositório contém um site estático para apresentar projetos, experimentos e criações em biologia, tecnologia, música e outras áreas.

Como funciona

- Edite projects.json para adicionar entradas. Cada item do array deve conter: title, category, description, link.
- O site carrega projects.json dinamicamente e mostra cards no grid.

Publicando no GitHub Pages

1. Vá em Settings → Pages no repositório.
2. Escolha a branch: main e a pasta: root (/).
3. Salve; o site ficará disponível em https://brued25.github.io/meulaboratorio (pode levar alguns minutos).

Como editar/expandir

- Para projetos mais complexos, crie uma pasta `projects/<slug>/` com um README.md ou páginas HTML e coloque o link no campo `link` do projects.json.
- Você também pode substituir a renderização para usar Markdown ou um gerador estático (Jekyll, Eleventy) se preferir.

Deseja que eu crie exemplos de páginas individuais para alguns projetos ou adicione um formulário simples para adicionar projetos sem editar JSON?
