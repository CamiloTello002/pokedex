import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  // remember that this is not a service, but a dependency
  // By the way, you need to initialize the member
  private readonly axios: AxiosStatic = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2]
      console.log({ name, no })
    })

    return data;
  }

}
