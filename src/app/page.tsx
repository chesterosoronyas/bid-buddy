import Image from "next/image";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import { createItemAction } from "./items/create/action";
export default async function HomePage() {
  const session = await auth();

  const allitems = await database.query.items.findMany();
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold  ">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allitems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl space-y-2">
            {item.name}
            startingprice: {item.startingPrice/100}
          </div>
        ))}
      </div>
    </main>
  );
}
