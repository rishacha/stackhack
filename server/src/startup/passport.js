const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const { userModel } = require('../modules/user/user-model');
const logger = require('./logger');
const profielFiledsFB = require('../constants/ApplicationConstants').facebookProfileFields;

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
// Strategy to authenticate for system username and password
passport.use(new LocalStrategy(userModel.authenticate()));

if (!process.env.NODE_ENV === 'test') {
  // Stratey for facebook users
  passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientId,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callBackURL,
    profileFields: profielFiledsFB
  },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await userModel.findOne({ 'userId': profile.id });
        if (user) {
          logger.info('user found');
          return cb(user);
        } else {
          logger.debug(`Facebook user not found. Creating one...`)
          let newUser = new userModel({
            username: profile.displayName,
            userId: profile.id,
            email: profile.emails[0].value,
            authSource: 'fb'
          })

          await newUser.save();
          return cb(newUser);
        }
      } catch (error) {
        logger.error(`SOme error : ${error}`);
      }
    }
  ));

  // Strategy for google users
  passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientId,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callBackURL,
    profileFields: profielFiledsFB

  },
    async (token, refreshToken, profile, cb) => {
      try {
        console.log(`${JSON.stringify(profile)}`)
        let user = await userModel.findOne({ 'userId': profile.id });
        if (user) {
          logger.info('user found');
          return cb(user);
        } else {
          logger.debug(`Facebook user not found. Creating one...`)
          let newUser = new userModel({
            username: profile.displayName,
            userId: profile.id,
            email: profile.emails[0].value,
            authSource: 'fb'
          })

          await newUser.save();
          return cb(newUser);
        }
      } catch (error) {
        logger.error(`SOme error : ${error}`);
      }
    }));
}


