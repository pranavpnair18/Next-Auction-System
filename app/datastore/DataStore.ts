import { NextResponse } from "next/server";

 export type DataStore = {
    id: number;
    img: string;
    title: string;
    desc: string;
    Enddate?: Date;
}

export const dataStore: DataStore[] = [
    {
        id: 1,
        img: "https://picsum.photos/id/237/200/300",
        title: "Sample Item 1",
        desc: "It is a long established fact that a reader will be hahha ahha ahajaj kaaj.",
        Enddate: new Date("2025-11-05"),
    },
    {
    id: 2,
    img: "https://picsum.photos/id/1025/200/300",
    title: "Classic Pocket Watch",
    desc: "Vintage silver pocket watch with intricate engravings.",
    Enddate: new Date("2025-11-10"),
   },
   {
    id: 3,
    img: "https://picsum.photos/id/1016/200/300",
    title: "Oil Painting - The Seaside",
    desc: "Beautiful 19th-century landscape painting of a seaside view.",
    Enddate: new Date("2025-11-08"),
   },
    {
    id: 4,
    img: "https://picsum.photos/id/1028/200/300",
    title: "Classic dof Watch",
    desc: "Vintage silver pocket watch with new land mark engravings.",
    Enddate: new Date("2025-11-22"),
   },
   
    {
    id: 5,
    img: "https://picsum.photos/id/1033/200/300",
    title: "immigrant Pocket Watch",
    desc: "Vintage king of liar latest mind thing watch with intricate engravings.",
    Enddate: new Date("2025-11-20"),
   },
];

// export  function GET( params :{ id:string }){
// const id = Number(params.id);
// const item = dataStore.find((d)=>(d.id==id))
// if(!item){
//     return NextResponse.json({message: "item not found"})
// }
// else{
//     return  NextResponse.json(item)
// }
// }

export default function Getbyid(sid: string): DataStore | undefined {
        const id = Number(sid);
        const items = dataStore.find((data)=>data.id == id);
        return items;
}
