import Songs from './js/Songs.js'
import Genius from './js/Genius.js'

const genius = Genius({ songs: Songs() }).init()
console.log('genius', genius)

const Main = (game) => {

    const changeOnOff = (e) => {
        e.checked ? game.on() : game.off()
    }
    
    const changeColorNeutro = () => {
        // TODO: Implentar aumento da pontuação quando tirar a cor
        console.error("Você irá jogar sem cor, sua pontuação aumententa em %2");
        
        document.querySelectorAll(".color").forEach((el) => { 
            el.classList.toggle("neutro")            
        })
    }
    
    const changeSound = (e) => {
        // TODO: Implentar aumento da pontuação quando tirar o som
        e.checked ? game.songs.on() : game.songs.off() 
    }

    const changeMode = () => {
        document.body.classList.toggle("dark")
    }

    const toogleCheckbox = ({target}) => {
        if (target.id.includes("on_off")) {            
            changeOnOff(target)
        }else if (target.id.includes("dark_mode")) {
            changeMode()
        }else if (target.id.includes("color_neutro")) {
            changeColorNeutro(target)
        }else if (target.id.includes("sound")) {
            changeSound(target)
        }
    }

    const init = () => {
        const arr = document.querySelectorAll("input[type=checkbox]")
        arr.forEach((el) => {
            el.addEventListener('change', toogleCheckbox)
        })
    }

    return {
        init
    }
}

Main(genius).init()
// BuscaTodas as cores -> click -> ligar quando genius
