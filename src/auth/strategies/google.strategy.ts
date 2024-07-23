import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '147700121593-null6hkqg4849csorsb7lcbhpq53eato.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3011/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      isGoogleAccount: true,
      accessToken,
    };
    const userFromDb = await this.authService.findOrCreate(user);
    done(null, userFromDb);
  }
}