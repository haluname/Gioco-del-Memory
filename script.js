let cards = document.querySelectorAll("div");
let main = document.querySelector("main");
let turnoScritta = document.querySelector("h2")
cards = Array.from(cards); //mi serve per passare dal NodeList ad un vero e proprio array
let img = [
    "https://static01.nyt.com/images/2018/05/23/dining/23fruit/23fruit-superJumbo.jpg",
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Kiwi-fruits-582a07b.jpg?resize=768,574",
    "https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/800px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg",
    "https://media.istockphoto.com/id/533381303/photo/cherry-with-leaves-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=6BV79sui5Hc6lj555eV_ePiGlKfdZveIG9B5hIWidug=",
    "https://missfreschezza.com/wp-content/uploads/2019/07/Ananas_eshop.jpg",
    "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
    "https://wips.plug.it/cips/buonissimo.org/cms/2013/04/51015865_m.jpg"
]

let nomeImg = [
    "Anguria",
    "Kiwi",
    "Mela",
    "Fragola",
    "Ciliegia",
    "Ananas",
    "Lattuga",
    "Cocco"
]

let nDiv = 16;
let rnd = 0;
let nClick = 0;
let cartaPrecedente;
let turno = 1; //turno potrà essere |1 per giocatore 1| e  |2 per giocatore 2|
let punteggio1 = 0;
let punteggio2 = 0;

for (let i = 0; i < img.length; i++) {
    rnd = Math.floor(Math.random()*(nDiv))
    //cards[rnd].style.backgroundImage = `url('${img[i]}')`;
    cards[rnd].setAttribute("data-image", img[i])
    nDiv--;
    cards.splice(rnd,1);

    rnd = Math.floor(Math.random()*(nDiv))
    //cards[rnd].style.backgroundImage = `url('${img[i]}')`;
    cards[rnd].setAttribute("data-image", img[i])
    nDiv--;
    cards.splice(rnd,1);

}

/*
cards = document.querySelectorAll("div");
console.log(cards[1].dataset.image); 
console.log(cards[2].dataset.image); 
*/

cards = document.querySelectorAll("div");

for(let i=0; i<cards.length; i++){
    cards[i].addEventListener("click", mostraCard)
}

function mostraCard(){
    this.style.pointerEvents = 'none' //PER DISABILITARE I DIV DATO CHE DISABLE E READONLY NON FUNZIONA
    nClick++;
    console.log("click")
    let valData = this.dataset.image;
    let card = this;
    this.style.backgroundImage = `url('${valData}')`;   
    if(nClick == 2){
        
        if(cartaPrecedente.style.backgroundImage == card.style.backgroundImage){
            card.classList.add("inactive");
            cartaPrecedente.classList.add("inactive");

            if(turno==1){
                turno = 2;
                punteggio1++;
            }
            else{
                turno = 1;
                punteggio2++;
            }
        }

        
        if(punteggio1 + punteggio2 == 8){
            setTimeout(function(){
                alert("PUNTEGGIO PLAYER1: " + punteggio1 + " PUNTEGGIO PLAYER2: " + punteggio2)
            },1000)
        }
        else{
            cicloPointerEvents("none")
            let p = document.createElement("p");
            p.innerText = "2";
            main.appendChild(p)
    
            setTimeout(function() {
                p.innerText = "1";
                setTimeout(function() {
                    p.remove(); // Rimuovi l'elemento <p> dal suo genitore <main>
                }, 1000);
    
                setTimeout(function(){
                    if (cartaPrecedente.style.backgroundImage !== card.style.backgroundImage) {
                        card.style.backgroundImage = 'none';
                        cartaPrecedente.style.backgroundImage = 'none';
                    }
                },1000)
               
                
            }, 1000);
    
            nClick = 0;
            
            if(turno==1){
                turno = 2
                turnoScritta.innerHTML = "Tocca al Giocatore 2"
            }
            else{
                turno = 1;
                turnoScritta.innerHTML = "Tocca al Giocatore 1"

            }
    
            console.log(turno)
    
            setTimeout(function(){
                cicloPointerEvents("all")
            },2000)
            
        }
      
        }
        else{
            cartaPrecedente = this;
        }
        
       
}

function cicloPointerEvents(string){
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.pointerEvents = string
    }
}
