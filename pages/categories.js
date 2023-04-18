import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Categories() {
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])

    /* useEffect(() => {
        axios.get("/api/categories").then(result => {
            setCategories(result.data)
        })
    }, []) */

    async function saveCategory(e) {
        e.preventDefault()
        const a = await axios.post("/api/categories", { name })
        console.log(a)
        setName(`1${a}`)
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>New Category Name</label>
            <form className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder="Category name"
                    onSubmit={saveCategory}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit" className="btn-primary py-1">
                    Save
                </button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 &&
                        categories.map(category => (
                            <tr>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    )
}
