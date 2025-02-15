/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { generateText, Output } from 'ai';



export async function detectObjectsFromBase64(base64ImageUrl: string) {
    const url = 'https://api.landing.ai/v1/tools/agentic-object-detection';
    const formData = new FormData();

    const base64Response = await fetch(base64ImageUrl);
    const arrayBuffer = await base64Response.arrayBuffer();
    formData.append('image', new Blob([arrayBuffer]), 'image.jpg');
    formData.append('prompts', "profile_picture");
    formData.append('model', 'agentic');

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Basic ${process.env.AGENTIC_API_KEY}`,
            },
        });
        const data = await response.json();
        console.log(JSON.stringify(data));

        let bounding_box;
        try {
            bounding_box = data.data[0][0].bounding_box;
        } catch {
            console.log('No bounding box found');
            bounding_box = [16, 108, 126, 215];
        }
        return { bounding_box: JSON.stringify(bounding_box) };
    } catch (error) {
        console.error(error);
    }
    return { bounding_box: JSON.stringify([16, 108, 126, 215]) };
}


export async function OCRImage(image: string, image1: string) {
    const result = await generateText({
        model: google('gemini-2.0-flash-exp', {
            structuredOutputs: true
        }),

        maxSteps: 10,
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: "Is it look like NID, it needs to be bangladeshi NID? If say yes, also OCR the image, extract info in good structured way and you must reply with the 2d bounding box of box_2d_tx, box_2d_ty,box_2d_bx,box_2d_by  , mask and label of the first image, where the profile pictures at" },
                    { type: 'image', image: image },
                    { type: 'image', image: image1 }
                ],
            },
        ],


        experimental_output: Output.object({
            schema: z.object({
                isNID: z.boolean(),
                name: z.string(),
                fatherName: z.string(),
                motherName: z.string(),
                dob: z.string(),
                nid: z.string(),
                address: z.string(),
                blood_type: z.string(),
                box_2d_tx: z.number(),
                box_2d_ty: z.number(),
                box_2d_bx: z.number(),
                box_2d_by: z.number(),
            }),
        }),
    });
    console.log(result);
    return result.experimental_output;

}








