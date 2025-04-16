import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    // registers model with NestJS's dependency injection system
    // Yes, this dependency needs to be registered
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ]
})
export class SeedModule { }
