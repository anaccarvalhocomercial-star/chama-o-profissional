const STORAGE_KEY = 'chama_profissional_db';

const StorageService = {
    getProfessionals() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            const initialData = [
                {
                    id: 1,
                    nome: "Carlos Silva",
                    categoria: "Eletricista",
                    cidade: "São Paulo - SP",
                    whatsapp: "11999999999",
                    portfolio: "Instalações elétricas residenciais, quadros de disjuntores e reparos em geral com garantia.",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                },
                {
                    id: 2,
                    nome: "Mariana Souza",
                    categoria: "Encanadora",
                    cidade: "São Paulo - SP",
                    whatsapp: "11988888888",
                    portfolio: "Caça vazamentos, desentupimentos, troca de registros e consertos hidráulicos rápidos.",
                    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                }
            ];
            this.saveProfessionals(initialData);
            return initialData;
        }
        return JSON.parse(data);
    },

    saveProfessionals(professionals) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(professionals));
    },

    addProfessional(newProf) {
        const professionals = this.getProfessionals();
        newProf.id = Date.now();
        professionals.unshift(newProf);
        this.saveProfessionals(professionals);
    }
};