import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      // extract user from context
      console.log('--------',args[2])
      const { user } = args[2]
     console.log('----user',user)
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      if (user.role === 'user') {
        throw new Error('you dont have access to the data')
      }

      return resolve.apply(this, args)
    }
  }
}

module.exports = IsAdminDirective