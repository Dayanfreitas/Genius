const NoticeAlert = function () {
    const body = document.querySelector("body");
    const TIME_NOTICE = 4000;

    const addComponentInBody = (type, msg) => {
        const config = {
            success: {
              icon: 'check'
            },
            error: {
                icon: 'x-circle'
            }
        }

        const template = `
            <div class="alert ${type}">
                <span class="icon">
                    <i class="bi bi-${config[type].icon}"></i>
                </span>
                <span class="msg">${msg}</span>
                <span class="btn-close">
                    <i class="bi bi-x-lg"></i>
                </span>
            </div>
            `
        body.insertAdjacentHTML('afterbegin', template)
    }

    const closeAlert = (alert) => {
        alert.classList.add('hide')
        alert.classList.remove('show')
    }

    const showAlert = (alert) => {
        alert.classList.remove('hide')
        alert.classList.add('show')
        alert.classList.add('showAlert')
        setTimeout(() => {
            closeAlert(alert)
        }, TIME_NOTICE)
    }

    const flash = ({type, msg}) => {
        addComponentInBody(type, msg)
        const alert = document.querySelector(".alert")

        showAlert(alert)
        document.querySelector(".btn-close").addEventListener('click', closeAlert);
    }

    return {
        flash
    }
}()

export default NoticeAlert