import Image from "next/image";
import { database } from "@/db/database";


import { auth } from "@/auth";


import { getImageUrl } from "@/util/files";
import { ItemCard } from "./item-card";

export default async function HomePage() {
  const session = await auth();

  const allitems = await database.query.items.findMany();
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold  ">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allitems.map((item) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </main>
  );
}
