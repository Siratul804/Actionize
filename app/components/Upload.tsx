import { v2 as cloudinary } from "cloudinary";
import { Upload } from "@/app/lib/action";
import CldImage from "@/app/components/CldImage";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

// Fetch images from Cloudinary (use this in a server component)
async function getImages() {
  try {
    const result = await cloudinary.api.resources_by_tag(
      "nextjs-server-actions-upload-imgs",
      { context: true }
    );
    return result.resources;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function Page() {
  const imgs = await getImages(); // Call the function to get images

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
      <form
        action={Upload}
        className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6"
      >
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an Image to Upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required
          />
        </p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Images</h2>
      <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {imgs.map((image: CloudinaryResource) => (
          <li
            key={image.public_id}
            className="rounded overflow-hidden bg-white dark:bg-slate-700"
          >
            <div className="relative">
              <CldImage
                width={800}
                height={600}
                src={image.public_id}
                alt={image.context?.alt || ""}
              />
            </div>
            {image.context?.caption && (
              <div className="py-4 px-5">
                <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  {image.context.caption}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
