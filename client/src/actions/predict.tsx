/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

export async function predict(yVal: number[], xVal: any[], dataDetails: string = "basic y and x values") {
    const y_str = yVal.join(',');
    const x_str = xVal.join(',');

    const result = await generateText({
        model: google('gemini-2.0-flash-exp', {
            structuredOutputs: true
        }),

        maxSteps: 10,
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: `you have given yVal and xVal predict next 10 yVal and xVal and this is their meaning ${dataDetails}... now this is yVal = ${y_str} and xVal = ${x_str} ---> now predict` },
                ],
            },
        ],


        experimental_output: Output.object({
            schema: z.object({
                xVal: z.array(z.number()),
                yVal: z.array(z.number()),
            }),
        }),
    });
    console.log(result);
    return result.experimental_output;
}