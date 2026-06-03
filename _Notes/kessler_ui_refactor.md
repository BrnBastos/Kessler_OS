# Kessler OS — Guia de Upgrade Visual, UX/UI e Conteúdo PT-BR

> **Objetivo:** transformar o Kessler OS em uma experiência visual moderna, emocional e mobile-first, usando as imagens geradas em `assets/` como parte central da narrativa do site.

---

## 1. Direção principal

O Kessler OS não deve parecer um painel técnico antigo.

Ele deve parecer uma experiência visual sobre o futuro da órbita da Terra: bonita, clara, humana, chamativa e fácil de entender mesmo para alguém que nunca estudou lixo espacial.

A proposta não é remover a parte técnica. A proposta é mudar a ordem da experiência:

1. Primeiro o usuário se interessa.
2. Depois entende o problema.
3. Depois explora os dados.
4. Depois vê objetos reais/simulados em órbita.
5. Depois entende risco, prevenção, missão e reaproveitamento.

O site deve vender uma sensação:

> “O espaço ao redor da Terra está ficando cheio. O Kessler OS ajuda a enxergar, entender e decidir o que fazer com isso.”

---

## 2. Decisões obrigatórias

### 2.1 Tema único

O site terá apenas **um tema visual**.

- Não implementar alternância Light/Dark.
- Tratar o tema atual como a identidade principal.
- Refinar esse tema para ficar mais premium, visual e cinematográfico.
- Manter fundo escuro, azul profundo, tons espaciais e acentos em ciano/azul.

O tema deve ser escuro, mas não pesado demais. Ele precisa ter contraste, respiro e áreas com luz visual usando imagens, gradientes e cards bem espaçados.

---

### 2.2 Idioma

Todo o site deve estar em **português do Brasil**.

Não deixar textos em inglês espalhados pela interface.

Traduzir:

- navegação;
- botões;
- cards;
- títulos;
- descrições;
- empty states;
- mensagens de loading;
- textos educativos;
- labels técnicos;
- páginas internas;
- tooltips;
- footer;
- modais;
- menus;
- componentes de erro;
- nomes de seções.

Exceção: termos técnicos muito conhecidos podem manter o nome original quando fizer sentido, mas sempre com explicação simples.

Exemplos:

- `Orbital Map` → **Mapa Orbital**
- `Object Passport` → **Ficha do Objeto**
- `Risk Score` → **Nível de Risco**
- `Mission Simulator` → **Simulador de Missão**
- `Circular Economy` → **Reaproveitamento Orbital**
- `Priority Queue` → **Fila de Prioridade**
- `Tracked Objects` → **Objetos Monitorados**
- `Reusable Mass Potential` → **Potencial de Reaproveitamento**

---

## 3. Tom de linguagem

O conteúdo atual deve ser simplificado.

Não escrever como artigo científico.  
Não escrever como documentação técnica.  
Não escrever como texto de IA cheio de palavras genéricas.

Escrever como um produto moderno explicando um problema complexo de forma clara.

### 3.1 Como deve soar

- humano;
- direto;
- curioso;
- levemente dramático;
- educativo;
- acessível;
- visual;
- confiante.

### 3.2 Como não deve soar

Evitar textos como:

> “A plataforma realiza análise integrada de detritos orbitais por meio de modelos de priorização e avaliação de sustentabilidade espacial.”

Trocar por algo como:

> “A órbita da Terra está ficando cheia. Aqui veremos quais objetos merecem atenção antes que virem problema.”

Evitar:

> “Sistema de avaliação de risco baseado em parâmetros orbitais e metadados de objetos catalogados.”

Trocar por:

> “Veja quais objetos estão próximos demais, antigos demais ou perigosos demais para serem ignorados.”

Evitar:

> “Economia circular aplicada à reutilização de massa orbital.”

Trocar por:

> “Nem tudo que está abandonado no espaço precisa ser visto como lixo. Algumas peças podem virar recurso.”

---

## 4. Inspiração visual

Usar sites modernos como referência de qualidade, mas sem copiar.

### 4.1 Inspiração: Lando Norris

Usar como referência para:

- hero visual forte;
- imagens grandes;
- seções com impacto;
- movimento;
- personalidade;
- ritmo de rolagem;
- cards com presença;
- transições marcantes;
- experiência visual que parece viva.

Não copiar automobilismo, cores de corrida ou estética esportiva literalmente.

A lógica a copiar é:

> imagem grande + energia + interação + seções com personalidade.

Para o Kessler OS, isso deve virar:

> espaço + risco orbital + ciência + futuro + reaproveitamento + imagens cinematográficas.

