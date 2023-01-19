import crypto from 'crypto'
import { generateExpiryDate } from 'helpers/expireAt'
import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { getToken } from 'next-auth/jwt'
import UrlSchema from 'schema/url'

export default async function (req, res) {
  const client = await clientPromise
  const urlCollection = client.db('tinyurl').collection('urls')

  const token = await getToken({ req })

  // if (!token) {
  //   return res.status(401).send('Request not authorized')
  // }

  try {
    switch (req.method) {
      case 'GET':
        const urls = await urlCollection
          .find({ createdBy: ObjectId('63c2cd98a8fedcdfcdcef111') })
          .toArray()
        res.status(200).send(urls)
        break

      case 'POST':
        const value = await UrlSchema.validateAsync(req.body)

        const urlObject = {
          ...value,
          shortUrl: crypto.randomBytes(3).toString('hex'),
          clicks: 0,
          createdAt: new Date(),
          expireAt: generateExpiryDate(value.expireAt, value.oneTimeUse),
          createdBy: ObjectId(token.sub),
        }

        const doc = await urlCollection.insertOne(urlObject)

        res.status(201).send({ _id: doc.insertedId, ...urlObject })
        break
    }
  } catch (error) {
    if (error?.details) {
      res.status(400).send(Array.from(error.details.map((e) => e.message)))
    } else res.status(500).send('Something went wrong')
  }
}
