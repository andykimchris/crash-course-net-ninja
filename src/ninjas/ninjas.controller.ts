import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NinjaDto } from './dto/ninja';
import { NinjasService } from './ninjas.service';

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
  createNinja(@Body(new ValidationPipe()) NinjaDto: NinjaDto) {
    return this.ninjasService.addNinja(NinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id') id: number,
    @Body()
    updatedNinjaDto: NinjaDto,
  ) {
    this.ninjasService.updateNinja(updatedNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(id);
  }
}