---

### 4.2 Inspiração: Apple

Usar como referência para:

- espaçamento grande;
- hierarquia visual limpa;
- uma mensagem forte por seção;
- texto curto;
- produto apresentado com beleza;
- navegação simples;
- imagens de alta qualidade;
- sensação premium;
- confiança visual.

Não deixar o site vazio demais.  
O Kessler precisa ser moderno, mas também precisa parecer rico visualmente.

A lógica é:

> menos texto, mais impacto.

---

## 5. Estratégia de imagens

Foram adicionadas dezenas de imagens geradas em `assets/`.

Essas imagens devem ser usadas como parte real da interface, não apenas como decoração aleatória.

### 5.1 Tipos de imagem

Usar as imagens em quatro categorias:

#### 1. Backgrounds de seção

Imagens grandes, horizontais, cinematográficas.

Usar em:

- hero;
- problema inicial;
- controle orbital;
- reciclagem espacial;
- futuro da infraestrutura orbital;
- impacto na Terra.

Aplicar overlay escuro para manter texto legível.

---

#### 2. Imagens complementares de cards

Imagens menores dentro de cards.

Usar em:

- prevenção;
- risco;
- missão;
- reaproveitamento;
- tecnologia;
- educação;
- impacto na Terra.

Cards devem ter pouco texto e imagem dominante.

---

#### 3. Objetos em PNG sem fundo

Usar PNGs transparentes para representar objetos na órbita.

Usar em:

- Ficha do Objeto;
- cards de objetos monitorados;
- mapa orbital;
- exemplos de satélites;
- comparação entre tipos de detritos;
- cards de “objeto de alto risco”.

Esses PNGs devem parecer integrados ao layout, com sombra/glow sutil, não colados de qualquer jeito.

---

#### 4. Imagens humanas

Usar imagens com pessoas para humanizar o projeto.

Exemplos:

- cientistas em observatório;
- sala de controle;
- criança olhando o céu;
- engenheiros analisando peça espacial;
- cidade dependente de satélites.

Essas imagens servem para mostrar que o problema não é só técnico. Ele afeta pessoas, infraestrutura, ciência, futuro e vida na Terra.

---

## 6. Regra de ouro para imagens

Cada imagem precisa ter função.

Não usar imagem só para enfeitar.

Toda imagem deve responder uma pergunta:

- Esta imagem ajuda o usuário a entender o problema?
- Esta imagem cria emoção?
- Esta imagem mostra valor?
- Esta imagem reduz a necessidade de texto?
- Esta imagem deixa a tela mais memorável?

Se a resposta for “não”, não usar.

---

## 7. Estrutura visual sugerida da Home

A Home deve ser reconstruída como uma página narrativa.

Ela não deve começar como dashboard.

### 7.1 Hero

**Objetivo:** impressionar e explicar em segundos.

Layout mobile:

- imagem de fundo forte;
- overlay escuro;
- título grande;
- subtítulo curto;
- botão principal;
- botão secundário opcional;
- scroll indicator discreto.

Texto sugerido:

```txt
A órbita da Terra está ficando cheia.
```

Subtexto:

```txt
O Kessler OS transforma dados sobre lixo espacial em uma experiência visual para entender riscos, objetos e possibilidades de reaproveitamento.
```

Botões:

```txt
Explorar o mapa
Entender o problema
```

---

### 7.2 Seção “O problema acima de nós”

**Objetivo:** explicar o problema para leigos.

Usar uma imagem humana ou espacial forte.

Texto sugerido:

```txt
Satélites antigos, pedaços de foguetes e fragmentos pequenos continuam circulando a Terra por anos. Alguns são invisíveis para nós, mas perigosos para missões, comunicação, GPS, internet e monitoramento climático.
```

Cards curtos:

- **Órbita congestionada**
- **Risco de colisão**
- **Impacto na Terra**

Cada card com imagem ou ícone visual.

---

### 7.3 Seção “Veja o que está em órbita”

**Objetivo:** levar para o mapa orbital.

Visual:

- prévia grande do mapa;
- objeto PNG flutuando;
- linhas orbitais sutis;
- cards com 2 ou 3 dados simples.

Texto sugerido:

```txt
Explore objetos monitorados e entenda o que cada um representa: satélite ativo, satélite morto, corpo de foguete, fragmento ou candidato a reaproveitamento.
```

CTA:

```txt
Abrir mapa orbital
```

---

### 7.4 Seção “Do dado à decisão”

**Objetivo:** mostrar inteligência sem parecer técnico demais.

Cards:

