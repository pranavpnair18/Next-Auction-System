
import Getbyid, { DataStore } from "@/app/datastore/DataStore";

export default async function NewProductiddetils({params}: {params: Promise<{newid:string}>}){
    const nid = (await params).newid
    const newitem: DataStore | undefined = Getbyid(nid)

    if (!newitem) {
        return (
            <div className="text-white text-center mt-8">
                Product not found full page
            </div>
        );
    }

    return (
        <div className="text-white flex justify-center items-center min-h-7 p-4">
            <div className="flex flex-col items-center border-2 border-amber-200 rounded-lg p-8 max-w-2xl w-full">
                <img src={newitem.img} alt={newitem.title} className="mb-4 max-w-md w-full" />
                <h1 className="text-2xl font-bold mb-4">{newitem.title} full page</h1>
                <p className="text-lg mb-4">{newitem.desc}</p>
            </div>
        </div>
    );


    
}
