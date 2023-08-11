import { Injectable } from '@nestjs/common';
import { createNinjaDto } from './dto/ninja';

@Injectable()
export class NinjasService {
  private ninjas: createNinjaDto[] = [
    { id: '1', name: 'rui', weapon: 'sword' },
    { id: '2', name: 'haikmura', weapon: 'nunchucks' },
    { id: '3', name: 'jackie' },
  ];

  getNinja(id: string) {
    const result = this.ninjas.find((ninja) => ninja.id === id);
    if (result) return result;
    throw new Error('Not Found');
  }

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  addNinja(ninja: createNinjaDto) {
    this.ninjas.push(ninja);
    return this.ninjas;
  }

  updateNinja(ninja: createNinjaDto) {
    this.ninjas.map((n) => {
      if (n.id === ninja.id) {
        return { ...n, ...ninja };
      }
    });

    return this.ninjas;
  }

  deleteNinja(id: string) {
    this.ninjas = this.ninjas.filter((ninja) => ninja.id != id);
    return {
      id,
    };
  }
}
