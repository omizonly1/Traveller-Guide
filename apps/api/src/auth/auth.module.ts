import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TripsModule } from '../trips/trips.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-default-key-keep-safe',
      signOptions: { expiresIn: '14d' },
    }),
    TripsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
