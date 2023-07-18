import passportJWT from 'passport-jwt';
import { UnauthenticatedError } from '../../errors/unauthenticated.error';
import MESSAGES from '../../../utils/messages';
import { readFileSync } from 'fs';
import { Request } from 'express';
import { User, Session} from '../../../models/index';
import passport from 'passport';
import UserI from '../../../interfaces/User.Interface';


const PUB_KEY: string = readFileSync(__dirname + '/../jwt/' + 'keys/pub_key.pem', 'utf8');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtFromRequest = () =>{
    return ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromBodyField('token'),
    ]);
}

const options: passportJWT.StrategyOptions = {
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
    issuer: 'letsdev',
    passReqToCallback: true,
    jwtFromRequest: jwtFromRequest()
};

const passportJwtStrategy = new JwtStrategy(options, async (req: Request, jwtPayload: any, done: any) => {
  try {
    const sessionDoc = await Session.findById(jwtPayload.sessionId).lean();
    if (!sessionDoc) {
      return done(new UnauthenticatedError(MESSAGES.SESSION_NOT_FOUND));
    }
    const user: UserI = await User.findOne({ _id: jwtPayload.userId }).lean();
    if (!user) {
      return done(null, false);
    }

    user.sessionId = jwtPayload.sessionId;
    await Session.findByIdAndUpdate(jwtPayload.sessionId, { $set: { updatedAt: Date.now() } });
    req.user = user;
    passport.serializeUser((user: any, done)=>{
        return done(null, user);
    })
    return done(null, user);
  } catch (err) {
    throw(err)
  }
});

export { passportJwtStrategy };

// curstome interfaces

export interface customRequest extends Request{
  user: UserI
}
