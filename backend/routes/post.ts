import  { Router, type Request, type Response } from 'express'
import { authMiddleware } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';

const postRoutes = Router();
postRoutes.use(authMiddleware);

postRoutes.get('/get-all-posts', async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({ where: { published: true } });

        return res.status(200).json({
            success: true,
            posts
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }


})

postRoutes.get('/get-post/:id',authMiddleware, async (req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            return res.status(401).json({
                success: false,
                message: "Invalid actions"
            })
        }
        const post = await prisma.post.findUnique({where: {id:id}});
        return res.status(200).json({
            success: true,
            post
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }

})

postRoutes.post('/create-post', async (req: any, res: Response) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;

        if (!title || !content) {
            return res.status(401).json({
                success: false,
                message: "All field required"
            })
        }

        await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        })

        return res.status(200).json({
            success: true,
            message: "Post created"
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
})

postRoutes.get('/my-posts', async (req: any, res: Response) => {
    try {

        const userId = req.user.userId;

        const myPosts = await prisma.post.findMany({ where: { authorId: userId } })

        return res.status(200).json({
            success: true,
            myPosts
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }

})
postRoutes.put('/publish-post', async (req: any, res: Response) => {
    try {

        const { postId } = req.body;
        const userId = req.user.userId
        await prisma.post.update({
            where: { id: postId, authorId: userId }, data: {
                published: true
            }
        })

        return res.status(200).json({
            success: true,
            message: "published"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }

})

postRoutes.delete('/delete-post', async (req: any, res: Response) => {
    try {

        const { postId } = req.body;
           const userId = req.user.userId;
        await prisma.post.delete({
            where: { id: postId, authorId: userId }
        })

        return res.status(200).json({
            success: true,
            message: "post deleted"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }

})


export default postRoutes