
const Songs = () => {
    let muted = false

    const SONGS = {
        green: new Audio('./assets/audio_green.wav'),
        red: new Audio('./assets/audio_red.wav'),
        blue: new Audio('./assets/audio_blue.wav'),
        yellow: new Audio('./assets/audio_yellow.wav'),
        error: new Audio('./assets/audio_error.wav'),
    }
    
    const getSong = name => {
        const song = SONGS[name.toLowerCase()]
        song.muted = muted

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

    const play = name => getSong(name)

    const off = () => {
        muted = true
    }

    const on = () => {
        muted = false
    }

    return {
        play,
        off,
        on
    }
}

export default Songs