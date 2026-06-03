# Kessler OS

O Kessler OS é um app mobile sobre um problema que quase nunca aparece no nosso dia a dia, mas que já faz parte da infraestrutura do planeta: o acúmulo de objetos abandonados em órbita.

A ideia do projeto é transformar esse tema em uma experiência visual e fácil de explorar. O usuário consegue ver objetos orbitais, entender níveis de risco, comparar prioridades, simular respostas de missão e imaginar como parte desse material poderia ser reaproveitado no futuro.

O app foi desenvolvido com React Native, Expo SDK 55 e TypeScript para a Global Solution, conectando tecnologia mobile, dados externos, persistência local e conceitos da indústria espacial.

> O Kessler OS é um MVP acadêmico. Ele não substitui sistemas reais de previsão de colisão, conformidade legal ou planejamento operacional de missões espaciais.

## Integrantes

Preencha com os dados do grupo antes da entrega.

| Nome | RM |
| --- | --- |
| Integrante 1 | RM |
| Integrante 2 | RM |
| Integrante 3 | RM |
| Integrante 4 | RM |
| Integrante 5 | RM |

## Por que esse projeto existe

Satélites, estágios de foguetes e fragmentos antigos continuam circulando a Terra mesmo depois do fim de suas missões. Alguns são inofensivos por enquanto. Outros podem se tornar risco para novas missões, comunicações, observação da Terra e infraestrutura espacial.

O Kessler OS organiza esse cenário em uma jornada simples:

- primeiro, o usuário entende o problema;
- depois, explora objetos em órbita;
- em seguida, compara risco e prioridade;
- por fim, simula decisões e avalia possibilidades de reaproveitamento.

## Relação com a Indústria Espacial

O projeto conversa diretamente com temas da economia espacial:

- satélites e detritos orbitais;
- monitoramento orbital;
- infraestrutura espacial;
- sustentabilidade;
- prevenção de novos resíduos;
- economia circular aplicada ao espaço.

## ODS Relacionados

- ODS 9 — Indústria, inovação e infraestrutura.
- ODS 11 — Cidades e comunidades sustentáveis.
- ODS 13 — Ação contra a mudança global do clima.

## O que o app faz

- Mostra uma Home visual para apresentar o problema.
- Exibe um Mapa Orbital com busca, filtros e seleção interativa.
- Mostra uma Ficha do Objeto com dados, pontuações e relatório.
- Organiza uma Fila de Prioridade com busca, filtros e ordenação para comparar objetos que merecem atenção.
- Simula missões de monitoramento, inspeção, desvio, retirada de órbita, captura e reciclagem.
- Estima possibilidades de Reaproveitamento Orbital.
- Explica práticas de Prevenção para missões mais responsáveis.
- Resume o projeto em um Painel de Impacto.
- Salva cenários localmente com AsyncStorage e mantém um histórico recente no dispositivo.
- Consome dados externos da CelesTrak, com fallback local para manter a demo funcionando.

## Tecnologias Utilizadas

- React Native
- Expo SDK 55
- TypeScript
- Expo Router
- React Navigation
- AsyncStorage
- Fetch API
- React Native Reanimated
- Expo Image
- Expo Linear Gradient
- Vitest

## Estrutura do Projeto

```txt
src/
├── app/
├── components/
├── config/
├── content/
├── data/
├── domain/
├── features/
├── hooks/
├── services/
├── theme/
└── types/
```

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npm run start
```

Rodar no Android:

```bash
npm run android
```

Rodar no iOS:

```bash
npm run ios
```

Rodar no Web:

```bash
npm run web
```

Gerar uma versão Web estática:

```bash
npm run export:web
```

## Scripts Úteis

```bash
npm run lint
npm run typecheck
npm run test
npm run qa
npm run smoke:routes
```

O smoke test precisa de um servidor Expo rodando. Para apontar para uma porta específica:

```bash
EXPO_SMOKE_BASE_URL=http://localhost:8081 npm run smoke:routes
```

## Rotas Principais

- `/` — Home
- `/orbit` — Mapa Orbital
- `/orbit/obj-envisat` — Ficha de exemplo
- `/priority` — Fila de Prioridade
- `/missions` — Simulador de Missão
- `/circular` — Reaproveitamento Orbital
- `/prevention` — Central de Prevenção
- `/impact` — Painel de Impacto

## Prints da Aplicação

Cole os prints da aplicação nos espaços abaixo antes da entrega.

### Print 1 — Home

> Cole aqui o print da Home.

### Print 2 — Mapa Orbital

> Cole aqui o print do Mapa Orbital.

### Print 3 — Ficha do Objeto

> Cole aqui o print da Ficha do Objeto.

### Print 4 — Simulador de Missão

> Cole aqui o print do Simulador de Missão.

### Print 5 — Reaproveitamento Orbital

> Cole aqui o print da tela de Reaproveitamento Orbital.

### Print 6 — Mobile

> Cole aqui um print da aplicação rodando em modo mobile.

## Dados e Limites do Protótipo

- A API CelesTrak é usada para buscar dados GP/TLE quando disponível.
- Dados locais simulados continuam no app como fallback seguro para apresentação.
- As pontuações são determinísticas e servem para comparação no protótipo.
- As estimativas de material são simplificadas e não representam composição confirmada.
- Os relatórios são templates determinísticos, não respostas de IA em tempo real.

## Entrega

- O repositório deve conter o código-fonte completo.
- A pasta `node_modules` não deve ser enviada ao GitHub.
- As instruções de execução estão neste README.
- Os prints e dados dos integrantes devem ser preenchidos antes da entrega final.
