const { ipcRenderer } = require('electron');
const process = require('process');
const $ = require('jQuery');
const querystring = require('querystring');

let query = querystring.parse(global.location.search);
let delay = JSON.parse(query['?delay'])

$(" #input-delay ").val(delay);

// Evento de click no button salvar
$( "#salvar" ).click(function(){
    let delay = $(" #input-delay ").val();

    ipcRenderer.send('altera-delay', delay);
});

// Aceita apenas numeros no input delay
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}