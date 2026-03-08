# Projeto Chat IA

Este projeto é uma aplicação front-end desenvolvida em **Next.js**, configurada com **CI/CD** utilizando **GitHub Actions** e deploy automático no **Vercel**.

## 🚀 Objetivo
Aplicar os conceitos de Integração Contínua (CI) e Entrega Contínua (CD), garantindo que cada alteração no código seja validada e publicada automaticamente.

## 🔧 Pipeline CI/CD
O workflow configurado contempla:
- **Validação de Código**: ESLint (`npm run lint`)
- **Testes Automatizados**: Jest/Testing Library (`npm run test`)
- **Build da Aplicação**: Next.js (`npm run build`)
- **Deploy Automatizado**: Vercel (via GitHub Actions)

## 📦 Tecnologias Utilizadas
- Next.js
- React
- GitHub Actions
- Vercel

## 🌐 Deploy
A aplicação está publicada automaticamente no Vercel:  
👉 [acesse aqui](chat-ia-tan.vercel.app)

## 📂 Estrutura do Workflow
O arquivo `.github/workflows/main.yml` contém:
- Job de **Integração Contínua** (CI)
- Job de **Deploy Automatizado** (CD)

---
