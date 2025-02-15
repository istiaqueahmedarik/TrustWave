'use client'
export const cropBase64Image = async (bbox: number[], base64Image: string): Promise<string> => {
    const [x, y, width, height] = bbox;
    console.log(x, y, width, height)

    const img = new Image();

    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
        img.src = base64Image;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width - x;
    canvas.height = height - y;

    const ctx = canvas.getContext("2d");

    if (ctx) {

        ctx.drawImage(img, x, y, width - x, height - y, 0, 0, width - x, height - y);

        return canvas.toDataURL("image/jpeg");
    }

    return base64Image;
};


export const imageToBase64 = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}