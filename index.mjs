import http from 'node:http'

import { Product } from './model/Product.mjs';
import { Money } from './model/Money.mjs';

const products = [
    new Product(101, "Пицца Маргарита", "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    new Money(100, 'MDL')
    ),
    new Product(102, "Гамбургер", "https://www.rbc.ua/static/img/_/p/_pixabay_com_209_1300x820.jpg",
    new Money(450, 'MDL')
    ),
    new Product(102, "Паста Карбонара", "https://topfood.club/assets/cache_image/uploads/recipes/2021-11-11-jinghu-543_756x0_62c.jpg",
    new Money(500, 'MDL')
    ),
];

const server = http.createServer((req,res) => {

    res.setHeader("Content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")

    if (req.url.startsWith("/api/products")) {
        res.end(JSON.stringify(products))
    } else if (req.url.startsWith("/api/order/")) {
        //HW try to extract/capture the is value - using regex
        let itemId = parseInt(req.url.replace('/api/order',''))

        res.end(JSON.stringify({
            message: "order placed succesfully",
            itemId: itemId
        }))
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({
            status: 404,
            message: "not found"
        }))
    }
})

server.listen("3001", "localhost")