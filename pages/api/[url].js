import clientPromise from 'lib/mongodb'

export default async function (req, res) {
  const client = await clientPromise
  const collection = client.db('tinyurl').collection('urls')

  try {
    switch (req.method) {
      case 'GET':
        const url = await collection.findOne({ shortUrl: req.query.url })

        if (!url) {
          return res.status(404).send('Not found')
        }

        if (url.passwordEnabled && url.password !== req.query.password) {
          let passwordError = 'wrongPassword'
          if (!req.query.password) {
            passwordError = 'noPassword'
          }

          return res.redirect(
            `/protected?shortUrl=${req.query.url}&error=${passwordError}`
          )
        }

        if (url.oneTimeUse) {
          await collection.deleteOne({ _id: url._id })
        } else {
          await collection.findOneAndUpdate(
            { _id: url._id },
            { $inc: { clicks: 1 } }
          )
        }

        res.redirect(url.source)

      case 'DELETE':
        await collection.deleteOne({ shortUrl: req.query.url })
        res.status(200).send('Ok')
        break

      default:
        res.status(405).send('Method not allowed')
        break
    }
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}
