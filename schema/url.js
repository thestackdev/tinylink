import joi from 'joi'
import { expireAtOptions } from 'helpers/expireAt'

const UrlSchema = joi.object({
  source: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      )
    )
    .message('Must provide a valid URL'),
  passwordEnabled: joi.boolean().required(),
  password: joi.when('passwordEnabled', {
    is: true,
    then: joi.string().min(5).required(),
  }),
  expireAt: joi
    .date()
    .required()
    .valid(...Object.keys(expireAtOptions)),
  oneTimeUse: joi.boolean().required(),
  createdBy: joi.string().email().required().message('Email validation failed'),
})

export default UrlSchema
