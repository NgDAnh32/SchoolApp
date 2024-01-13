import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post('/score')
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get('satisfy/:id')
  satisfy(@Param('id') id: string) {
    return this.resultsService.satisfy(id);
  }

  @Get()
  findAll(@Req() req) {
    return this.resultsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(id);
  }
}
