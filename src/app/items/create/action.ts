"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createItemAction({fileName,name,startingPrice}:{fileName:string,name :string, startingPrice:number}) {
  const session = await auth();

  if(!session){
    throw new Error("Unauthorized");
  }

  const user=session.user;
  if(!user || !user.id){
    throw new Error('Unauthorized');
  }
 
 const priceAsCents=startingPrice * 100;
 
  await database?.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id!,
  });
  //revalidatePath("/");
  redirect('/');
}

export async function createUploadUrlAction(key:string,type:string){

  return await getSignedUrlForS3Object(key,type);

}