1. **Risco**
   - “Quais objetos merecem atenção primeiro?”

2. **Prioridade**
   - “O que pode causar mais impacto se for ignorado?”

3. **Missão**
   - “Vale a pena simular remoção, inspeção ou reaproveitamento?”

Usar menos números. Mais explicação visual.

---

### 7.5 Seção “Nem todo lixo é só lixo”

**Objetivo:** destacar o diferencial do projeto.

Usar imagens de reciclagem espacial e laboratório.

Texto sugerido:

```txt
Alguns objetos abandonados podem carregar materiais, estruturas e componentes úteis. O Kessler OS imagina como transformar parte desse abandono em recurso para futuras missões.
```

Cards:

- **Metal recuperável**
- **Peças reaproveitáveis**
- **Infraestrutura orbital**
- **Menos desperdício na Terra**

---

### 7.6 Seção “Para quem serve”

**Objetivo:** aproximar do público.

Cards ou blocos:

- estudantes;
- pesquisadores;
- professores;
- equipes de inovação;
- público curioso;
- empresas espaciais simuladas;
- gestores de risco orbital.

Texto simples:

```txt
Criado para transformar um tema complexo em algo que qualquer pessoa consiga explorar, entender e apresentar.
```

---

### 7.7 Final CTA

Imagem forte + frase curta.

```txt
O futuro da órbita depende do que fazemos agora.
```

Botão:

```txt
Começar exploração
```

---

## 8. Mobile-first absoluto

O site deve ser pensado primeiro para smartphone.

A versão web é importante, mas a experiência mobile deve ser bonita de verdade, não apenas “funcionar”.

### 8.1 Regras mobile

- layout em uma coluna;
- hero impactante logo no primeiro scroll;
- imagens grandes, bem cortadas;
- botões grandes;
- texto curto;
- cards com bastante respiro;
- nada de tabela larga;
- nada de componente espremido;
- navegação simples;
- altura de toque confortável;
- rolagem fluida;
- contraste forte;
- títulos visíveis sem esforço.

### 8.2 Tamanhos recomendados

- padding lateral mobile: `20px` a `24px`;
- espaçamento entre seções: `72px` a `112px`;
- border radius de cards: `24px` a `32px`;
- botão principal: mínimo `48px` de altura;
- hero mobile: entre `80vh` e `100vh`;
- cards com imagem: imagem ocupando pelo menos 45% do card;
- texto por card: no máximo 2 a 3 linhas.

### 8.3 Navegação mobile

Preferir:

- header simples;
- logo Kessler OS;
- botão de menu;
- CTA pequeno ou escondido;
- menu fullscreen bonito.

Evitar:

- navbar cheia;
- muitos links;
- menus técnicos demais;
- botões pequenos.

---

## 9. Web como versão expandida

Na web, aproveitar mais espaço.

### 9.1 Regras web

- hero em tela cheia;
- imagens de fundo grandes;
- grids de 2 ou 3 colunas;
- seções alternadas;
- cards largos;
- previews visuais;
- objetos PNG flutuando;
- navegação fixa e limpa;
- efeitos de hover;
- transições suaves.

A web deve parecer uma versão mais cinematográfica da experiência mobile.

---

## 10. Componentes a melhorar

### 10.1 Header

Deve ser minimalista.

Links sugeridos:

- Início
- Mapa Orbital
- Objetos
- Missões
- Reaproveitamento

Botão:

- Explorar

---

### 10.2 Cards

Cards devem ser mais visuais.

Estrutura ideal:

1. imagem ou PNG;
2. título curto;
3. frase simples;
4. microação opcional.

Exemplo:

```txt
Satélite desativado
Objeto sem função ativa que ainda ocupa espaço e pode representar risco.
```

---

### 10.3 Object Card

Para cards de objetos orbitais:

- PNG do objeto em destaque;
- nome do objeto;
- tipo;
- nível de risco;
- status;
- botão “Ver ficha”.

Evitar excesso de dados técnicos no card.  
Detalhes ficam na ficha.

---

### 10.4 Ficha do Objeto

A ficha deve parecer uma página de produto.

Topo:

- PNG grande do objeto;
- nome;
- tipo;
- status;
- risco;
- CTA.

Depois:

- resumo simples;
- dados orbitais;
- origem;
- risco;
- possibilidade de reaproveitamento;
- observações.

Usar acordeões para detalhes técnicos.

---

### 10.5 Seção de Reaproveitamento

Esta deve ser uma das partes mais bonitas do site.

Usar:

- imagens de laboratório;
- imagens de reciclagem orbital;
- cards de material;
- antes/depois;
- etapas simples.

