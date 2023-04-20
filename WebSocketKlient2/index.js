const Html5WebSocket = require('html5-websocket');
const ReconnectingWebSocket = require('reconnecting-websocket');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let ws_host = 'localhost';
let ws_port = "3000";
const options = { WebSocket: Html5WebSocket };
const rws = new ReconnectingWebSocket('ws://' + ws_host + ':' + ws_port + '/ws', undefined, options);
rws.timeout = 1000;


rws.addEventListener('open', () => {
 let jmeno
 let zprava

 rl.question('Zadej svoje jméno: ', (answer) => {
  jmeno = answer;
  function Otazka(){
    rl.question('Zadej svoji zprávu: ', (answer) => {
      zprava = answer;
      if (zprava === "konec"){
      }
      else{
        rws.send('Zpráva od ' + jmeno + ':' + zprava);
        Otazka()
      }     
    })
  }
  Otazka()
 })
})


rws.addEventListener('message', (e) => {

    console.log("\n [Klient] Zpráva přijata: " +e.data );
    process.stdout.write("Zadej svoji zprávu: \n");
});
rws.addEventListener('close', () => {
    console.log('[Klient] Připojení ukončeno.');
});

rws.onerror = (err) => {
    if (err.code === 'EHOSTDOWN') {
        console.log('[Klient] Error: Server spadl.');
    }
};

