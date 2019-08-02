import userModel from '../model/user';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

 const resolvers = {
  Query: {
    allUsers:async (_,args,p,req)=> {
      return userModel.find({}).exec();
    }
  },
  Mutation: {
  signup: async(_,args) =>{
      try {
        const existingUser = await userModel.findOne({ email: args.email });
        console.log('------',existingUser)
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new userModel({
          email: args.email,
          password: hashedPassword,
          name:args.name,
          role:args.role
        });
  
        const result = await user.save();
  
        return "success";
      } catch (err) {
        throw err;
      }
    },
   login: async (_, { email, password },req)=> {
     console.log('----parameters',req)
      const user = await userModel.findOne({ email:email })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      return jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        'somesupersecret',
        { expiresIn: '1d' }
      )
    },
  }
};

export default resolvers;

