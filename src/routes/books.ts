import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { type } from "os";


const book = Type.Object({
    id : Type.String({format:'uuid'}),
    name: Type.String(),
    author: Type.String()
});
type book = Static<typeof book>;

const qbook = Type.Object({
    name:Type.Optional(Type.String()),
});
type qbook = Static<typeof qbook>;

export let books : book[] = [{id:"0552d9c8-2e69-41cd-931d-27aea74d8a52",name:"Diary of a Wimpy Kid #1",author:"Jeff Kinney"},
{id:"728d41f2-1208-44ea-8d9c-2c276064e970", name:"Diary of a Wimpy Kid #2",author:"Jeff Kinney"},
{id:"8792fed6-96bd-4a4b-9418-fd07d89818b0",name:"Diary of a Wimpy Kid #3",author:"Jeff Kinney"}];

export default async function name(server:FastifyInstance) {
      server.route({
        method:'GET',
        url: '/books',
        schema:{
            summary:'getting books',
            tags:['Books'],
            querystring: qbook
        },
        handler: async (request, reply)=>{
         const query = request.query as qbook;
         if(query.name){
        return books.filter((c)=>c.name.includes(query.name ?? ''))
         }else{
        return books;
         }
        }

      });
    
}