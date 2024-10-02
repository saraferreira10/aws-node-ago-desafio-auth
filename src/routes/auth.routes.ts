import { Request, Response, Router } from 'express'

const router = Router()

router.post('/api/v1/login', (req: Request, res: Response) => {
  res.send('hello')
})

export default router
