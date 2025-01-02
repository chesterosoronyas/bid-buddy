'use client';
import { Input } from "@/components/ui/input";
import { createItemAction,createUploadUrlAction } from "./action";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/styles";
import { DatePickerDemo } from "@/components/date-picker";
import { useState } from "react";
export default function CreatePage(){
    const [date, setDate] = useState<Date | undefined>();

    return (
        <main className="container mx-auto py-12 space-y-8">
        <h1 className={pageTitle}>Post an Item</h1>
        <form className="flex flex-col border p-8 rounded-xl  space-y-4 max-w-lg"
         onSubmit={async (e) => {
          e.preventDefault();
          const form=e.currentTarget as HTMLFormElement;
          const formData=new FormData(form)
          const file = formData.get("file") as File;
          if (!date) {
            return;
          }


          const uploadUrl = await createUploadUrlAction(file.name, file.type);
          const uploadFormData=new FormData();
          uploadFormData.append("file",file);
          

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });
          const name=formData.get('name')as string;
          const startingPrice=parseInt(formData.get("startingPrice") as string);
         const startinPriceInCents=Math.floor(startingPrice* 100);
          
          await createItemAction({
            
         name,
         startingPrice:startinPriceInCents,
         fileName:file.name,
         endDate: date,

        })

        }}
      >
        <Input required className="max-w-lg" name="name" placeholder="Name your item" />
        <Input required className="max-w-lg" name="startingPrice" type="number" step="0.01" placeholder="What to start your auction at" />
        <input type='file' name="file" />
        <DatePickerDemo date={date} setDate={setDate} />
        <Button className="self-end " type="submit">Post Item</Button>
      </form>
      </main>
    )
}