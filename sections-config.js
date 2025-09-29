// Configuração das seções da landing page
// Adicione novas seções aqui na ordem desejada

export const SECTIONS_CONFIG = [
    {
        name: 'Section1',
        folder: 'Section1',
        enabled: true,
        order: 1
    },
    {
        name: 'SectionIdeal',
        folder: 'SectionIdeal',
        enabled: true,
        order: 2
    },
    {
        name: 'SofreCom',
        folder: 'SofreCom', 
        enabled: true,
        order: 3
    },
    {
        name: 'Clinica',
        folder: 'Clinica', 
        enabled: true,
        order: 4
    },
    {
        name: 'Formulario',
        folder: 'Formulario', 
        enabled: true,
        order: 5
    },
    {
        name: 'Depoimentos',
        folder: 'Depoimentos', 
        enabled: true,
        order: 6
    }
    // Adicione novas seções aqui:
    // {
    //     name: 'Section4',
    //     folder: 'Section4', 
    //     enabled: true,
    //     order: 7
    // }
];

// Configurações de performance
export const PERFORMANCE_CONFIG = {
    lazyLoading: true,
    intersectionObserver: true,
    preloadImages: false, // Mude para true se quiser pré-carregar imagens críticas
    animationDelay: 100, // Delay em ms para animações
    imageQuality: 'auto' // 'auto', 'high', 'medium', 'low'
};
