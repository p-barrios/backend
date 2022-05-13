const fs = require('fs')

class Contenedor {

    constructor(nombre) {
        this.nombre = nombre
        this.id = 1
    }

    async save(product){
        product['id'] = this.id
        let res = this.id
        this.id++
        try {
            let content = JSON.parse(await fs.promises.readFile(this.nombre))
            content.push(product)
            await fs.promises.writeFile(this.nombre, JSON.stringify(content))
            return res
        } catch(e) {
            console.log('Error in method save() ', e)
        }
    }

    async getById(number){
        try {
            let content = JSON.parse(await fs.promises.readFile(this.nombre))
            const found = content.find(element => element.id = number)
            if (found !== undefined) {
                return found
            } else {
                return null
            }
        }catch(e) {
            console.log('Error in method getById() ', e)
        }
    }

    async getAll() {
        try {
            let content = JSON.parse(await fs.promises.readFile(this.nombre))
            return content
        }catch(e) {
            console.log('Error in method getAll() ', e)
            return []
        }
    }

    async deleteById(number){
        try {
            let content = JSON.parse(await fs.promises.readFile(this.nombre))
            let newContent = content.filter((element) => element.id !== number)
            await fs.promises.writeFile(this.nombre, JSON.stringify(newContent))
        }catch(e) {
            console.log('Error in method deleteById() ', e)
        }
    }

    async deleteAll(){
        try {
            let newContent = []
            await fs.promises.writeFile(this.nombre, JSON.stringify(newContent))
        }catch(e) {
            console.log('Error in method deleteAll() ', e)
        }
    }
}

const products = new Contenedor('productos.txt')
const runContenedor = () => {
    products.save({})
}

// Desafio 3

const express = require('express')
const app = express()

app.get('/productos', (res) => {
    res.send('pong')
})

app.listen(8080, () => {
    console.log('Server run in port 8080!')
})
