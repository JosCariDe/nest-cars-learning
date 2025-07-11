import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import {v4 as uuid} from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    /*{
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime()
    }, */

  ]

  create(createBrandDto: CreateBrandDto) {

    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);

    return {
      message: 'Creado con exito el nuevo brand',
      data: brand
    };
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand ) throw new NotFoundException(`Not Found Brand with id ${id}`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDB = this.findOne(id);

    this.brands = this.brands.map(brand => {

      if (brand.id === id){
        brandDB.updatedAt = new Date().getTime();
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
          id
        }

        return brandDB
      }

      return brand

    })


    return {
      message: `Brand con el id ${id} actualizado correctamente`,
      data: brandDB
    };
  }

  remove(id: string) {

    let res = this.findOne(id)

    this.brands = this.brands.filter(brand => brand.id !== id)

    return {
      message: `Brand con el id ${id} eliminado con exito`,
      data: res
    };
  }

  fillBrandsWithSeedData( brands: Brand[] ) {
          this.brands = brands;
  }
  
}
