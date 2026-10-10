document.addEventListener('DOMContentLoaded', () => {
    loadView('buscar');

    RouterService.init((targetView) => {
        loadView(targetView);
    });
});

function loadView(viewName) {
    const contentArea = document.getElementById('app-content');
    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');

    if (viewName === 'buscar') {
        headerTitle.innerText = 'Buscar Serviços';
        headerSubtitle.innerText = 'Encontre profissionais autônomos na sua região';
        renderSearchView(contentArea);
    } else if (viewName === 'cadastrar') {
        headerTitle.innerText = 'Área do Profissional';
        headerSubtitle.innerText = 'Cadastre seus serviços e conquiste clientes';
        renderRegisterView(contentArea);
    }
}

function renderSearchView(container) {
    const professionals = StorageService.getProfessionals();

    let html = `
        <div class="form-group" style="margin-bottom: 16px;">
            <input type="text" id="search-input" placeholder="🔍 Pesquisar por nome ou categoria..." onkeyup="filterProfessionals()">
        </div>
        <div id="professionals-list">
    `;

    if (professionals.length === 0) {
        html += `<p style="text-align: center; color: #6c757d; margin-top: 20px;">Nenhum profissional cadastrado ainda.</p>`;
    } else {
        professionals.forEach(p => {
            const cleanPhone = p.whatsapp.replace(/\D/g, '');
            const msg = encodeURIComponent(`Olá ${p.nome}, vi seu perfil no Chama o Profissional e gostaria de orçamento.`);
            
            html += `
                <div class="card-profissional">
                    <div class="profile-header">
                        <img src="${p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${p.nome}" class="profile-avatar">
                        <div class="profile-info">
                            <span class="card-nome">${p.nome}</span>
                            <span class="card-categoria">${p.categoria}</span>
                        </div>
                    </div>
                    <div class="card-cidade">📍 ${p.cidade}</div>
                    <div class="portfolio-box">
                        <div class="portfolio-title">Sobre / Serviços:</div>
                        ${p.portfolio}
                    </div>
                    <a href="https://wa.me/55${cleanPhone}?text=${msg}" target="_blank" class="btn-whatsapp">
                        <span>💬</span> Chamar no WhatsApp
                    </a>
                </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}

function filterProfessionals() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card-profissional');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderRegisterView(container) {
    container.innerHTML = `
        <form id="register-form" onsubmit="handleRegister(event)">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" id="nome" placeholder="Ex: Ana Souza">
                <span id="err-nome" class="msg-erro"></span>
            </div>

            <div class="form-group">
                <label>Categoria / Profissão</label>
                <select id="categoria">
                    <option value="">Selecione...</option>
                    <option value="Eletricista">Eletricista</option>
                    <option value="Encanador(a)">Encanador(a)</option>
                    <option value="Pintor(a)">Pintor(a)</option>
                    <option value="Diarista">Diarista</option>
                    <option value="Montador(a) de Móveis">Montador(a) de Móveis</option>
                    <option value="Técnico(a) de Informática">Técnico(a) de Informática</option>
                </select>
                <span id="err-categoria" class="msg-erro"></span>
            </div>

            <div class="form-group">
                <label>Cidade / Região</label>
                <input type="text" id="cidade" placeholder="Ex: São Paulo - SP">
                <span id="err-cidade" class="msg-erro"></span>
            </div>

            <div class="form-group">
                <label>WhatsApp (com DDD)</label>
                <input type="text" id="whatsapp" placeholder="Ex: 11987654321">
                <span id="err-whatsapp" class="msg-erro"></span>
            </div>

            <div class="form-group">
                <label>Breve Portfólio / Serviços</label>
                <textarea id="portfolio" rows="3" placeholder="Descreva o que você faz..."></textarea>
                <span id="err-portfolio" class="msg-erro"></span>
            </div>

            <button type="submit" class="btn-salvar">Cadastrar Profissional</button>
        </form>
    `;
}

function handleRegister(event) {
    event.preventDefault();
    ValidationService.clearErrors();

    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value;
    const cidade = document.getElementById('cidade').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const portfolio = document.getElementById('portfolio').value.trim();

    let isValid = true;

    if (!nome) {
        ValidationService.showError('err-nome', 'Por favor, informe seu nome.');
        isValid = false;
    }
    if (!categoria) {
        ValidationService.showError('err-categoria', 'Selecione uma categoria.');
        isValid = false;
    }
    if (!cidade) {
        ValidationService.showError('err-cidade', 'Informe sua cidade e região.');
        isValid = false;
    }
    if (!ValidationService.isWhatsAppValid(whatsapp)) {
        ValidationService.showError('err-whatsapp', 'WhatsApp inválido. Informe DDD + Número.');
        isValid = false;
    }
    if (!portfolio) {
        ValidationService.showError('err-portfolio', 'Descreva brevemente seus serviços.');
        isValid = false;
    }

    if (!isValid) return;

    const newProf = {
        nome,
        categoria,
        cidade,
        whatsapp,
        portfolio,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };

    StorageService.addProfessional(newProf);
    alert('Profissional cadastrado com sucesso!');
    loadView('buscar');
}