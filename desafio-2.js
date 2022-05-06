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

const run = async () => {
    const products = new Contenedor('productos.txt')
    console.log(await products.getAll());
    let save1 = await products.save({title: 'Taza', price: 250,thumbnail:'image'})
    console.log('Se guardo el producto ', save1)
    console.log(await products.getAll());

    let save2 = await products.save({title: 'Taza', price: 250,thumbnail:'image'})
    console.log('Se guardo el producto ', save2)
    console.log(await products.getAll());

    let save3 = await products.save({title: 'Taza', price: 250,thumbnail:'image'})
    console.log('Se guardo el producto ', save3)
    console.log(await products.getAll());

    let save4 = await products.save({title: 'Taza', price: 250,thumbnail:'image'})
    console.log('Se guardo el producto ', save4)
    console.log(await products.getAll());

    console.log('La busqueda con el id 2', await products.getById(2));

    console.log('Elimino el objeto con id 3')
    await products.deleteById(3)
    console.log(await products.getAll());

    console.log('Elimino todos los objetos')
    await products.deleteAll()
    console.log(await products.getAll());
}

run()