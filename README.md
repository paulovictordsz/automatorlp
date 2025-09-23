# Automator LP - Sistema de Landing Pages Modulares

Sistema automatizado para criação de landing pages modulares com carregamento dinâmico de seções. Desenvolvido para facilitar a criação e manutenção de páginas de conversão com arquitetura modular e responsiva.

## 📋 Índice

- [🚀 Como Funciona](#-como-funciona)
- [📁 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [🛠️ Como Adicionar Novas Seções](#️-como-adicionar-novas-seções)
- [🎨 Design System](#-design-system)
- [🎨 Personalização de Cores](#-personalização-de-cores)
- [🔤 Personalização de Fontes](#-personalização-de-fontes)
- [⚡ Performance](#-performance)
- [🔧 Configurações Avançadas](#-configurações-avançadas)
- [🚀 Como Usar](#-como-usar)
- [📱 Responsividade](#-responsividade)
- [⚠️ Observações Importantes](#️-observações-importantes)

## 🚀 Como Funciona

O projeto utiliza um sistema de **includes dinâmicos** que carrega seções HTML individuais de forma automática. Cada seção é um componente independente que pode ser ativado/desativado e reordenado facilmente.

### Arquitetura

```
automatorlp/
├── index.html              # Página principal
├── script.js               # Sistema de carregamento dinâmico
├── sections-config.js      # Configuração das seções
├── styles.css              # Design system global
├── Componentes/            # Seções modulares
│   └── Section1.html       # Exemplo de seção
└── IMG/                    # Assets de imagens
```

### Sistema de Carregamento

1. **Carregamento Automático**: O `script.js` detecta elementos com `data-include` e carrega as seções correspondentes
2. **Configuração Centralizada**: O `sections-config.js` controla quais seções estão ativas e sua ordem
3. **Design System**: O `styles.css` fornece estilos globais e variáveis CSS para consistência

## 📁 Estrutura de Arquivos

### Arquivos Principais

- **`index.html`**: Página principal com estrutura base
- **`script.js`**: Classe `SimpleIncludes` que gerencia o carregamento dinâmico
- **`sections-config.js`**: Configuração das seções e performance
- **`styles.css`**: Design system com variáveis CSS e estilos globais

### Pasta Componentes

Cada seção é um arquivo HTML independente na pasta `Componentes/`:
- **`Section1.html`**: Seção hero com background e CTA
- **`Section2.html`**: (exemplo para futuras seções)
- **`SectionN.html`**: (adicione quantas precisar)

## 🛠️ Como Adicionar Novas Seções

### 1. Criar o Arquivo da Seção

Crie um novo arquivo HTML na pasta `Componentes/`:

```html
<!-- Componentes/Section2.html -->
<div class="section">
    <div class="section-content">
        <h2>Título da Seção</h2>
        <p>Conteúdo da seção...</p>
        <a href="#form" class="cta-button">
            <span class="button-content-wrapper">
                <span class="button-icon">
                    <svg class="arrow-icon" viewBox="0 0 448 512">
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                    </svg>
                </span>
                <span class="button-text">TEXTO DO BOTÃO</span>
            </span>
        </a>
    </div>
</div>

<style>
/* Estilos específicos da seção */
.section {
    background: var(--bg-primary);
    padding: 4rem 0;
}
</style>
```

### 2. Configurar no sections-config.js

Adicione a nova seção no array `SECTIONS_CONFIG`:

```javascript
export const SECTIONS_CONFIG = [
    {
        name: 'Section1',
        folder: 'Section1',
        enabled: true,
        order: 1
    },
    {
        name: 'Section2',        // Nome do arquivo (sem .html)
        folder: 'Section2',      // Pasta (pode ser diferente)
        enabled: true,           // true = ativa, false = desativa
        order: 2                 // Ordem de exibição
    }
];
```

### 3. Incluir no index.html

Adicione a seção no `index.html`:

```html
<main id="main-content">
    <div data-include="Section1"></div>
    <div data-include="Section2"></div>  <!-- Nova seção -->
</main>
```

## 🎨 Design System

O sistema utiliza variáveis CSS centralizadas no arquivo `styles.css` para facilitar a personalização. Todas as cores, fontes e espaçamentos são controlados através de variáveis CSS customizadas.

### Classes Utilitárias

- **`.text-primary`**: Cor primária
- **`.text-secondary`**: Cor secundária
- **`.text-highlight`**: Cor de destaque
- **`.cta-button`**: Botão CTA padrão
- **`.section`**: Container de seção
- **`.section-content`**: Conteúdo centralizado

## 🎨 Personalização de Cores

### Localização das Variáveis

Todas as variáveis de cor estão localizadas no início do arquivo `styles.css`, na seção `:root`:

```css
:root {
    /* Cores principais */
    --primary-color: #EEC169;
    --secondary-color: #0E2A1E;
    --accent-color: #f093fb;
    
    /* Cores de texto */
    --text-color: #333333;
    --text-light: #666666;
    --text-dark: #111111;
    --text-light-bg: #FCFCFC;
    
    /* Cores de fundo */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-dark: #0E2A1E;
    
    /* Cores de realce */
    --highlight-color: #EEC169;
    --success-color: #51cf66;
    --warning-color: #ffd43b;
    --error-color: #ff6b6b;
}
```

### Como Alterar Cores

#### 1. Cores Principais do Site

```css
:root {
    --primary-color: #SUA_COR_PRIMARIA;      /* Cor principal (botões, destaques) */
    --secondary-color: #SUA_COR_SECUNDARIA;  /* Cor secundária (textos escuros) */
    --accent-color: #SUA_COR_ACCENT;         /* Cor de destaque (elementos especiais) */
}
```

#### 2. Cores de Texto

```css
:root {
    --text-color: #SUA_COR_TEXTO;        /* Cor padrão do texto */
    --text-light: #SUA_COR_TEXTO_CLARO;  /* Texto secundário */
    --text-dark: #SUA_COR_TEXTO_ESCURO;  /* Texto principal */
    --text-light-bg: #SUA_COR_TEXTO_FUNDO_CLARO; /* Texto sobre fundo escuro */
}
```

#### 3. Cores de Fundo

```css
:root {
    --bg-primary: #SUA_COR_FUNDO_PRINCIPAL;    /* Fundo principal */
    --bg-secondary: #SUA_COR_FUNDO_SECUNDARIO; /* Fundo secundário */
    --bg-dark: #SUA_COR_FUNDO_ESCURO;          /* Fundo escuro */
}
```

#### 4. Cores de Status

```css
:root {
    --success-color: #SUA_COR_SUCESSO;  /* Verde para sucesso */
    --warning-color: #SUA_COR_AVISO;    /* Amarelo para avisos */
    --error-color: #SUA_COR_ERRO;       /* Vermelho para erros */
}
```

### Exemplo Prático: Tema Escuro

```css
:root {
    /* Cores principais */
    --primary-color: #4A90E2;
    --secondary-color: #2C3E50;
    --accent-color: #E74C3C;
    
    /* Cores de texto */
    --text-color: #ECF0F1;
    --text-light: #BDC3C7;
    --text-dark: #FFFFFF;
    --text-light-bg: #2C3E50;
    
    /* Cores de fundo */
    --bg-primary: #34495E;
    --bg-secondary: #2C3E50;
    --bg-dark: #1A252F;
}
```

## 🔤 Personalização de Fontes

### Localização das Configurações

As configurações de fonte estão espalhadas pelo `styles.css` em diferentes seções:

1. **Importação da Fonte** (linha 8-13)
2. **Configuração Global** (linha 16-21)
3. **Hierarquia de Títulos** (linha 54-87)
4. **Parágrafos** (linha 89-97)

### Como Alterar a Fonte Principal

#### 1. Importar Nova Fonte

No `<head>` do `index.html`, substitua a importação atual:

```html
<!-- Remover esta linha -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Adicionar sua fonte -->
<link href="https://fonts.googleapis.com/css2?family=SUA_FONTE:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### 2. Atualizar CSS

No `styles.css`, altere as configurações de fonte:

```css
/* Configuração global do body */
body {
    font-family: 'SUA_FONTE', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Títulos */
h1, h2, h3, h4 {
    font-family: 'SUA_FONTE', sans-serif;
}

/* Parágrafos */
p {
    font-family: 'SUA_FONTE', sans-serif;
}

/* Botões */
.cta-button {
    font-family: 'SUA_FONTE', sans-serif !important;
}
```

### Exemplo: Usando Inter Font

```html
<!-- No index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* No styles.css */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
}

p {
    font-family: 'Inter', sans-serif;
}

.cta-button {
    font-family: 'Inter', sans-serif !important;
}
```

### Personalizar Tamanhos de Fonte

#### Títulos Responsivos

```css
h1 {
    font-size: 34px;                    /* Tamanho base */
    font-size: clamp(1.5rem, 6vw, 2.5rem); /* Responsivo */
}

h2 {
    font-size: clamp(2rem, 4vw, 3rem);
}

h3 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
}

h4 {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
}
```

#### Parágrafos

```css
p {
    font-size: 16px;                    /* Tamanho base */
    font-size: clamp(14px, 2vw, 18px); /* Responsivo */
}
```

### Personalizar Pesos de Fonte

```css
/* Títulos */
h1 { font-weight: 300; }  /* Light */
h2 { font-weight: 600; }  /* Semi-bold */
h3 { font-weight: 600; }  /* Semi-bold */
h4 { font-weight: 500; }  /* Medium */

/* Parágrafos */
p { font-weight: 400; }   /* Regular */
p.bold { font-weight: 600; } /* Semi-bold */
```

### Exemplo Completo: Fonte Customizada

```css
/* Importar no HTML: <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"> */

:root {
    /* Suas cores personalizadas */
    --primary-color: #2196F3;
    --secondary-color: #1976D2;
}

body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
}

h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: clamp(2rem, 5vw, 3rem);
}

h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
}

p {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: clamp(14px, 2vw, 16px);
}

.cta-button {
    font-family: 'Roboto', sans-serif !important;
    font-weight: 500 !important;
}
```

## ⚡ Performance

### Configurações Disponíveis

No `sections-config.js`:

```javascript
export const PERFORMANCE_CONFIG = {
    lazyLoading: true,           // Carregamento preguiçoso
    intersectionObserver: true,  // Observer para animações
    preloadImages: false,        // Pré-carregar imagens críticas
    animationDelay: 100,         // Delay das animações (ms)
    imageQuality: 'auto'         // Qualidade das imagens
};
```

### Otimizações Incluídas

- **Lazy Loading**: Imagens carregam conforme necessário
- **CSS Otimizado**: Uso de `will-change` para animações
- **Responsividade**: Design mobile-first
- **Carregamento Assíncrono**: Seções carregam independentemente

## 🔧 Configurações Avançadas

### Desativar Seções

No `sections-config.js`, altere `enabled: false`:

```javascript
{
    name: 'Section1',
    enabled: false,  // Seção desativada
    order: 1
}
```

### Reordenar Seções

Altere a propriedade `order` no `sections-config.js`:

```javascript
export const SECTIONS_CONFIG = [
    {
        name: 'Section1',
        enabled: true,
        order: 2  // Será exibida em segundo
    },
    {
        name: 'Section2',
        enabled: true,
        order: 1  // Será exibida primeiro
    }
];
```

### Configurações de Performance

#### Ativar Pré-carregamento de Imagens

```javascript
export const PERFORMANCE_CONFIG = {
    preloadImages: true,  // Mude para true
    imageQuality: 'high'  // 'high', 'medium', 'low', 'auto'
};
```

#### Ajustar Delay de Animações

```javascript
export const PERFORMANCE_CONFIG = {
    animationDelay: 200,  // Aumente para animações mais lentas
};
```

## 🚀 Como Usar

### Desenvolvimento Local

1. **Servidor Local**: Use um servidor local (Live Server, Python, etc.)
2. **Abrir Projeto**: Navegue até a pasta do projeto
3. **Visualizar**: Acesse `index.html` no navegador

### Deploy em Produção

1. **Upload**: Faça upload de todos os arquivos para seu servidor
2. **Estrutura**: Mantenha a estrutura de pastas intacta
3. **Teste**: Verifique se todas as seções carregam corretamente

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Mobile Small**: < 480px

### Breakpoints Personalizados

Para adicionar novos breakpoints, edite o `styles.css`:

```css
/* Breakpoint customizado */
@media (max-width: 1200px) {
    .section-content {
        padding: 0 2rem;
    }
}

@media (min-width: 1400px) {
    .section-content {
        max-width: 1400px;
    }
}
```

## 🎯 Estrutura de Seção Recomendada

### Template Básico

```html
<!-- Componentes/SectionN.html -->
<div class="section">
    <div class="section-content">
        <h2>Título da Seção</h2>
        <p>Descrição da seção...</p>
        
        <!-- CTA Button -->
        <a href="#form" class="cta-button">
            <span class="button-content-wrapper">
                <span class="button-icon">
                    <svg class="arrow-icon" viewBox="0 0 448 512">
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                    </svg>
                </span>
                <span class="button-text">TEXTO DO BOTÃO</span>
            </span>
        </a>
    </div>
</div>

<style>
/* Estilos específicos da seção */
.section {
    background: var(--bg-primary);
    padding: 4rem 0;
}

/* Responsividade específica */
@media (max-width: 768px) {
    .section {
        padding: 2rem 0;
    }
}
</style>
```

### Template com Imagem

```html
<div class="section">
    <div class="section-content">
        <div class="image-container">
            <img src="../IMG/sua-imagem.jpg" alt="Descrição da imagem">
        </div>
        <div class="text-content">
            <h2>Título</h2>
            <p>Conteúdo...</p>
        </div>
    </div>
</div>

<style>
.section-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
}

@media (max-width: 768px) {
    .section-content {
        grid-template-columns: 1fr;
    }
}
</style>
```

## ⚠️ Observações Importantes

### Convenções de Nomenclatura

- **Arquivos**: Use PascalCase (ex: `Section1.html`, `Section2.html`)
- **Data Attributes**: Use `data-include="NomeDaSecao"` (sem .html)
- **Classes CSS**: Use kebab-case (ex: `.section-content`, `.cta-button`)

### Estrutura de Arquivos

- **Imagens**: Coloque na pasta `IMG/` e referencie com `../IMG/`
- **Seções**: Cada seção deve estar na pasta `Componentes/`
- **CSS**: Estilos globais no `styles.css`, específicos dentro de `<style>`

### Boas Práticas

- **CSS Scoped**: Estilos dentro de `<style>` são específicos da seção
- **CTAs**: Use a classe `.cta-button` para consistência visual
- **Responsividade**: Sempre teste em diferentes tamanhos de tela
- **Performance**: Otimize imagens antes de usar
- **Acessibilidade**: Use `alt` em imagens e `aria-label` em botões

### Solução de Problemas

#### Seção não carrega
1. Verifique se o arquivo existe na pasta `Componentes/`
2. Confirme se o nome no `data-include` está correto
3. Abra o console do navegador para ver erros

#### Estilos não aplicam
1. Verifique se a classe CSS está correta
2. Confirme se o CSS está dentro de `<style>` na seção
3. Use `!important` se necessário para sobrescrever estilos globais

#### Problemas de responsividade
1. Teste em diferentes dispositivos
2. Use as ferramentas de desenvolvedor do navegador
3. Ajuste os breakpoints conforme necessário
