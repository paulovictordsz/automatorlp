// Sistema simples de includes
class SimpleIncludes {
    constructor() {
        this.init();
    }

    init() {
        this.loadIncludes();
    }

    // Carrega todos os elementos com data-include
    async loadIncludes() {
        const includes = document.querySelectorAll('[data-include]');
        
        for (const element of includes) {
            const sectionName = element.getAttribute('data-include');
            await this.loadSection(element, sectionName);
        }
    }

    // Carrega uma seção específica
    async loadSection(element, sectionName) {
        try {
            const response = await fetch(`./Componentes/${sectionName}.html`);
            if (!response.ok) {
                console.error(`Erro ao carregar seção ${sectionName}`);
                this.showDebugSection();
                return;
            }
            
            const html = await response.text();
            element.innerHTML = html;
            console.log(`Seção ${sectionName} carregada com sucesso`);
            
            // Executa scripts após carregar a seção
            this.executeScripts(element);
        } catch (error) {
            console.error(`Erro ao carregar seção ${sectionName}:`, error);
            this.showDebugSection();
        }
    }

    // Executa scripts dentro de uma seção carregada
    executeScripts(element) {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.head.appendChild(newScript);
            document.head.removeChild(newScript);
        });
    }

    // Mostra a seção de debug se o carregamento falhar
    showDebugSection() {
        const debugSection = document.getElementById('debug-section');
        if (debugSection) {
            debugSection.style.display = 'block';
            console.log('Mostrando seção de debug');
        }
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new SimpleIncludes();
});
