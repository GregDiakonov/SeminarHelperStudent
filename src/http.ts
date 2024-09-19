import axios from 'axios'
import { Global } from './global';

const serverAddress = 'http://localhost:5000'

export const httpClient = axios.create({
    baseURL: serverAddress,
});

export async function registerStudent(name: string, seminarNumber: number): Promise<number> {
    try {
        await httpClient.post(`sem/new/${seminarNumber}/${name}`)
        Global.studentName = name
        Global.semNumber = seminarNumber
        return 200
    } catch(error) {
        console.error("Не получилось подключиться к семинару")
        throw error;
    }
}



export async function sendData(contents: Array<string>): Promise<any> {
    try {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDistance = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        const percentage = (scrollDistance / scrollHeight) * 100;
                
        await httpClient.post(`sem/${Global.semNumber}/${Global.studentName}`, {
            texts: JSON.stringify(contents),
            position: percentage
        })
    } catch(error) {
        console.error('Не получилось послать данные студента к серверу')
    }
}