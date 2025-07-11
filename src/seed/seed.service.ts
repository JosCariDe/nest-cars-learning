import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRADS_SEED } from './data/brandss.seed';


@Injectable()
export class SeedService {
 
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ){

  }


  populateDB() {

    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRADS_SEED);

    return 'Seed Execute'

  }

}
