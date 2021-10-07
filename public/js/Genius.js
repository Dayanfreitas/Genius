import Helper from "./Helper.js"
import NoticeAlert from './NoticeAlert.js'

const Genius = ({ songs }) => {
    const GENIUS_CONFIGURATION = {
        SCORE_DISPLAY: document.querySelector("#score"),
        BUTTON_PLAY: document.querySelector("#play"),
        COLORS: document.querySelectorAll(".color"),
        TIME_OUT_OFF_COLOR: 350,
        NUMBER_COLOR: {
            1: 'GREEN',
            2: 'RED',
            3: 'BLUE',
            4: 'YELLOW'
        },
        STATUS: {
            0: 'OFF',
            1: 'ON',
        }
    }

    const state = {
        status: "off",
        score: 0,
        order_machine: [],
        order_player: []
    }
    
    const restartState = () => {
        state.score = 0
        state.order_machine = []
        state.order_player = []

        GENIUS_CONFIGURATION.SCORE_DISPLAY.innerHTML = 0
        configurationButtonColor(false)
    }

    const getColor = name => document.querySelector("."+name)

    const onColor = ({color_name, el, song}) => {
        console.log(color_name + "-> [On]")
        
        el.classList.add("bip")
        el.classList.add("zoom")
        song.play()
    }
    
    const offColor = ({color_name, el, song}) => {
        console.log(color_name + "-> [Off]")
        el.classList.remove("bip") 
        el.classList.remove("zoom")
        
        song.stop()
    }

    const clickColor = (e) => {
        const { target } = e
        const { id } = target
        console.log('target', target)
        console.log('id', id)
        
        const index = state.order_player.length
        state.order_player[index] = id.toUpperCase()
        
        if (state.order_player[index] == state.order_machine[index]) {
            
            bip(target).then((r) => {
                if (state.order_player.length == state.order_machine.length) {
                    NoticeAlert.flash({type:'success', msg: "Passou de nivel !"})
                    nextLevel()
                }
            })

            return;
        }
        gameOver();
    }
    
    const bip = (el) => {
        return new Promise((resolve) => {
            const color_name = el.id
            const song = songs.play(color_name)

            onColor({color_name, el, song});
            setTimeout(() => {
                offColor({color_name, el, song});

                resolve(true)
            }, 400)
        })
    }

    const processNextColor = ({e, el, index, song}) => {
        index++;
        
        offColor({color_name: e, el, song});
        if (index < state.order_machine.length) {
            display(index);
            return
        }
        configurationButtonColor(true)
    }
    
    const processBip = ({e, el, index}) => {
        const song = songs.play(e)
        onColor({color_name: e, el, song});
        setTimeout(() => {
            processNextColor({e, el, index, song})
        }, GENIUS_CONFIGURATION.TIME_OUT_OFF_COLOR);
    }


    const display = (index) => {
        const e = state.order_machine[index]
        const el = getColor(e.toLowerCase())
        setTimeout(() => {
            processBip({e, el, index})
        }, GENIUS_CONFIGURATION.TIME_OUT_OFF_COLOR);
    }

    const on = () => {
        GENIUS_CONFIGURATION.COLORS.forEach((el) => { 
            el.classList.add("on");
        })
        GENIUS_CONFIGURATION.BUTTON_PLAY.classList.remove("d-none");
    }

    const off = () => {
        // state.state = GENIUS_CONFIGURATION.STATUS[0];
        GENIUS_CONFIGURATION.COLORS.forEach((el) => { 
            el.classList.remove("on");
        })
        GENIUS_CONFIGURATION.BUTTON_PLAY.classList.add("d-none");

        restartState();   
    }

    const start = () => {
        GENIUS_CONFIGURATION.BUTTON_PLAY.classList.add("d-none");
        
        addNewColor();
        display(0);
    }

    const gameOver = () => {
        // alert("GAME OVER!");
        NoticeAlert.flash({type: 'error', msg: "GAME OVER!!"})
        GENIUS_CONFIGURATION.BUTTON_PLAY.classList.remove("d-none");

        restartState();
    }
    
    const nextLevel = () => {
        state.score++;
        GENIUS_CONFIGURATION.SCORE_DISPLAY.innerHTML = state.score

        clearOrderPlayer();
        addNewColor();
        display(0);
    }

    const clearOrderPlayer = () => { state.order_player = [] }
    const genereteColor = () => GENIUS_CONFIGURATION.NUMBER_COLOR[Helper.randomInt(1, 5)]

    const addNewColor = () => {
        state.order_machine[state.order_machine.length] = genereteColor()
    }

    const configurationButtonPlay = () => GENIUS_CONFIGURATION.BUTTON_PLAY.addEventListener("click", start)
    const configurationButtonColor = (read= false) => {
        GENIUS_CONFIGURATION.COLORS.forEach((el) => {
            el.addEventListener('click', read ? clickColor : () => {})
        })

        // GENIUS_CONFIGURATION.COLORS.forEach((el) => {
        //     el.addEventListener('click', () => {})
        // })
    }
    

    const init = () => {

        configurationButtonPlay();
        configurationButtonColor();

        return {
            on,
            off,
            songs,
            state
        }
    }

    return {
        init
    }
}

export default Genius