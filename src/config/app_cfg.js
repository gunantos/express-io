import express from 'express'
import cors from 'cors'

export default app_cfg = {
    express: express(),
    cors: cors(),
    parameter: express.json()
}