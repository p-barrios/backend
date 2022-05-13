/**
 * Codigo necesario para el desafio
 */
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
let arrProducts = []
const runProducts = async () => {
    await products.save({title: 'Taza', price: 250,thumbnail:'image1'})
    await products.save({title: 'Vaso', price: 150,thumbnail:'image2'})
    await products.save({title: 'Chop', price: 350,thumbnail:'image3'})
    arrProducts = await products.getAll()
}
runProducts()

/**
 * Desafio-3
 */
const express = require('express')
const app = express()

app.get('/productos', (req, res) => {
    let response = `<h1>Productos</h1><hr>`
    for(let i=0; i<arrProducts.length; i++) {
        response = response + `
        <h3>Producto ${arrProducts[i].title}</h3>
        <p>Precio ${arrProducts[i].price}</p>
        <p>Imagen: ${arrProducts[i].thumbnail}</p>
        `
    }
    res.send(response)
})

app.get('/productoRandom', (req, res) => {
    let pos = Math.floor(Math.random() * arrProducts.length);
    let response = `
        <h1>Producto Random (Pos = ${pos})</h1>
        <hr>
        <h3>Producto ${arrProducts[pos].title}</h3>
        <p>Precio ${arrProducts[pos].price}</p>
        <p>Imagen: ${arrProducts[pos].thumbnail}</p>
    `
    res.send(response)
})

app.listen(8080, () => {
    console.log('Server run in port 8080!')
})