Exemplo de fluxo:

```txt
Objeto abandonado → inspeção → separação → material útil → nova estrutura
```

---

### 10.6 Mapa Orbital

O mapa pode continuar técnico, mas precisa ter entrada mais amigável.

Antes do mapa, mostrar:

```txt
Aqui você explora objetos que ainda circulam a Terra.
Clique em um ponto para entender o que ele é, de onde veio e por que importa.
```

No mobile:

- mapa acima;
- filtros abaixo;
- lista de objetos em cards;
- evitar painel lateral apertado.

---

## 11. Movimento e interação

Adicionar movimento com cuidado.

### Usar

- parallax leve em backgrounds;
- imagem revelando ao scroll;
- cards entrando suavemente;
- hover em objetos PNG;
- brilho sutil em orbit lines;
- transições entre seções;
- botão com microinteração;
- menu mobile animado.

### Não usar

- animações exageradas;
- excesso de partículas;
- tudo se mexendo o tempo todo;
- scroll pesado no mobile;
- WebGL obrigatório em todas as telas.

Movimento precisa reforçar a sensação de espaço, não atrapalhar a leitura.

---

## 12. Uso dos assets

Organizar os assets para não virar bagunça.

Sugestão:

```txt
assets/
  backgrounds/
    hero/
    problem/
    mission/
    recycling/
    earth-impact/

  objects/
    satellites/
    rocket-bodies/
    fragments/
    historical/
    service-vehicles/

  cards/
    prevention/
    risk/
    reuse/
    education/

  humans/
    observatory/
    mission-control/
    lab/
    city/
    family/
```

Criar um arquivo de mapeamento:

```ts
src/config/visualAssets.ts
```

Responsabilidade:

- centralizar nomes;
- evitar importações espalhadas;
- facilitar troca de imagens;
- organizar uso por seção.

Exemplo:

```ts
export const visualAssets = {
  hero: {
    orbit: require("@/assets/backgrounds/hero/orbit-earth.jpg"),
  },
  objects: {
    damagedSatellite: require("@/assets/objects/satellites/damaged-satellite.png"),
    rocketBody: require("@/assets/objects/rocket-bodies/rocket-body.png"),
  },
  sections: {
    recycling: require("@/assets/backgrounds/recycling/orbital-recycling.jpg"),
    missionControl: require("@/assets/humans/mission-control/mission-control.jpg"),
  },
};
```

---

## 13. Conteúdo em PT-BR — exemplos prontos

### Hero

```txt
A órbita da Terra está ficando cheia.
```

```txt
O Kessler OS ajuda a visualizar objetos abandonados no espaço, entender riscos e imaginar como parte desse material pode ser reaproveitada no futuro.
```

---

### Problema

```txt
O lixo espacial não aparece no céu como fumaça ou plástico no oceano. Mesmo assim, ele está lá: satélites antigos, pedaços de foguetes e fragmentos viajando em alta velocidade ao redor da Terra.
```

---

### Mapa

```txt
Cada ponto no mapa representa uma história: um objeto lançado, uma missão encerrada, uma peça esquecida ou um risco que precisa ser observado.
```

---

### Risco

```txt
Nem todo objeto é igualmente perigoso. O Kessler OS organiza os casos mais importantes para ajudar o usuário a entender o que merece atenção primeiro.
```

---

### Reaproveitamento

```txt
No futuro, parte do lixo espacial pode deixar de ser apenas um problema e se tornar matéria-prima para novas estruturas, missões e tecnologias em órbita.
```

---

### Educação

```txt
Cuidar da órbita começa antes do lançamento. Prevenir novos resíduos é tão importante quanto lidar com os objetos que já estão lá.
```

---

## 14. O que remover ou reduzir

Reduzir:

- textos longos;
- blocos técnicos na Home;
- tabelas na primeira experiência;
- excesso de cards iguais;
- nomes em inglês;
- componentes pequenos;
- densidade visual;
- bordas demais;
- painéis genéricos de dashboard;
- frases abstratas demais.

Remover:

- seções repetidas;
- textos que não explicam valor;
- imagens sem função;
- métricas que não ajudam leigos;
- botões duplicados;
- UI que parece template padrão de IA.

---

## 15. Checklist de qualidade visual

Antes de considerar concluído, verificar:

- O site está 100% em PT-BR?
- A Home impressiona no primeiro scroll?
- O mobile parece planejado, não adaptado?
- As imagens têm função clara?
- Os textos estão curtos?
- Cada seção tem uma mensagem principal?
- Os PNGs dos objetos estão bem integrados?
- A navegação está simples?
- O tema único está consistente?
- O usuário leigo entende o projeto?
- O site parece moderno, não genérico?
- O site parece produto real, não trabalho escolar?

