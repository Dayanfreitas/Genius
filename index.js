const Helper = function () {
    function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        randomInt
    }
}()

const Songs = () => {
    const SONGS = {
        green: new Audio('./assets/audio_green.wav'),
        red: new Audio('./assets/audio_red.wav'),
        blue: new Audio('./assets/audio_blue.wav'),
        yellow: new Audio('./assets/audio_yellow.wav'),
        error: new Audio('./assets/audio_error.wav'),
    }
    
    const getSong = name => {
        const song = SONGS[name.toLowerCase()]
        
        const play = () => {
            song.play()
        }   
        
        const stop = () => {
            song.play()
            cue()
        }   
        
        const cue = (point = 0) => {
            song.pause()
            song.currentTime = point
        }    

        return {
            play,
            stop,
        }
    }
    

    const play = name => {
        const song = getSong(name)
        song.play()

        return song
    }
    
    return {
        play,
    }
}

const songs = Songs()
const Game = ({player}) => {
    const COLORS = document.querySelectorAll(".color")
    const TIME_OUT_OFF_COLOR = 500
    const NUMBER_COLOR = {
        1: 'GREEN',
        2: 'RED',
        3: 'BLUE',
        4: 'YELLOW'
    }

    const getColor = (name) =>  { return document.querySelector("."+name) }

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
        
        const index = game.order_player.length
        game.order_player[index] = id.toUpperCase()
        
        if (game.order_player[index] == game.order_machine[index]) {
            console.log(game.order_player[index])
            console.log(game.order_machine[index])
            
            bip(target).then((r) => {
                if (game.order_player.length == game.order_machine.length) {
                    alert("Passou de nivel !")
                    
                }
                console.log(r)
            })
            return;
        } 

        alert("GAME OVER!")
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

    const readAnswer = () => {
        console.log("COLORS")
        // console.table(COLORS)
        COLORS.forEach((el) => {
            el.addEventListener('click', clickColor)
        })

    }

    const processNextColor = ({e, el, index, song}) => {
        index++;
        
        offColor({color_name: e, el, song});
        if (index < game.order_machine.length) {
            display(index);
            return
        }
        readAnswer()
        // index = 0
        // debugger
    }
    
    const processBip = ({e, el, index}) => {
        const song = songs.play(e)
        onColor({color_name: e, el, song});
        setTimeout(() => {
            processNextColor({e, el, index, song})
        }, TIME_OUT_OFF_COLOR);
    }

    const game = {
        player: player,
        score: 0,
        order_machine: [],
        order_player: []
    }

    const on = (e) => {
        display(0)
        // debugger
    }

    const display = (index) => {
        const e = game.order_machine[index]
        const el = getColor(e.toLowerCase())
        setTimeout(() => {
            processBip({e, el, index})
        }, TIME_OUT_OFF_COLOR);
    }

    const off = () => {
        document.querySelector("#play").classList.add("d-none")
        // debugger
        // init()
    }
    
    const drawColor = () => {

    }

    const populateColor = () => {
        const random = Helper.randomInt(1, 5)
        game.order_machine.push(NUMBER_COLOR[random])
    }

    const init = () => {    
        game.order_machine = ["GREEN", "RED", "BLUE", "YELLOW"]
        
        // for (let i= 0; i < 4; i++) {
        //     populateColor()
        // }

        return {
            NUMBER_COLOR,
            on,
            off,
            game,
            drawColor
        }
    }

    return {
        init
    }
}

const game = Game({player: "Dayan"}).init()
// console.log("GAME::", game)

const Config = () => {
    const changeOnOff = (e) => {
        document.querySelectorAll(".color").forEach((el) => { 
            el.classList.toggle("on")            
        })

        const play = document.querySelector("#play")
        play.classList.remove("d-none")
        if (e.checked) {
            play.addEventListener("click", game.on)
            return
        }
        game.off()
    }
    
    const changeMode = () => {
        document.body.classList.toggle("dark")
    }

    const toogleCheckbox = ({target}) => {
        if (target.id.includes("on_off")) {            
            changeOnOff(target)
        }else if (target.id.includes("dark_mode")) {
            changeMode()
        }
    }

    const init = () => {
        const arr = document.querySelectorAll("input[type=checkbox]")
        arr.forEach((el) => {
            el.checked = false
            el.addEventListener('change', toogleCheckbox)
        })
    }

    return {
        init
    }
}

const config = Config().init()