
# 🧠 MindWork — Aplicativo Mobile (React Native + Expo)

App desenvolvido como parte da Global Solution, focado em **bem-estar emocional**, **produtividade saudável** e **gestão de clima organizacional**.  
Esta é a versão **mobile**, construída com **React Native (Expo)** e **TypeScript**, seguindo boas práticas de arquitetura e design.

---

## 🚀 Sobre o Projeto

O **MindWork** é um diário emocional inteligente, pensado para ajudar colaboradores a monitorarem seu humor, estresse e modo de trabalho ao longo do dia.  
O aplicativo fornece:

- Registro diário de bem-estar  
- Histórico completo persistido com AsyncStorage  
- Sugestões automáticas com base no estado emocional  
- Gráfico simples de evolução do humor  
- Alertas gerados a partir dos registros  
- Login simulado (mock) para navegação autenticada  

Embora o backend em Java já exista, **o app nesta entrega usa apenas dados locais**, sem integração com API.

---

## 📱 Funcionalidades do App

### ✔ Login simulado  
- Apenas para navegação, sem backend real.

### ✔ Tela de Diário  
- Registrar humor (1 a 5)  
- Registrar nível de estresse (1 a 5)  
- Selecionar modo de trabalho (home office, presencial ou híbrido)  
- Campo livre para anotações  
- Sugestão automática gerada com base no humor e estresse  
- Histórico de registros  
- Dados persistidos com **AsyncStorage**

### ✔ Tela de Insights  
- Visualização do humor médio  
- Gráfico de barras com as últimas 7 entradas  
- Análise simples baseada nos dados locais

### ✔ Tela de Alertas  
- Listagem de sugestões geradas a partir dos registros  
- Histórico completo de alertas

---

## 🧪 Persistência de Dados

O app utiliza:

- `AsyncStorage` para salvar:
  - registros de humor (`entries`)
  - dados auxiliares da experiência

Dados permanecem mesmo após fechar e reabrir o app.

---

## 🧰 Tecnologias Utilizadas

- **React Native (Expo)**
- **TypeScript**
- **Expo Router**
- **AsyncStorage**
- **Expo Linear Gradient**
- **Feather Icons**
- **React Hooks**
- **Styled Components via StyleSheet inline**

---

## 📁 Estrutura Simplificada do Projeto

```
mindwork-mobile/
 ├─ app/
 │   ├─ index.tsx                # Tela de login
 │   ├─ (tabs)/
 │   │   ├─ _layout.tsx          # Navegação com abas
 │   │   ├─ index.tsx            # Tela de Diário
 │   │   ├─ explore.tsx          # Tela de Insights
 │   │   └─ notifications.tsx    # Tela de Alertas
 │
 ├─ components/
 │   ├─ EntryCard.tsx
 │   └─ SelectorRow.tsx
 │
 ├─ hooks/
 │   └─ useEntries.ts
 │
 ├─ storage/
 │   ├─ entriesStorage.ts
 │   └─ statsStorage.ts
 │
 ├─ types/
 │   └─ entries.ts
 │
 └─ README.md
```

---

## ▶️ Como Rodar o Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o projeto

```bash
npx expo start
```

### 3. Escanear com o celular  
Use o app **Expo Go**.

Ou rodar no emulador iOS/Android.

---

## 🎨 Visual e Experiência

- Tema criado com **gradiente roxo** (identidade MindWork)  
- Telas com estética clean e profissional  
- Ícones padronizados com Feather Icons  
- Layout responsivo e intuitivo

---

## 📹 Demonstração

No vídeo entregue junto à disciplina, são demonstrados:

- Login
- Registro de humor
- Histórico
- Persistência após fechar o app
- Insights com gráfico de humor
- Alertas baseados nos registros

---

## 👤 Autor

**Natan Eguchi**  
Engenharia de Software — FIAP  
2025/2

---

## 📄 Licença

Projeto acadêmico — uso educacional.
