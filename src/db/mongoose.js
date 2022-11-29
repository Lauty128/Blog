const mongoose = require("mongoose")

//-------- Connect
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog.adrmtj5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then( console.log("Inicio exitoso") )
    .catch( err=> console.log("ocurrio un error: ",err) )


class ArticleClass {
    constructor(){
        this.articleModel = require("./articleModel");
        // calls the article model and saves it as an attribute
    }

    getAllData = async()=>{
        const articles = await this.articleModel.find({}).sort({ createdAt:-1 })
        return articles
        // obtains all the articles and returns them  
    }

    getAllOrderData = async()=>{
        const articles = await this.articleModel.find({}).sort({ views: -1 })
        return articles
    }

    getOneData = async(id)=>{
        const articles = await this.articleModel.findOne({ _id: id })
        return articles
        // obtains the article with the id passed by parameter and returns it  
    }
    
    addData = async ({
        title,
        imageContribution,
        alt,
        category,
        createdAt,
        createdBy,
        content
        }, image)=>{   // the image is separated because it is not in req.body
            const article = await new this.articleModel({
                title,
                image,
                imageContribution,
                alt,
                category,
                createdAt,
                createdBy,
                content,
                views:0
            })
            const newArticle = await article.save()
            // add the article in the database with the .save()
            return newArticle;
            // returns the new article
        }

    newVisualization = async (id) => {
        const article = await this.articleModel.findOne({ _id:id })
        article.views += 1;
        // add one to views

        await this.articleModel.updateOne({_id:id}, { $set:{ views: article.views } })
        // update article
    }

    removeData = async(id)=>{
        const articles = await this.articleModel.deleteOne({ _id:id })

        return {
            data: "El Articulo a sido eliminado Correctamente",
            status:200
        }

    }

}

const Article = new ArticleClass()

module.exports = Article
// Instance the object and returns it