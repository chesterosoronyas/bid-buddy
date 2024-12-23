import { Button } from "@/components/ui/button";
import { pageTitle } from "@/styles";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/util/files";
import { timestamp } from "drizzle-orm/pg-core";
import { formatDistance } from "date-fns";
import { formatToDollar } from "@/util/currency";
import { createBidAction } from "./actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}
export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await getItem(parseInt(itemId));
  /*const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });*/

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" width="200" height="200" alt="Package" />

        <h1 className={pageTitle}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid.
          <br />
          Please go back and search for a different auction item.
        </p>

        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }
  /*const bids = [
    {
      id: 1,
      amount: 100,
      userName: "Alice",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 200,
      userName: "Bob",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 300,
      userName: "Charlie",
      timestamp: new Date(),
    },
  ]; */


  /*const allBids=await database.query.bids.findMany({
    where:eq(bids.itemId,parseInt(itemId)),
    orderBy:desc(bids.id),
    with:{
      user:{
        columns:{
          image:true,
          name:true
        }
      }
    }
  })*/
  const allBids = await getBidsForItem(item.id);
  const hasBids = allBids.length>0;
  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-8">
          <h1 className={pageTitle}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            className="rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
          />

          <div className="text-xl space-y-4">
          <div>
              Current Bid{" "}
              <span className="font-bold">
                ${formatToDollar(item.currentBid)}
              </span>
            </div>
            <div>
              Starting Price of{" "}
              <span className="font-bold">
                ${formatToDollar(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid interval{" "}
              <span className="font-bold">
                ${formatToDollar(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          <form action={createBidAction.bind(null,item.id)}>
                <Button>Place bid</Button>
           </form>
           </div>
          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li key={bid.id} className="bg-gray-100 rounded-xl-xl p-8 ">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-bold">${formatToDollar(bid.amount)}</span> by{" "}
                      <span className="font-bold">{bid.user.name}</span>
                    </div>
                    <div className="">{formatTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12 ">
              <Image
                src="/package.svg"
                width="200"
                height="200"
                alt="Package"
              />
              <h2 className="text-2xl font-bold ">No Bids yet</h2>
             
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
