🌍 [Português](#-proFatura--sistema-de-faturacao-basico) | 🌍 [English](#-proFatura--basic-billing-system)

# 📊 ProFatura – Sistema de Faturação Básico

## 📋 Sobre o Projeto

O **ProFatura** é um sistema de faturação simples, desenvolvido em **Angular** (frontend) e **ASP.NET C#** (backend), com **MySQL** como base de dados.
O objetivo principal é praticar **operações CRUD**, integração **frontend-backend**, autenticação e conceitos básicos de gestão de produtos e faturas.

## ✨ Funcionalidades

### 👨‍💼 Administrador

* Visualizar produtos, clientes e funcionários
* Cadastrar produtos, clientes, funcionários e administradores
* Alterar senha
* Gerar histórico de faturas
* Acesso ao **Dashboard** (cliente com maior receita, funcionário com maior receita e top 5 produtos mais vendidos)
* Possui **todos os privilégios do sistema**

### 🧑‍🔧 Funcionário

* Responsável por gerar faturas no momento da compra
* Emitir faturas proforma
* Registrar produtos e efetuar compras
* Cadastrar cliente no momento da emissão da fatura

## 🔐 Regras de Segurança

* A exclusão de produtos de uma fatura corrente exige **autenticação do administrador**
* A finalização do pagamento (fictício) exige **autenticação do cliente**, para garantir que o nome apareça na fatura

## 🛠️ Tecnologias Utilizadas

**Frontend**

* Angular 17
* HTML5, CSS3, TypeScript

**Backend**

* ASP.NET C#
* REST API Development

**Base de Dados**

* MySQL (já hospedado remotamente)

## 🚀 Como Executar o Projeto

### 🔽 Clonar o Repositório

```bash
git clone https://github.com/marcelo365/PROFATURA.git
cd PROFATURA
```

### 💻 Frontend

1. Entrar na pasta do frontend

2. Instalar dependências

   ```bash
   npm install
   ```

3. Rodar em modo de desenvolvimento

   ```bash
   ng serve -o
   ```

4. A aplicação estará disponível em: `http://localhost:4200`

⚠️ **Nota**: O backend já está hospedado e configurado. Não é necessário alterar connection strings nem executar migrations a menos que queiras executar localmente


## ⚠️ Observação

Este projeto foi desenvolvido inicialmente em **português** como prática.
Nos próximos projetos, a intenção é adotar **inglês como padrão** para melhor alinhamento com a comunidade global.

## 🔗 Links

* GitHub: [https://github.com/marcelo365/PROFATURA.git](https://github.com/marcelo365/PROFATURA.git)
* Projeto online: [https://sistema-faturacao-angular.vercel.app/](https://sistema-faturacao-angular.vercel.app/)

## 📄 Licença

Projeto desenvolvido para fins **acadêmicos e de portfólio**.


-----------------------------------------------------------------------------------------------------------------

# 📊 ProFatura – Basic Billing System

## 📋 About the Project

**ProFatura** is a simple billing system developed in **Angular** (frontend) and **ASP.NET C#** (backend), with **MySQL** as the database.
The main goal is to practice **CRUD operations**, **frontend-backend integration**, authentication, and basic concepts of product and invoice management.

## ✨ Features

### 👨‍💼 Administrator

* View products, clients, and employees
* Register products, clients, employees, and administrators
* Change password
* Generate invoice history
* Access the **Dashboard** (top revenue client, top revenue employee, and top 5 best-selling products)
* Has **all system privileges**

### 🧑‍🔧 Employee

* Responsible for generating invoices at the time of purchase
* Issue proforma invoices
* Register products and process purchases
* Register clients during invoice issuing

## 🔐 Security Rules

* Deleting products from an ongoing invoice requires **administrator authentication**
* Completing payment (simulated) requires **client authentication**, ensuring that the client’s name appears on the invoice

## 🛠️ Technologies Used

**Frontend**

* Angular 17
* HTML5, CSS3, TypeScript

**Backend**

* ASP.NET C#
* REST API Development

**Database**

* MySQL (already remotely hosted)

## 🚀 How to Run the Project

### 🔽 Clone the Repository

```bash
git clone https://github.com/marcelo365/PROFATURA.git
cd PROFATURA
```

### 💻 Frontend

1. Go to the frontend folder

2. Install dependencies

   ```bash
   npm install
   ```

3. Run in development mode

   ```bash
   ng serve -o
   ```

4. The application will be available at: `http://localhost:4200`

⚠️ **Note**: The backend is already hosted and configured. There is no need to change connection strings or run migrations unless you want to run it locally.

## ⚠️ Disclaimer

This project was initially developed in **Portuguese** as practice.
For future projects, the intention is to adopt **English as the standard** to better align with the global community.

## 🔗 Links

* GitHub: [https://github.com/marcelo365/PROFATURA.git](https://github.com/marcelo365/PROFATURA.git)
* Live Project: [https://sistema-faturacao-angular.vercel.app/](https://sistema-faturacao-angular.vercel.app/)

## 📄 License

Project developed for **academic and portfolio purposes**.
