import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";
import { dataStore } from "../datastore/DataStore";

export  async function GET(){
    return Response.json(dataStore)
}

export async function POST(request: Request){
        const data = await request.json()
        const newdata = {
            id: dataStore.length+1 ,
            img: data.img,
            title: data.title,
            desc: data.desc
        }
        dataStore.push(newdata)
        return new Response(JSON.stringify(newdata.id),{
            headers:{"Content-type": "application/json"},
            status: 201,
        })

}

export async function PUT(request: Request) {
    try {
        const putdata = await request.json();
        const { id, ...updateData } = putdata;

        // Find the index of the item to update
        const itemIndex = dataStore.findIndex((data) => data.id === Number(id));
        
        if (itemIndex === -1) {
            return new Response(JSON.stringify({ error: "Item not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Update the existing item with new data, maintaining existing values if not provided
        dataStore[itemIndex] = {
            ...dataStore[itemIndex],   // Keep existing data
            ...updateData              // Override with new data
        };

        return new Response(JSON.stringify(dataStore[itemIndex]), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}

