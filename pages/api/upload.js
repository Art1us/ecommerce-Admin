import multiparty from "multiparty"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"

export default async function handle(req, res) {
    console.log(req)
    /* const fileRef = ref(storage, "images")
    uploadBytes(fileRef, "file").then(file => {
        getDownloadURL(fileRef).then(url => {
            console.log(url)
            return res.json("ok")
        })
    }) */
    return res.json(req)
}

export const config = {
    api: { bodyParser: false },
}
