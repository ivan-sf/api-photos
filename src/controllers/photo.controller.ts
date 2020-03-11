import {Request,Response} from 'express'
import Photo from '../models/photo'
import path from 'path'
import fs from 'fs-extra'

export async function getPhotos(req:Request,res:Response):Promise<Response>{
    const photos = await Photo.find()
    console.log(photos)
    return res.json(photos)
}

export async function getPhoto(req:Request, res:Response):Promise<Response>{
    const id = req.params.id
    const photo = await Photo.findById(id)
    return res.json(photo)
}

export async function createPhoto (req:Request,res:Response):Promise<Response>{
    
    const {title,description} = req.body;
    const newPhoto = {
        title:title,
        description:description,
        imagePath:req.file.path
    }
    const photo = new Photo(newPhoto);
    await photo.save()
    console.log(photo)
    return res.json({
        message: "Succesfull",
        photo
    })
}

export async function deletePhoto (req:Request,res:Response):Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id)
    if(photo){
        fs.unlink(path.resolve(photo.imagePath))
    }
    return res.json({
        messagge: 'Photo delete', 
        photo
    })
}

export async function updatePhoto (req:Request,res:Response):Promise<Response>{
    const {id} = req.params
    const {title,description} = req.body
    const update = await Photo.findByIdAndUpdate(id,{
        title,
        description
    }, {new:true})
    return res.json({
        message:'Success update',
        update
    })
}