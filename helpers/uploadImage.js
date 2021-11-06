
export const uploadImage = async (file) => {

  if(!file) return

  try {

    const formData = new FormData()
    formData.append("upload_preset", "qa-anonymous")
    formData.append("file", file)


    const url = "https://api.cloudinary.com/v1_1/dft4yirox/image/upload"

    const rawData = await fetch(url, {
      method: "post",
      body: formData
    })

    const data = await rawData.json()

    return data.secure_url

  }
  catch(error) {
    console.error("Error al cargar imagen")
    return null
  }

}
