import {DataAPIClient} from '@datastax/astra-db-ts'
import {PuppeteerWebBaseLoader} from "langchain/document_loaders/web/puppeteer"
import OpenAI, { BadRequestError } from "openai"

import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"

import "dotenv/config"
import { truncate } from 'fs'

type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

//Api endpoint and application token; and db namespace are needed
// to connect to the database

const { ASTRA_DB_NAMESPACE,
        ASTRA_DB_COLLECTION,
        ASTRA_DB_API_ENDPOINT,
        ASTRA_DB_APPLICATION_TOKEN,
        OPENAI_API_KEY
     } = process.env

const openai = new OpenAI({apiKey: OPENAI_API_KEY})

const nflData = [
    'https://en.wikipedia.org/wiki/National_Football_League',
    'https://www.nfl.com/',
    'https://www.pro-football-reference.com/',
    'https://www.espn.com/nfl/',
    'https://www.pff.com/nfl',
    'https://www.statmuse.com/nfl'
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512, // no of characters in each chunk
    chunkOverlap: 100 //overlapping characters between chunks

})

//collection: container containing semi-structured data in the form on json documents
const createCollection = async(similarityMetric:SimilarityMetric = "dot_product") =>{
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,   //dimension size has to match with openai's embedding model
            metric: similarityMetric

        }
    })
    console.log(res)

}
const scrapePage = async(url:string)=>{
    //puppeteer; js library that allows you to scrape and interact with browser windows
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions:{
            headless: true
        },
        gotoOptions:{
            waitUntil: "domcontentloaded"
        },
        evaluate: async (page, browser) => { //to run the browser in headless mode
            const result = await page.evaluate(()=> document.body.innerHTML)
            await browser.close()
            return result

        }
})

        return (await loader.scrape())?.replace(/<[^>]*>?/gm, '')
    }


const loadSampleData = async () =>{
    const collection = await db.collection(ASTRA_DB_COLLECTION)
    for await ( const url of nflData){
        const content = await scrapePage(url)
        const chunks = await splitter.splitText(content)
        for await ( const chunk of chunks){
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk,
                encoding_format: "float"
            })

            const vector = embedding.data[0].embedding

            const res = await collection.insertOne({
                $vector: vector,
                text:chunk

            })
            console.log(res)
        }

    }
}


createCollection().then(()=>loadSampleData())