import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { createNinjaDto } from './dto/ninja';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getNinja(@Param('id') id: string) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: createNinjaDto) {
    return this.ninjasService.addNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id') id: number,
    @Body()
    updatedNinjaDto: createNinjaDto,
  ) {
    this.ninjasService.updateNinja(updatedNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(id);
  }
}
