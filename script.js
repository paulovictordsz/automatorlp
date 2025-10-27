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
            try {
                // Verifica se o script tem conteúdo válido
                if (script.textContent && script.textContent.trim()) {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.head.appendChild(newScript);
                    document.head.removeChild(newScript);
                }
            } catch (error) {
                console.warn('Erro ao executar script:', error);
            }
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

// Carrossel de Depoimentos
class DepoimentosCarousel {
    constructor() {
        this.wrap = null;
        this.viewport = null;
        this.track = null;
        this.prev = null;
        this.next = null;
        this.dotsWrap = null;
        this.autoplayMs = 3500;
        this.index = 0;
        this.timer = null;
        this.offsets = [];
    }

    init() {
        this.wrap = document.querySelector('.t-wrap');
        if (!this.wrap) return;

        this.viewport = this.wrap.querySelector('.t-viewport');
        this.track = this.wrap.querySelector('.t-track');
        this.prev = this.wrap.querySelector('.t-prev');
        this.next = this.wrap.querySelector('.t-next');
        this.dotsWrap = this.wrap.querySelector('.t-dots');

        if (!this.viewport || !this.track || !this.prev || !this.next || !this.dotsWrap) return;

        this.setupEventListeners();
        this.relayout();
        this.start();
    }

    perView() {
        return matchMedia('(max-width: 900px)').matches ? 1 : 2;
    }

    normalizeSlides() {
        // remove ghosts antigos
        this.track.querySelectorAll('.t-ghost').forEach(n => n.remove());
        const real = this.track.querySelectorAll('.t-card').length;
        const pv = this.perView();
        const rest = real % pv;
        if (rest !== 0) {
            for (let i = 0; i < pv - rest; i++) {
                const g = document.createElement('div');
                g.className = 't-ghost';
                this.track.appendChild(g);
            }
        }
    }

    buildOffsets() {
        this.offsets = [];
        const pv = this.perView();
        const total = this.track.children.length; // inclui ghosts
        for (let page = 0; page < Math.ceil(total / pv); page++) {
            const first = this.track.children[page * pv];
            // deslocamento real do início da página em relação ao track
            const off = first.offsetLeft;
            this.offsets.push(off);
        }
    }

    pages() {
        return this.offsets.length || 1;
    }

    buildDots() {
        this.dotsWrap.innerHTML = '';
        for (let i = 0; i < this.pages(); i++) {
            const b = document.createElement('button');
            b.type = 'button';
            b.addEventListener('click', () => { this.stop(); this.go(i); this.start(); });
            this.dotsWrap.appendChild(b);
        }
    }

    apply() {
        const x = -(this.offsets[this.index] || 0);
        // usa translate3d e arredonda para pixel inteiro
        this.track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
        this.dotsWrap.querySelectorAll('button').forEach((b, i) =>
            b.setAttribute('aria-current', i === this.index));
    }

    go(to) {
        this.index = (to + this.pages()) % this.pages();
        this.apply();
    }

    start() {
        this.stop();
        this.timer = setInterval(() => this.go(this.index + 1), this.autoplayMs);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    relayout() {
        const cur = this.index;
        this.normalizeSlides();
        // força reflow antes de medir
        this.track.style.transform = 'translate3d(0,0,0)';
        this.buildOffsets();
        this.buildDots();
        this.go(Math.min(cur, this.pages() - 1));
    }

    setupEventListeners() {
        this.prev.addEventListener('click', () => { this.stop(); this.go(this.index - 1); this.start(); });
        this.next.addEventListener('click', () => { this.stop(); this.go(this.index + 1); this.start(); });
        this.viewport.addEventListener('mouseenter', () => this.stop());
        this.viewport.addEventListener('mouseleave', () => this.start());
        window.addEventListener('resize', () => this.relayout());
    }
}

// Carrossel da Clínica
class ClinicaCarousel {
    constructor() {
        this.carousel = null;
        this.track = null;
        this.prev = null;
        this.next = null;
        this.dots = null;
        this.currentIndex = 0;
        this.totalItems = 0;
        this.itemsPerView = 3;
        this.autoPlay = null;
    }

    init() {
        this.carousel = document.querySelector('.clinica__carousel');
        if (!this.carousel) return;

        this.track = this.carousel.querySelector('.carousel__track');
        this.prev = this.carousel.querySelector('.carousel__btn--prev');
        this.next = this.carousel.querySelector('.carousel__btn--next');
        this.dots = this.carousel.querySelectorAll('.dot');

        if (!this.track) return;

        this.totalItems = this.track.children.length;
        this.setupImageErrorHandling();
        this.setupEventListeners();
        this.startAutoPlay();
    }

    setupImageErrorHandling() {
        const images = this.carousel.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                console.log('Erro ao carregar imagem:', img.src);
                img.style.background = 'linear-gradient(135deg, #f3f5f3 0%, #e8f0e8 100%)';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.style.color = '#6a756f';
                img.style.fontSize = '14px';
                img.style.fontFamily = 'Poppins, sans-serif';
                img.alt = 'Imagem da clínica';
            });
        });
    }

    moveSlide() {
        const step = this.track.children[0].offsetWidth + 24;
        this.currentIndex++;
        if (this.currentIndex >= this.totalItems - this.itemsPerView + 1) {
            this.currentIndex = 0;
        }
        
        this.track.style.transform = `translateX(-${this.currentIndex * step}px)`;
        console.log('MOVENDO PARA:', this.currentIndex);
        
        this.updateDots();
    }

    updateDots() {
        const activeDot = Math.floor(this.currentIndex / this.itemsPerView);
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === activeDot);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        const step = this.track.children[0].offsetWidth + 24;
        this.track.style.transform = `translateX(-${this.currentIndex * step}px)`;
        this.updateDots();
    }

    startAutoPlay() {
        this.autoPlay = setInterval(() => this.moveSlide(), 2000);
        console.log('AUTO-PLAY INICIADO!');
    }

    stopAutoPlay() {
        if (this.autoPlay) {
            clearInterval(this.autoPlay);
            this.autoPlay = null;
        }
    }

    setupEventListeners() {
        if (this.prev) {
            this.prev.onclick = () => {
                this.stopAutoPlay();
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.totalItems - this.itemsPerView;
                }
                const step = this.track.children[0].offsetWidth + 24;
                this.track.style.transform = `translateX(-${this.currentIndex * step}px)`;
                this.updateDots();
                this.startAutoPlay();
            };
        }

        if (this.next) {
            this.next.onclick = () => {
                this.stopAutoPlay();
                this.moveSlide();
                this.startAutoPlay();
            };
        }

        // Pausa no hover
        this.carousel.onmouseenter = () => this.stopAutoPlay();
        this.carousel.onmouseleave = () => this.startAutoPlay();
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new SimpleIncludes();
    
    // Inicializa carrosséis após um pequeno delay
    setTimeout(() => {
        new DepoimentosCarousel().init();
        new ClinicaCarousel().init();
    }, 100);
});
