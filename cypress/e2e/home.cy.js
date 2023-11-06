/// <reference types="cypress" />

import releases from "../../public/releases.json";

describe('landing page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/');
        cy.get('[data-cy="select-lang"]').as("langSelect");
        cy.get('[data-cy="tag-line"]').as("tag");
        cy.get('[data-cy="btn-install"]').as("btnInstall");
        cy.get('[data-cy="btn-docs"]').as("btnDocs");
        cy.get('[data-cy="btn-github"]').as("btnGithub");
        cy.get('[data-cy="link-home"]').as("linkHome");
        cy.get('[data-cy="link-installation"]').as("linkInstallation");
        cy.get('[data-cy="link-docs"]').as("linkDocs");
        cy.get('[data-cy="link-dashboard"]').as("linkDashboard");
        cy.get('[data-cy="link-versions"]').as("linkVersions");
        cy.get('[data-cy="link-about"]').as("linkAbout");
        cy.get('[data-cy="btn-mode"]').as("btnMode");
        cy.get('[data-cy="header-select"]').as("headerSelect");
    });
    
    it('displays the app logo', () => {
        cy.get('[data-cy="app-logo"]').should('be.visible');
    });

    it('displays the name of the app', () => {
        cy.get('[data-cy="app-name-vue"]').should("contain", "Vue");
        cy.get('[data-cy="app-name"]').should("contain", "Data UI");
    });

    it('should display a language select', () => {
        cy.get('@langSelect').should('be.visible');  
    });

    it('should display the app tagline with the proper language', () => {
        cy.get('@langSelect').select("Français");
        cy.get('@tag').should('contain', 'Une bibliothèque de composants Vue3 de visualisation de données qui autonomise les utilisateurs');
        cy.get('@langSelect').select("Deutsch");
        cy.get('@tag').should('contain', 'Eine benutzerorientierte Vue3-Komponentenbibliothek zur Datenvisualisierung');
        cy.get('@langSelect').select("Español");
        cy.get('@tag').should('contain', 'Una biblioteca de componentes Vue3 de visualización de datos que potencia al usuario');
        cy.get('@langSelect').select("Portugues");
        cy.get('@tag').should('contain', 'Uma biblioteca de componentes Vue3 para visualização de dados que capacita o usuário');
        cy.get('@langSelect').select("中国人");
        cy.get('@tag').should('contain', '一个赋予用户权力的数据可视化Vue3组件库');
        cy.get('@langSelect').select("日本語");
        cy.get('@tag').should('contain', 'ユーザーをエンパワーするデータ可視化Vue3コンポーネントライブラリ');
        cy.get('@langSelect').select("English");
        cy.get('@tag').should('contain', 'A user-empowering data visualization Vue3 components library');
    });

    it('should display the header', () => {
        cy.get('[data-cy="app-header"]').should('be.visible');
        cy.get('@linkHome')
            .should('be.visible')
            .contains('Vue Data UI')
        cy.get('[data-cy="header-logo"]').should('be.visible');
        cy.get('@linkInstallation')
            .should('be.visible')
            .contains('Installation')
        cy.get('@linkDocs')
            .should('be.visible')
            .contains('Docs')
        cy.get('@linkDashboard')
            .should('be.visible')
            .contains('Dashboard')
        cy.get('@linkVersions')
            .should('be.visible')
            .contains('Versions')
        cy.get('@linkAbout')
            .should('be.visible')
            .contains('About')
        cy.get('html').should('have.class', 'dark')
            cy.get('@btnMode')
                .should('be.visible')
                .click()
        cy.get('html').should('not.have.class', 'dark')
        cy.get('@headerSelect')
            .should('be.visible')
        
        cy.get('@headerSelect').select("Français");
        cy.get('@tag').should('contain', 'Une bibliothèque de composants Vue3 de visualisation de données qui autonomise les utilisateurs');
        cy.get('@headerSelect').select("Deutsch");
        cy.get('@tag').should('contain', 'Eine benutzerorientierte Vue3-Komponentenbibliothek zur Datenvisualisierung');
        cy.get('@headerSelect').select("Español");
        cy.get('@tag').should('contain', 'Una biblioteca de componentes Vue3 de visualización de datos que potencia al usuario');
        cy.get('@headerSelect').select("Portugues");
        cy.get('@tag').should('contain', 'Uma biblioteca de componentes Vue3 para visualização de dados que capacita o usuário');
        cy.get('@headerSelect').select("中国人");
        cy.get('@tag').should('contain', '一个赋予用户权力的数据可视化Vue3组件库');
        cy.get('@headerSelect').select("日本語");
        cy.get('@tag').should('contain', 'ユーザーをエンパワーするデータ可視化Vue3コンポーネントライブラリ');
        cy.get('@headerSelect').select("English");
        cy.get('@tag').should('contain', 'A user-empowering data visualization Vue3 components library');
    })

    it('should display install, docs and github buttons', () => {
        cy.get('@btnInstall').should('be.visible');
        cy.get('@btnDocs').should('be.visible');
        cy.get('@btnGithub').should('be.visible');
    });

    it('should display a light / dark mode button', () => {
        cy.get('[data-cy="switch-mode"]')
            .should('be.visible')
            .contains('Switch to light mode')
            .click();
        cy.get('html').should('not.have.class', 'dark');
        cy.get('[data-cy="switch-mode"]')
            .contains('Switch to dark mode')
            .click()
        cy.get('html').should('have.class', 'dark');
    });

    it('should route to install page', () => {
        cy.get('@linkInstallation').click();
        cy.location('pathname').should('eq', '/installation');
    });

    it('should route to docs page', () => {
        cy.get('@linkDocs').click();
        cy.location('pathname').should('eq', '/docs');
    });

    it('should route to dashboard page', () => {
        cy.get('@linkDashboard').click();
        cy.location('pathname').should('eq', '/dashboard');
    });

    it('should route to versions page', () => {
        cy.get('@linkVersions').click();
        cy.location('pathname').should('eq', '/versions');
    });

    it('should route to about page', () => {
        cy.get('@linkAbout').click();
        cy.location('pathname').should('eq', '/about');
    });

    it('should link to home page', () => {
        cy.get('@linkHome').click();
        cy.location('pathname').should('eq', '/')
    });

    it('should route to installation page when clicking on home install button', () => {
        cy.get('@btnInstall').click();
        cy.location('pathname').should('eq', '/installation')
    });

    it('should route to docs page when clicking on home docs button', () => {
        cy.get('@btnDocs').click();
        cy.location('pathname').should('eq', '/docs')
    });

    it('sould call releases api and display the latest version number', () => {
        const staticResponse = {
            body: releases
        }
        cy.intercept('https://vue-data-ui.graphieros.com/releases.json', staticResponse)
    })
});