import { supabase } from "@/app/utils/supabase/supabaseClient";

export const addProduct = async (productData: FormData) => {
  const Id = crypto.randomUUID();
  const image_url = await addProductImages(productData, Id);
  const { data, error } = await supabase.from("products").insert([
    {
      title: productData.get("title") as string,
      description: productData.get("description") as string,
      category: productData.get("category") as string,
      availability: productData.get("inStock") as string,
      price: parseFloat(productData.get("price") as string),
      discount: parseInt(productData.get("discount") as string),
      image_urls: image_url,
    },
  ]);

  if (error) {
    console.error("Error inserting product:", error);
  }
  if (data) {
    console.log("Product added successfully!");
  }
};

export const addProductImages = async (productData: FormData, Id: string) => {
  let image_urls = [];
  const images = productData.getAll("images");
  for (const image of images) {
    const file = image as File;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { data, error } = await supabase.storage
      .from("product_images")
      .upload(filePath, file);
    if (error) {
      console.error("Error uploading image:", error);
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("product_images").getPublicUrl(filePath);

    image_urls.push(publicUrl);
  }

  return image_urls;
};
