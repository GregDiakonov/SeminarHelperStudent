import { Widget } from "@lumino/widgets";
import { registerStudent, sendData } from "./http";

class StudentInterface extends Widget {
    private isCollapsed = false

    constructor() {
        super();
        this.node.style.position = 'absolute';
        this.node.style.top = '20px'
        this.node.style.right = '20px'
        this.node.style.zIndex = '9999'

        this.node.style.backgroundColor = 'white'
        this.node.style.border = '1px black solid'

        this.node.style.width = '20%'
        this.node.style.padding = '20px'

        this.node.style.height = '30%'

        this.renderMenu()
        this.renderCollapseButton()
    }

    renderMenu() {
        this.node.innerHTML = ''

        const welcomeText = document.createElement('p');
        welcomeText.textContent = "Введите ваши имя, фамилию и номер семинара, чтобы подключиться!"

        welcomeText.style.marginTop = '30px'

        const name = document.createElement('input')
        const surname = document.createElement('input')
        const number = document.createElement('input')

        name.type = 'text'
        surname.type = 'text'
        number.type = 'number'

        name.placeholder = 'Имя'
        surname.placeholder = 'Фамилия'
        number.placeholder = 'Номер семинара'

        name.style.margin = '20px'
        surname.style.margin = '20px'
        number.style.margin = '20px'

        var submitButton = document.createElement('button')
        submitButton.textContent = 'Отправить!'

        submitButton.onclick = async () => {
            let fullname = name.value + '_' + surname.value;
            
            let result = await registerStudent(fullname, Number(number.value))
            
            if (result == 200) {
                this.intervalCollect()
                this.clearEverything()
            } else {
                welcomeText.textContent = 'Не удалось подсоединить вас к семинару. Попробуйте позже.'
            }
        }

        this.node.appendChild(welcomeText)
        this.node.appendChild(name)
        this.node.appendChild(surname)
        this.node.appendChild(number)
        this.node.appendChild(submitButton)
    }

    renderOK() {
        this.node.innerHTML = ''

        this.node.style.width = '20%'

        const okText = document.createElement('p');
        okText.textContent = 'Все хорошо! Начинайте работу!'

        const closeButton = document.createElement('button')
        closeButton.textContent = 'Закрыть'

        closeButton.onclick = () => {
            this.clearEverything()
        }

        this.node.appendChild(okText)
        this.node.appendChild(closeButton)

        this.renderCollapseButton()
    }

    clearEverything() {
        this.node.style.display = 'none'
    }

    renderCollapseButton() {
        const collapseButton = document.createElement('button');

        collapseButton.textContent = '_'
        collapseButton.style.position = 'absolute'
        collapseButton.style.top = '5px'
        collapseButton.style.right = '5px'
        collapseButton.style.zIndex = '9999'

        collapseButton.onclick = () => {
            if(this.isCollapsed) {
                this.isCollapsed = false
                this.node.style.height = '10px'
            } else {
                this.isCollapsed = true
                this.node.style.height = '30%'
            }
        }

        this.node.appendChild(collapseButton)
    }

    collectData() {
        const cms = document.querySelectorAll('.cm-content')
        const cmArray = Array.from(cms)

        const contents = cmArray.map(element => {
            if (element instanceof HTMLElement) {
                return element.innerText
            } else {
                return ''
            }
        })

        sendData(contents)
    }

    intervalCollect() {
        const intervalId = setInterval(() => {
            this.collectData()
        }, 5000)

        intervalId
    }
}
 
export default StudentInterface;