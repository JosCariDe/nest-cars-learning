import { BadRequestException, Injectable, NotFoundException, Delete } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto } from './dto/create-car.dto';
import { log } from 'console';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        /*{
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        }, */
    ]

    findAll() {
        return this.cars
    }

    findOne(id: string) {
        
        const car = this.cars.find(car => car.id === id);
        
        if (!car) {
            throw new NotFoundException(`car whith id ${id} NOT FOUND`);
        }

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const id = uuid();
        this.cars.push({
            id: id,
            ...createCarDto
        })
        //log(`id del carro agregado en en list es: ${this.cars[3].id}`)

        return this.cars.find(car => car.id == id)
    }
    

    update(id: string, updateCarDto: UpdateCarDto) {

        let carDB = this.findOne(id);

        if (updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id not valid inside body whith id: ${updateCarDto.id}`)
        
        this.cars = this.cars.map(car => {

            if ( car.id == id ) {

                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                
                return carDB 
            }

            return car

        })
        
        return ;
    }

    delete(id: string) {
        let carDB = this.findOne(id);

        this.cars = this.cars.filter( car => car.id !== id);

        return {
            message: `car whit id: ${id} deleted success`
        }
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
    }
    
}
