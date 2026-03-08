import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TripsModule } from './trips/trips.module';
import { PassengersModule } from './passengers/passengers.module';
import { HotelsModule } from './hotels/hotels.module';
import { FlightsModule } from './flights/flights.module';
import { SosModule } from './sos/sos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    TripsModule,
    PassengersModule,
    HotelsModule,
    FlightsModule,
    SosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
