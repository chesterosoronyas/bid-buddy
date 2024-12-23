
import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { getImageUrl } from "@/util/files";
import Link from "next/link";
import  Image from "next/image";
import { pageTitle } from "@/styles";
import { formatToDollar } from "@/util/currency";
export function ItemCard({item}: {item:Item}){
    return(
        <div key={item.id} className="border p-8 rounded-xl space-y-2">
            <Image src={getImageUrl(item.fileKey)} alt={item.name} width={200} height={200}/>
            <h2 className={pageTitle}>{item.name}</h2>

            <p className="text-lg">startingprice: ${formatToDollar(item.startingPrice)}</p>
            <Button asChild>
               <Link href={`/items/${item.id}`}>
               Place bid
               </Link> 
            </Button>
          </div>
    )
}