---

## 16. Ordem recomendada de implementação

### Etapa 1 — Limpeza de idioma

- Traduzir textos para PT-BR.
- Centralizar strings importantes.
- Remover inglês da navegação e componentes.

Resultado esperado:

> Site coerente em português.

---

### Etapa 2 — Tema único e tokens

- Remover lógica de light/dark se existir.
- Consolidar tema escuro.
- Melhorar tokens de cor, espaço, radius e tipografia.

Resultado esperado:

> Visual mais consistente e premium.

---

### Etapa 3 — Home mobile-first

- Recriar a Home como narrativa.
- Usar assets como background.
- Reduzir texto.
- Criar seções grandes e visuais.

Resultado esperado:

> Primeira tela forte e moderna no smartphone.

---

### Etapa 4 — Cards e objetos

- Criar cards visuais.
- Integrar PNGs transparentes.
- Melhorar cards de objetos.
- Evitar visual de tabela no mobile.

Resultado esperado:

> Interface mais rica e fácil de explorar.

---

### Etapa 5 — Reaproveitamento orbital

- Criar seção forte de economia circular.
- Usar imagens de reciclagem espacial.
- Explicar com narrativa simples.

Resultado esperado:

> Diferencial do projeto fica claro.

---

### Etapa 6 — Mapa e páginas internas

- Manter funcionalidades.
- Melhorar entrada visual.
- Adaptar layout mobile.
- Usar cards e painéis progressivos.

Resultado esperado:

> Dados técnicos ficam mais acessíveis.

---

### Etapa 7 — Polimento

- Ajustar espaçamentos.
- Adicionar microinterações.
- Testar mobile.
- Testar web.
- Verificar performance de imagens.

Resultado esperado:

> Experiência final mais chamativa, moderna e apresentável.

---

## 17. Prompt para IA/Dev aplicar este upgrade

Use este prompt junto do guia do projeto:

```txt
Refatore o website do Kessler OS seguindo este guia de upgrade visual.

Mantenha apenas o tema atual como tema único do site. Não implemente light/dark mode. Melhore esse tema escuro para parecer mais premium, cinematográfico e moderno.

Traduza toda a interface para português do Brasil. Não deixe textos soltos em inglês. Simplifique os textos para uma pessoa leiga entender rapidamente o que é lixo espacial, por que isso importa e como o Kessler OS ajuda.

O objetivo principal é fazer um super upgrade de UI/UX. A experiência deve parecer mais visual e energética, inspirada em sites modernos e interativos como o do Lando Norris, com imagens grandes, movimento, personalidade e seções memoráveis. Também use princípios de sites premium como Apple: hierarquia clara, muito respiro, textos curtos e uma mensagem forte por seção.

Não copie nenhum site literalmente. Use as referências apenas para qualidade visual, ritmo, espaçamento, imagens grandes e sensação de produto moderno.

Use as dezenas de imagens geradas que estão em assets/. Elas devem aparecer no site como:
- backgrounds de seções;
- imagens complementares de cards;
- imagens humanas para criar conexão emocional;
- PNGs transparentes para representar objetos em órbita;
- visuais para reciclagem/reaproveitamento orbital.

Reorganize a Home para ser uma narrativa visual, não um dashboard técnico. O dashboard, mapa e dados técnicos devem vir depois que o usuário já entendeu o problema.

Priorize smartphone acima de tudo. O site precisa ser lindo, confortável e planejado no mobile. A web é importante, mas mobile é prioridade.

Aplique:
- mais espaçamento;
- menos texto;
- títulos mais fortes;
- imagens maiores;
- cards mais visuais;
- melhor uso dos PNGs;
- navegação simples;
- seções com fundo visual;
- overlays para legibilidade;
- microinterações leves;
- melhor responsividade.

Evite aparência genérica de IA. Evite cards iguais demais, textos longos, dashboard denso e visual técnico antigo.

Mantenha as funcionalidades existentes, mas melhore a forma como elas são apresentadas.
```

---

## 18. Resultado esperado

Depois desse upgrade, o Kessler OS deve parecer:

- mais moderno;
- mais visual;
- mais humano;
- mais fácil de entender;
- mais chamativo;
- mais profissional;
- mais forte para apresentação;
- mais bonito no smartphone;
- menos técnico no primeiro contato;
- menos genérico;
- mais memorável.

A sensação final deve ser:

> “Isso parece um produto real sobre o futuro da órbita da Terra.”
