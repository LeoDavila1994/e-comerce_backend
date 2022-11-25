const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"});

const { ProductImgs } = require("../models/productImgs.models");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const uploadProductImgs = async (imgs, productId) => {

  const imgsPromises = imgs.map(async img => {

    const [name, ext] = img.originalname.split(".");

    const filename = `product/${productId}/${name}-${Date.now()}.${ext}`;

    const imgRef = ref(storage, filename);

    const result = await uploadBytes(imgRef, img.buffer);

    await ProductImgs.create({ imgUrl: result.metadata.fullPath, productId})
  });

  await Promise.all(imgsPromises);

};

const getAllProductImgs = async products => {
  const productsPromises = products.map(async product => {

    const productImgsPromises = product.productimgs.map(async productImg => {
        const imgRef = ref(storage, productImg.imgUrl);
        const imgUrl = await getDownloadURL(imgRef);
        productImg.imgUrl = imgUrl;

        return productImg;
    });

    const productImgs = await Promise.all(productImgsPromises)

    product.productImgs = productImgs

    return product
});

return await Promise.all(productsPromises);

}

module.exports = { storage, uploadProductImgs, getAllProductImgs };
