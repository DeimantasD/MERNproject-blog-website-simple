import express from 'express'
import dotenv from 'dotenv'
import blogsRoutes from './routes/blogs.js'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
dotenv.config()


// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/blogs', blogsRoutes)
app.use('/api/user', userRoutes)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// listening to requests
mongoose.connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port 4000')
    })
  })
  .catch((err) => console.log(err))

