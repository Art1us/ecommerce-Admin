import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()
        const data = {
            _id,
            title,
            description,
            price,
        }

        if (_id) {
            await axios.put("/api/products", { ...data, _id })
        } else {
            const data = {
                title,
                description,
                price,
            }
            await axios.post("/api/products", data)
        }
        setGoToProducts(true)
    }

    /*  async function uploadImages(e) {
        const file = e.target?.files[0]

         if (files?.length > 0) {
            const data = new FormData()
            for (const file of files) {
                data.append("file", file)
            }

        if (file) {
            const resp = await axios.post("/api/upload", data)
            console.log(resp.data)
        }
    } */

    if (goToProducts) {
        router.push("/products")
    }
    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="new product"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label>Photos </label>
            <div className="mb-2">
                <label className="w-24 h-24 flex cursor-pointer flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    Upload
                    <input type="file" className="hidden" />
                </label>
                {!images?.length && <div>No photos in this product</div>}
            </div>
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <label>Price in USD</label>
            <input
                type="number"
                placeholder="new product"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <button className="btn-primary" type="submit">
                Save
            </button>
        </form>
    )
}
