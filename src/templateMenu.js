// TemplateMenu

module.exports = {
    geraMenuPrincipal(){
        let template = [
            {
                label: 'JOGO',
                submenu: [
                    {
                        label: 'Reiniciar'
                    },
                    {
                        label: 'Salvar'
                    },
                    {
                        label: 'Carregar'
                    },
                    {
                        label: 'Jogadores'
                    },
                    {
                        label: 'Valor da aposta'
                    },
                    {
                        type: 'separator' 
                    },
                    {
                        label: 'Sair',
                        role: 'quit' 
                    }
                ]
            },
            {
                label: 'USUÁRIOS'
            },
            {
                label: 'CARTELAS'
            },
            {
                label: 'CONFIGURAÇÕES',
                submenu:[
                    {
                        label: 'Delay'
                    },
                    {
                        label: 'Rank nome',
                        type: 'checkbox',
                        checked: true
                    },
                    {
                        label: 'Rank bolas',
                        type: 'checkbox',
                        checked: true
                    },
                    {
                        label: 'Voz',
                        type: 'checkbox',
                        checked: true
                    },
                    {
                        label: 'Aviso vitória',
                        type: 'checkbox',
                        checked: true
                    },
                    {
                        type: 'separator' 
                    },
                    {
                        label: 'Fullscreen',
                        type: 'checkbox',
                        role: 'togglefullscreen' 
                    },{
                        label: 'Developer',
                        role: 'toggledevtools',
                        accelerator: 'F12'
                    }
                ]
            }
        ];
        return template;
    }
}