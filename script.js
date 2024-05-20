let fundo = document.body
const nomemusica = document.getElementById('musica')
const playlistname = document.getElementById('playlistname')
const bandaname = document.getElementById('banda')
const progresso = document.getElementById('progresso')
const containerbarra = document.getElementById('containerbarra')
const song = document.getElementById('audio')
const capa = document.getElementById('capa')
const play = document.getElementById('start')
const back = document.getElementById('voltar')
const next = document.getElementById('avancar')
const like = document.getElementById('like')
const embaralhar = document.getElementById('embaralhar')
const repetir = document.getElementById('repetir')
const timer = document.getElementById('timer')
const duracao = document.getElementById('duracao')

/*criando as caracteristicas de cada musica*/

const baslavida = {
    nomemusica : "Ainsi basla vida",
    bandaname : "Indila",
    file:"Ainsibaslavida-Indila",
    favorito: false,
    backcolor:'linear-gradient(to bottom , rgb(0, 91, 105) , rgb(1, 30, 45)'
}

const letgo = {
    nomemusica : "Let Go",
    bandaname : "Ark Patrol",
    file:"LetGo-ArkPatrol",
    favorito: false,
    backcolor:'linear-gradient(to bottom , rgb(193, 51, 19) , rgb(45, 1, 9)'

}

const lacampanella = {
    nomemusica : "Lacampanella",
    bandaname : "Niccolo Paganini",
    file:"Lacampanella-NiccoloPaganini",
    favorito: false,
    backcolor: 'linear-gradient(to bottom , rgb(185, 173, 6) , rgb(43, 45, 1)'
}

/*definiçoes iniciais */

let tocando = false
const playlist = JSON.parse(localStorage.getItem('playlist') ) ?? [baslavida, letgo , lacampanella]
let randomlist = [...playlist]
let embaralhado = false
let repeticao = false
let indice = 0

function iniciar(){
    
     play.querySelector('.bi').classList.remove('bi-play-circle-fill');
     play.querySelector('.bi').classList.add('bi-pause-circle-fill') ;
     song.play()
      
     tocando = true
}

function pausar(){
   
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill') ;
    song.pause()
     
    tocando = false
}

function iniciaroupausar(){
    if (tocando === true){
        pausar()
    }
    else{
        iniciar()
    }
}

function inlikeoudeslike(){
    if (randomlist[indice].favorito === true){
     like.querySelector('.bi').classList.remove('bi-heart');
     like.querySelector('.bi').classList.add('bi-heart-fill') ;
    }
    else{
     like.querySelector('.bi').classList.remove('bi-heart-fill');
     like.querySelector('.bi').classList.add('bi-heart') ;
  }
 }

 /*primeira musica carregada*/

function musicainicial(){
 
 capa.src = `img/${randomlist[indice].file}.jfif`
 nomemusica.innerText = randomlist[indice].nomemusica
 bandaname.innerText = randomlist[indice].bandaname
 song.src = `songs/${randomlist[indice].file}.mp3`
 fundo.style.background = randomlist[indice].backcolor
 inlikeoudeslike()
 
}

function avancar(){
  if(indice < randomlist.length -1){  
    indice++
  }
  else{
    indice = 0
  }
  musicainicial()
  iniciar()
}

function voltar(){
   if(indice === 0) {
    indice = randomlist.length - 1
   }
   else{
    indice = indice - 1
   } 
    musicainicial()
    iniciar()
}

/*embaralhando a randomlist */


function embaralhando(PreRandomList) {
    const size = PreRandomList.length;
    let novoindice = size - 1
    
 while(novoindice > 0)
{
    let randomindice = Math.floor (Math.random() * size) 
    let auxiliar = PreRandomList[novoindice]
    PreRandomList[novoindice] = PreRandomList[randomindice]
    PreRandomList[randomindice] = auxiliar
    novoindice = novoindice - 1
 } 
}

function embaralharclick(){
    if(embaralhado === false){
        embaralhado = true
        embaralhando(randomlist);
        embaralhar.classList.add('button-active')
    }
    else{
        embaralhado = false
        randomlist = [...playlist];
        embaralhar.classList.remove('button-active')
    }
  
}



function avancandonabarra(){
    let larguraprogresso = (song.currentTime/song.duration)*100
    progresso.style.setProperty('--progress',`${larguraprogresso}%`)

    if(song.currentTime === song.duration && repeticao === false){
        avancar()
    }
}

function pulandopara(event){
    const width = containerbarra.clientWidth;
    const clickposition = event.offsetX;
    const pulando = (clickposition/width)* song.duration;
    song.currentTime = pulando
}

function replayclick (){
    if(repeticao === false){
        repeticao = true
        repetir.classList.add('button-active')
    }
    else{
        repeticao = false
        repetir.classList.remove('button-active')
    }
}

function replay (){
  
    
    if(repeticao === false)
        {
            avancar()
        }
        else{
          song.play()
       }
}

function timeatual(){
   
    timer.innerText = HMS(song.currentTime)
}

function duracaototal(){

    duracao.innerText = HMS(song.duration)
}

/*convertendo os segundos pelo time*/

function HMS (tempototal){
     let hours = Math.floor(tempototal / 3600)
     let minutes = Math.floor((tempototal - hours * 3600) /60 )
     let second = Math.floor((tempototal - hours * 3600 - minutes * 60))

     return (`${hours .toString().padStart(2, '0')}:${minutes .toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`)
}

function likeclick(){
    if(randomlist[indice].favorito === false){
        randomlist[indice].favorito = true
    }
    else{
        randomlist[indice].favorito = false 
    }
   inlikeoudeslike()
   
/*salvando as informações*/
localStorage.setItem('playlist' ,JSON.stringify(playlist))
}

/*chamando função inicial*/

musicainicial();



/*eventos*/

play.addEventListener("click", iniciaroupausar)
next.addEventListener("click" , avancar)
back.addEventListener("click" , voltar)
like.addEventListener("click" , likeclick)
embaralhar.addEventListener("click" , embaralharclick)
song.addEventListener("timeupdate" ,  avancandonabarra)
song.addEventListener("timeupdate" , timeatual)
song.addEventListener("loadedmetadata" ,  duracaototal)
song.addEventListener("ended" , replay)
repetir.addEventListener("click" , replayclick)
containerbarra.addEventListener("click" , pulandopara)

