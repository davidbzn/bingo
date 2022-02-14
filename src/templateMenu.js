const { ipcMain } = require('electron');

module.exports = {
    geraMenuPrincipal(win){
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
                        label: 'Delay',
                        click: () => {
                            ipcMain.emit("show-delay");
                        },
                    },
                    {
                        label: 'Rank nome',
                        type: 'checkbox',
                        checked: true,
                        click: (item) => {
                            win.send('state-rank-name', item.checked);
                        },
                    },
                    {
                        label: 'Rank bolas',
                        type: 'checkbox',
                        checked: true,
                        click: (item) => {
                            win.send('state-rank-ball', item.checked);
                        },
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
                    },                    {
                        type: 'separator' 
                    },
                    {
                        label: 'Mostrar configurações'
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